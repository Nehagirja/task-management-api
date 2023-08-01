const tasksRoutes = require('express').Router();
const bodyParser = require('body-parser');
const tasksData = require("../tasks.json");
const path = require('path');
const validator = import("../helpers/validator")
const fs = require('fs');

tasksRoutes.use(bodyParser.json());

tasksRoutes.get("/", (req, res) => {
    return res.status(200).json(tasksData);
})

tasksRoutes.get("/:id", (req, res) => {
    let tasks = tasksData.tasks;
    let taskId = req.params.id;
    let result = tasks.filter(val => val.taskId === taskId)
    if (result == null || result == undefined || result.length == 0) {
        return res.status(404).json({ "message": "task that you requested does not exist" });
    }
    return res.status(200).json(result);
});

tasksRoutes.post('/', (req, res) => {
    const newTask = req.body;
    if (validator.validateTaskInfo(newTask, tasksData).status) {
        let writePath = path.join(__dirname, '..', 'tasks.json');
        let tasksModified = JSON.parse(JSON.stringify(tasksData));
        tasksModified.tasks.push(newTask);
        try {
            fs.writeFileSync(writePath, JSON.stringify(tasksModified), { encoding: 'utf-8', flag: 'w' });
            return res.status(200).json({ "message": "task has been created successfully" });
        } catch (err) {
            return err.status(500).json({ "message": "write has failed we are sorry, try back again later" });
        }
    } else {
        return res.status(400).json(validator.validateTaskInfo(newTask, tasksData))
    }
});

tasksRoutes.delete("/:id", (req, res) => {
    let tasks = tasksData.tasks;
    let taskId = req.params.id;
    const taskIndex = tasks.findIndex(task => task.taskId === taskId)
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'task not found' });
    }
    tasks.splice(taskIndex, 1);
    fs.writeFileSync(`${__dirname}/../result.json`, JSON.stringify(taskData), {
        encoding: 'utf8',
        flag: 'w',
    });
    res.status(200).json({ message: 'Task deleted successfully' });

});

tasksRoutes.put("/:id", (req, res) => {
    let tasks = tasksData.tasks;
    const taskId = Number(req.params.id);
    const foundTask = tasksData.find((task) => task.taskId === taskId);
    if (!foundTask) {
        res.status(404).json({ message: 'Invalid ID' });
    }
    const { task, description, flag } = req.body;
    const index = tasksData.findIndex((task) => task.id === id);
    tasksData[index].task = task;
    tasksData[index].description = description;
    tasksData[index].flag = flag;

    fs.writeFileSync(`${__dirname}/../result.json`, JSON.stringify(taskData), {
        encoding: 'utf8',
        flag: 'w',
    });
    const updatedTask = tasksData.find((task) => task.taskId === taskId);
    res.status(200).json({ data: { updatedTask } });
})

module.exports = tasksRoutes;

