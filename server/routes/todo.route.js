import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import todoCtrl from '../controllers/todo.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/todos - Get list of users */
  .get(todoCtrl.list)

  /** POST /api/todos - Create new user */
  .post(validate(paramValidation.createTodo), todoCtrl.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(todoCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateTodo), todoCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(todoCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', todoCtrl.load);

export default router;
