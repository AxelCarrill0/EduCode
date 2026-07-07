const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { frontendUrl } = require('./config/env');
const { errorHandler } = require('./middleware/error-handler');

const authRoutes = require('./routes/auth.routes');
const moduleRoutes = require('./routes/modules.routes');
const progressRoutes = require('./routes/progress.routes');
const settingsRoutes = require('./routes/settings.routes');
const executeRoutes = require('./routes/execute.routes');

const app = express();

app.use(helmet());
app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'educode-api' });
});

app.use('/auth', authRoutes);
app.use('/modules', moduleRoutes);
app.use('/progress', progressRoutes);
app.use('/settings', settingsRoutes);
app.use('/execute', executeRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use(errorHandler);

module.exports = app;
