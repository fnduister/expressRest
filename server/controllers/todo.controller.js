import Todo from '../models/todo.model';

/**
 * Load Todo and append to req.
 */
function load(req, res, next, id) {
  Todo.get(id)
    .then((todo) => {
      req.todo = todo; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get Todo
 * @returns {Todo}
 */
function get(req, res) {
  return res.json(req.todo);
}

/**
 * Create new Todo
 * @property {string} req.body.Todoname - The Todoname of Todo.
 * @property {string} req.body.mobileNumber - The mobileNumber of Todo.
 * @returns {Todo}
 */
function create(req, res, next) {
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save()
    .then(savedTodo => res.json(savedTodo))
    .catch(e => next(e));
}

/**
 * Update existing Todo
 * @property {string} req.body.Todoname - The Todoname of Todo.
 * @property {string} req.body.mobileNumber - The mobileNumber of Todo.
 * @returns {Todo}
 */
function update(req, res, next) {
  const todo = req.todo;
  if (req.body.text) todo.text = req.body.text;
  if (req.body.toggle) todo.completed = !todo.completed;
  console.log(todo.completed);

  todo.save()
    .then(savedTodo => res.json(savedTodo))
    .catch(e => next(e));
}

/**
 * Get Todo list.
 * @property {number} req.query.skip - Number of Todos to be skipped.
 * @property {number} req.query.limit - Limit number of Todos to be returned.
 * @returns {Todo[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Todo.list({ limit, skip })
    .then(todos => res.json(todos))
    .catch(e => next(e));
}

/**
 * Delete Todo.
 * @returns {Todo}
 */
function remove(req, res, next) {
  const todo = req.todo;
  todo.remove()
    .then(deletedTodo => res.json(deletedTodo))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
