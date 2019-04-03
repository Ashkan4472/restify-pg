const errors = require('restify-errors');
const TodoItem = require('../models').TodoItem;
const Todo = require('../models').Todo;

module.exports = {
    create: (req, res, next) => {

        const content = req.body.content;
        const todoId = req.params.todoId;

        if (!content) {
            return next(new errors.InvalidContentError(`you didn't provide any content.`));
        }

        if (!todoId) {
            return next(new errors.InvalidArgumentError(`you did't provide any id.`));
        }

        Todo.findByPk(todoId).then((todo) => {
            if (!todo) {
                return next(new errors.InvalidContentError(`Didn't find any todo with id ${todoId}`));
            }

            TodoItem.create({
                content: content,
                todoId: todo.id
            }).then((todoItem) => {
                res.send(todoItem);
                next();
            }).catch((err) => {
                return next(new errors.InternalServerError(err));
            });

        }).catch((err) => {
            return next(new errors.InvalidContentError(err));
        });
    },

    update: (req, res, next) => {
        const todoId = req.params.todoId;
        const todoItemId = req.params.todoItemId;

        if (!todoId) {
            return next(new errors.InvalidArgumentError(`you didn't provide any todo id`));
        }

        if (!todoItemId) {
            return next(new errors.InvalidArgumentError(`you didn't provide any todo item id`));
        }

        TodoItem.findOne({
            where: {
                id: todoItemId,
                todoId: todoId
            }
        }).then((todoItem) => {
            if (!todoItem) {
                return next(new errors.InvalidContentError(`Didn't find any todo Item with id ${todoItemId} with todo Id ${todoId}`));
            }

            todoItem.update({
                content: req.body.content || todoItem.content,
                complete: req.body.complete || todoItem.complete
            }).then((updatedTodoItem) => {
                res.send(updatedTodoItem);
                next();
            }).catch((err) => {
                return next(new errors.InternalServerError(err));
            });
        }).catch((err) => {
            return next(new errors.InternalServerError(err));
        });
    },

    remove: (req, res, next) => {
        const todoId = req.params.todoId;
        const todoItemId = req.params.todoItemId;

        if (!todoId) {
            return next(new errors.InvalidArgumentError(`you didn't provide any todo id`));
        }

        if (!todoItemId) {
            return next(new errors.InvalidArgumentError(`you didn't provide any todo item id`));
        }

        TodoItem.findOne({
            where: {
                id: todoItemId,
                todoId: todoId
            }
        }).then((todoItem) => {
            if (!todoItem) {
                return next(new errors.InvalidContentError(`Didn't find any todo Item with id ${todoItemId} with todo Id ${todoId}`));
            }

            todoItem.destroy().then(() => {
                res.send(204);
                next();
            }).catch((err) => {
                return next(new errors.InternalServerError(err));
            });
        }).catch((err) => {
            return next(new errors.InternalServerError(err));
        });
    },
};