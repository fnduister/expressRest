import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import todoRoutes from './todo.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount user routes at /users
router.use('/todos', todoRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
