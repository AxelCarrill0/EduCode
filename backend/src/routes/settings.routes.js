const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { asyncHandler, badRequest } = require('../utils/http');

const router = express.Router();

router.use(requireAuth);

router.get('/', asyncHandler(async (req, res) => {
  const { data, error } = await req.supabase
    .from('user_settings')
    .select('dark_mode, language, email_notifications, reminder_notifications, achievement_notifications')
    .eq('user_id', req.user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw badRequest(error.message);
  }

  res.json({
    settings: data || {
      dark_mode: false,
      language: 'es',
      email_notifications: true,
      reminder_notifications: true,
      achievement_notifications: true,
    },
  });
}));

router.put('/', asyncHandler(async (req, res) => {
  const payload = {
    user_id: req.user.id,
    dark_mode: Boolean(req.body.darkMode),
    language: req.body.language || 'es',
    email_notifications: req.body.emailNotifications !== false,
    reminder_notifications: req.body.reminderNotifications !== false,
    achievement_notifications: req.body.achievementNotifications !== false,
  };

  const { data, error } = await req.supabase
    .from('user_settings')
    .upsert(payload, { onConflict: 'user_id' })
    .select('dark_mode, language, email_notifications, reminder_notifications, achievement_notifications')
    .single();

  if (error) {
    throw badRequest(error.message);
  }

  res.json({ settings: data });
}));

module.exports = router;
