const express = require('express');
const { spawn } = require('child_process');
const { requireAuth } = require('../middleware/auth');
const { asyncHandler, badRequest } = require('../utils/http');

const router = express.Router();

let pythonCmd = null;

function detectPython() {
  if (pythonCmd) return pythonCmd;
  const candidates = ['python3', 'python', 'py'];
  for (const cmd of candidates) {
    try {
      require('child_process').execSync(`${cmd} --version`, { stdio: 'pipe' });
      pythonCmd = cmd;
      return pythonCmd;
    } catch {}
  }
  return null;
}

router.use(requireAuth);

router.post('/', asyncHandler(async (req, res) => {
  const { code } = req.body;

  if (!code || typeof code !== 'string') {
    throw badRequest('El código es obligatorio.');
  }

  if (code.length > 100000) {
    throw badRequest('El código es demasiado largo (máx. 100KB).');
  }

  const cmd = detectPython();
  if (!cmd) {
    return res.json({
      stdout: '',
      stderr: '',
      output: 'Python no está instalado en el servidor.\nInstala Python desde https://python.org para ejecutar código.',
      exitCode: -1,
      executionTime: 0,
    });
  }

  const start = Date.now();
  const timeout = 8000;

  const child = spawn(cmd, ['-u'], {
    timeout,
    env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
  });

  let stdout = '';
  let stderr = '';
  let killed = false;

  const timer = setTimeout(() => {
    killed = true;
    child.kill('SIGTERM');
  }, timeout);

  child.stdout.on('data', (data) => {
    stdout += data.toString();
  });

  child.stderr.on('data', (data) => {
    stderr += data.toString();
  });

  child.on('error', (err) => {
    clearTimeout(timer);
    const elapsed = Date.now() - start;
    res.json({
      stdout: '',
      stderr: err.message,
      output: `Error al ejecutar: ${err.message}`,
      exitCode: -1,
      executionTime: elapsed,
    });
  });

  child.on('close', (exitCode) => {
    clearTimeout(timer);
    const elapsed = Date.now() - start;

    let output = stdout;
    if (stderr) {
      output += (output ? '\n' : '') + stderr;
    }
    if (killed) {
      output += '\n\n! La ejecución fue interrumpida (superó el límite de 8 segundos).';
    }

    res.json({
      stdout,
      stderr,
      output: output || '(sin salida)',
      exitCode: exitCode !== null ? exitCode : -1,
      executionTime: elapsed,
    });
  });

  child.stdin.write(code);
  child.stdin.end();
}));

module.exports = router;
