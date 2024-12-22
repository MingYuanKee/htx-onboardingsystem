const express = require('express');
const {OnboardingTask} = require('../models/Task');
const router = express.Router();

// Endpoint to create onboarding tasks for a new employee
router.post('/create_tasks', async (req, res) => {
    console.log('router.post( / create_tasks, async (req, res) => {');
    const { employeeId, employeeName } = req.body;

    // List of tasks for a new employee
    const taskList = [
        'Get laptop',
        'Get staff pass',
        'Prepare Welcome Goody Bag'
    ];
    const session = await OnboardingTask.startSession();
    session.startTransaction();
    try {
        // Create the tasks for the employee
        const tasks = [];
        for (const name of taskList) {
            const newTask = new OnboardingTask({
                taskName: name,
                taskStatus: 'Pending',
                employeeGuid: employeeId,
                employeeName: employeeName
            });
            await newTask.save({ session });
            console.log('await newTask.save({ session });');
            tasks.push(newTask);
        }
        // Commit the transaction if all 3 tasks were successfully created
        await session.commitTransaction();
        session.endSession();

        // Respond with the created tasks
        res.status(201).json({ message: 'All 3 tasks created successfully', tasks });
    } catch (error) {

        // Rollback the transaction if any error occurs
        console.error('Error creating one or more of the onboarding tasks:', error);
        await session.abortTransaction();
        session.endSession();

        res.status(500).json({ message: 'Failed to create any of the tasks' });
    }
});

module.exports = router;
