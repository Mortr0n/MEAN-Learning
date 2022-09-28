const TaskController = require('../controllers/task.controller');

module.exports = (app) => {
    app.get("/task", TaskController.getAllTasks);
    app.get('/task/:id', TaskController.getOneTask);
    app.post('/task', TaskController.createTask);
    app.post('/task/edit/:id', TaskController.updateOneTask);
    app.post('/task/delete/:id', TaskController.deleteOneTask);
}