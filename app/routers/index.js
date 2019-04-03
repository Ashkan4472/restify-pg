const todoController = require('../controllers/TodosControllers');
const todoItemsController = require('../controllers/TodoItemsController');

module.exports = (app) => {
    app.get('/api', (req, res, next) => {
        res.send(`Welcome to the Todos API!`);
        next();
    });

    app.post('/api/todos', todoController.create);
    app.get('/api/todos', todoController.get);
    app.get('/api/todos/:todoId', todoController.getOne);
    app.put('/api/todos/:todoId', todoController.update);
    app.del('/api/todos/:todoId', todoController.remove);


    app.post('/api/todos/:todoId/items', todoItemsController.create);
    app.post('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
    app.del('/api/todos/:todoId/items/:todoItemId', todoItemsController.remove);
};