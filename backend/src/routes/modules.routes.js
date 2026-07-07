const express = require('express');
const { supabase } = require('../config/supabase');
const { asyncHandler, notFound } = require('../utils/http');

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
  const { data, error } = await supabase
    .from('modules')
    .select('id, title, description, icon, accent, icon_bg, difficulty, sort_order')
    .order('sort_order', { ascending: true });

  if (error) {
    throw error;
  }

  res.json({ modules: data || [] });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('modules')
    .select(`
      id,
      title,
      description,
      icon,
      accent,
      icon_bg,
      difficulty,
      sort_order,
      lessons (
        id,
        title,
        duration,
        sort_order,
        content
      )
    `)
    .eq('id', id)
    .single();

  if (error || !data) {
    throw notFound('Módulo no encontrado.');
  }

  data.lessons = (data.lessons || []).sort((a, b) => a.sort_order - b.sort_order);
  res.json({ module: data });
}));

module.exports = router;
