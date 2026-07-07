const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { asyncHandler, badRequest } = require('../utils/http');

const router = express.Router();

router.use(requireAuth);

async function getSummary(supabase, userId) {
  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select('id, title, sort_order, lessons(id)')
    .order('sort_order', { ascending: true });

  if (modulesError) {
    throw modulesError;
  }

  const { data: progress, error: progressError } = await supabase
    .from('user_progress')
    .select('module_id, lesson_id, completed_at')
    .eq('user_id', userId);

  if (progressError) {
    throw progressError;
  }

  const completedLessonIds = new Set((progress || []).map((item) => item.lesson_id));
  const moduleProgress = (modules || []).map((mod) => {
    const total = mod.lessons.length;
    const completed = mod.lessons.filter((lesson) => completedLessonIds.has(lesson.id)).length;

    return {
      moduleId: mod.id,
      moduleName: mod.title,
      completed,
      total,
      pct: total > 0 ? Math.round((completed / total) * 100) : 0,
      completedModule: total > 0 && completed === total,
    };
  });

  const completedLessons = completedLessonIds.size;
  const totalLessons = moduleProgress.reduce((sum, mod) => sum + mod.total, 0);
  const modulesCompleted = moduleProgress.filter((mod) => mod.completedModule).length;
  const xp = completedLessons * 25 + modulesCompleted * 100;

  return {
    modules: moduleProgress,
    stats: {
      xp,
      streak: 0,
      completedLessons,
      totalLessons,
      modulesCompleted,
      totalModules: moduleProgress.length,
      inProgressLessons: completedLessons,
      pendingLessons: Math.max(totalLessons - completedLessons, 0),
    },
  };
}

router.get('/', asyncHandler(async (req, res) => {
  const summary = await getSummary(req.supabase, req.user.id);
  res.json(summary);
}));

router.post('/lessons/complete', asyncHandler(async (req, res) => {
  const { moduleId, lessonId } = req.body;

  if (!moduleId || !lessonId) {
    throw badRequest('moduleId y lessonId son obligatorios.');
  }

  const { error } = await req.supabase
    .from('user_progress')
    .upsert({
      user_id: req.user.id,
      module_id: moduleId,
      lesson_id: lessonId,
    }, {
      onConflict: 'user_id,lesson_id',
    });

  if (error) {
    throw badRequest(error.message);
  }

  const summary = await getSummary(req.supabase, req.user.id);
  res.status(201).json(summary);
}));

router.delete('/', asyncHandler(async (req, res) => {
  const { error } = await req.supabase
    .from('user_progress')
    .delete()
    .eq('user_id', req.user.id);

  if (error) {
    throw badRequest(error.message);
  }

  const summary = await getSummary(req.supabase, req.user.id);
  res.json(summary);
}));

module.exports = router;
