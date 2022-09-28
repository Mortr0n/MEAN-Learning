const Task = require('../models/task.model');

module.exports = {
    getAllTasks: (req, res) => {
        Task.find()
            .then(tasks => {
                console.log("Found Tasks ", tasks);
                res.json(tasks);
            })
            .catch((err) => {
                console.log("Error finding all tasks ", err);
            });
    },

    getOneTask: (req, res) => {
        Task.find({_id: req.params.id})
            .then((task) => {
                console.log(task);
                res.json(task);
            })
            .catch((err) => {
                console.log("Error finding the task ", err);
            });
    },

    createTask: (req, res) => {
        console.log(req.body)
        const task = new Task(req.body);
        task.save()
            .then((newTask) => {
                console.log("New Task ", newTask);
                res.json(newTask);
            })
            .catch((err) => {
                console.log("Error creating task ", err);
            });
    },

    updateOneTask: (req, res) => {
        Task.findByIdAndUpdate({_id: req.params.id}, req.body)
            .then((updatedTask) => {
                console.log("Updated Task ", updatedTask);
                res.json(updatedTask);
            })
            .catch((err) => {
                console.log("Error updating task ", err);
            });
    },

    deleteOneTask: (req, res) => {
        Task.findByIdAndDelete({_id: req.params.id})
            .then((deletedTask) => {
                console.log(deletedTask);
                res.json(deletedTask);
            })
            .catch((err) => {
                console.log("Error Deleting Tasks ", err);
            });
    },

}