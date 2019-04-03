const errors = require('restify-errors');
const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
    create: (req, res, next) => {
        const title = req.body.title;

        if (!title) {
            return next(new errors.InvalidContentError(`you didn't provide any title`));
        }

        Todo.create({
            title: title
        }).then((todo) => {
            res.send(todo);
            next();
        }).catch((err) => {
            return next(new errors.InternalServerError(err));
        });
    },

    get: (req, res, next) => {
        Todo.findAll({
            include: [{
                model: TodoItem,
                as: 'todoItems'
            }]
        }).then((todos) => {
            res.send(todos);
            next();
        }).catch((err) => {
            return next(new errors.InternalServerError(err));
        });
    },

    getOne: (req, res, next) => {
        const todoId = req.params.todoId;

        if (!todoId) {
            return next(new errors.InvalidArgumentError(`you didn't provide any id`));
        }

        Todo.findByPk(todoId, {
            include: [{
                model: TodoItem,
                as: 'todoItems'
            }]
        }).then((todo) => {
            if (!todo) {
                return next(new errors.InvalidContentError(`didn't fine any todo with id ${todoId}`));
            }

            res.send(todo);
            next();

        }).catch((err) => {
            return next(new errors.InternalServerError(err));
        });
    },

    update: (req, res, next) => {
        const todoId = req.params.todoId;
        const title = req.body.title;

        if (!todoId) {
            return next(new errors.InvalidArgumentError(`you didn't provide any id`));
        }

        Todo.findByPk(todoId, {
            include: [{
                model: TodoItem,
                as: 'todoItems'
            }]
        }).then((todo) => {
            if (!todo) {
                return next(new errors.InvalidContentError(`didn't fine any todo with id ${todoId}`));
            }

            todo.update({
                title: title || todo.title
            }).then(() => {
                res.send(todo);
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

        if (!todoId) {
            return next(new errors.InvalidArgumentError(`you didn't provide any id`));
        }

        Todo.findByPk(todoId).then((todo) => {
            if (!todo) {
                return next(new errors.InvalidContentError(`didn't fine any todo with id ${todoId}`));
            }

            todo.destroy().then(() => {
                res.send(204);
                next();
            }).catch((err) => {
                return next(new errors.InternalServerError(err));
            });
        }).catch((err) => {
            return next(new errors.InternalServerError(err));
        });
    }

};