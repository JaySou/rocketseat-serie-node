const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/Project');
const Task = require('../models/Task');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {

    try {

        const projects = await Project.find().populate(['user', ]);

        return res.status(200).send({
            projects
        });

    } catch (error) {
        return res.status(400).send({
            error: "Error to list projects"
        });
    }
});

router.get('/:projectId', async (req, res) => {

    try {

        const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);

        return res.status(200).send({
            project
        });

    } catch (error) {

        res.status(400).send({
            error: 'Error when searching for porject'
        });

    }
});

router.post('/', async (req, res) => {

    try {

        const {
            title,
            description,
            tasks
        } = req.body;

        const project = await Project.create({
            title,
            description,
            user: req.userid
        });

        await Promise.all(
            tasks.map(async task => {
                const projectTask = new Task({
                    ...task,
                    project: project._id
                });

                console.log(tasks)

                await projectTask.save();

                project.tasks.push(projectTask);
            }));

        await project.save();

        return res.send({
            project
        });


    } catch (error) {
        res.status(400).send({
            error: 'Error creating new project',
            error
        });
    }

});

router.put('/:projectId', async (req, res) => {
    try {

        const { title, description, tasks } = req.body;

        const project = await Project.findByIdAndUpdate(req.params.projectId, { title, description }, { new: true });

        project.tasks = [];
        await Task.remove({ project: req.params.projectId });

        await Promise.all(
            tasks.map(async task => {
                const projectTask = new Task({
                    ...task,
                    project: project._id
                });

                console.log(tasks)

                await projectTask.save();

                project.tasks.push(projectTask);
            }));

        await project.save();

        return res.send({ project });

    } catch (error) {
        res.status(400).send({
            error: 'Error creating new project',
            error
        });

        console.log(error)
    }
});

router.delete('/:projectId', async (req, res) => {

    try {
        await Project.findByIdAndRemove(req.params.projectId);

        return res.send();

    } catch (error) {

        return res.status(400).send({
            error: 'Error deleting project'
        });

    }
});

module.exports = app => app.use('/projects', router);