const express = require('express');
const { supabase, supabaseAdmin } = require('../config/supabase');
const { requireAuth } = require('../middleware/auth');
const { asyncHandler, badRequest } = require('../utils/http');

const router = express.Router();

function profileFromUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.name || 'Usuario',
  };
}

router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw badRequest('Nombre, correo y contraseña son obligatorios.');
  }

  if (password.length < 6) {
    throw badRequest('La contraseña debe tener al menos 6 caracteres.');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    throw badRequest(error.message);
  }

  const user = data.user;

  if (user) {
    if (supabaseAdmin) {
      await supabaseAdmin.auth.admin.updateUserById(user.id, {
        email_confirm: true,
      });
    }

    await supabase.from('profiles').upsert({
      id: user.id,
      email,
      name,
    });

    await supabase.from('user_settings').upsert({
      user_id: user.id,
    });
  }

  if (!data.session && supabaseAdmin && user) {
    const { data: loginData } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    data.session = loginData?.session || null;
  }

  res.status(201).json({
    message: 'Usuario registrado correctamente.',
    session: data.session,
    user: user ? profileFromUser({ ...user, user_metadata: { name } }) : null,
    needsEmailConfirmation: !data.session,
  });
}));

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw badRequest('Correo y contraseña son obligatorios.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message?.toLowerCase().includes('email') && error.message?.toLowerCase().includes('confirm')) {
      throw badRequest('Debes confirmar tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada.');
    }
    throw badRequest('Correo o contraseña incorrectos.');
  }

  res.json({
    message: 'Sesión iniciada correctamente.',
    session: data.session,
    user: data.user ? profileFromUser(data.user) : null,
  });
}));

router.get('/me', requireAuth, asyncHandler(async (req, res) => {
  const { data: profile } = await req.supabase
    .from('profiles')
    .select('id, email, name, bio, created_at')
    .eq('id', req.user.id)
    .single();

  res.json({
    user: profile || profileFromUser(req.user),
  });
}));

router.put('/profile', requireAuth, asyncHandler(async (req, res) => {
  const { name, bio } = req.body;

  if (!name) {
    throw badRequest('El nombre es obligatorio.');
  }

  const { data, error } = await req.supabase
    .from('profiles')
    .upsert({
      id: req.user.id,
      email: req.user.email,
      name,
      bio: bio || '',
    })
    .select('id, email, name, bio')
    .single();

  if (error) {
    throw badRequest(error.message);
  }

  res.json({ user: data });
}));

router.put('/change-password', requireAuth, asyncHandler(async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    throw badRequest('La nueva contraseña debe tener al menos 6 caracteres.');
  }

  if (!supabaseAdmin) {
    throw badRequest('El servidor no está configurado correctamente para cambiar contraseñas.');
  }

  const { error } = await supabaseAdmin.auth.admin.updateUserById(req.user.id, {
    password: newPassword,
  });

  if (error) {
    throw badRequest(error.message);
  }

  res.json({ message: 'Contraseña actualizada correctamente.' });
}));

router.delete('/account', requireAuth, asyncHandler(async (req, res) => {
  if (!supabaseAdmin) {
    throw badRequest('Falta SUPABASE_SERVICE_ROLE_KEY para eliminar usuarios.');
  }

  const { error } = await supabaseAdmin.auth.admin.deleteUser(req.user.id);

  if (error) {
    throw badRequest(error.message);
  }

  res.json({ message: 'Cuenta eliminada correctamente.' });
}));

module.exports = router;
