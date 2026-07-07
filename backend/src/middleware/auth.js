const { createSupabaseClient } = require('../config/supabase');
const { unauthorized } = require('../utils/http');

async function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';

    if (!token) {
      throw unauthorized('Debes iniciar sesión para continuar.');
    }

    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      throw unauthorized('La sesión no es válida o expiró.');
    }

    req.accessToken = token;
    req.supabase = supabase;
    req.user = data.user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { requireAuth };
