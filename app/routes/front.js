const express = require('express');
const { Employee } = require('./../models/Employee');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config({ path: process.cwd() +'/environmentVariable.env' });

// Landing page route
router.get('/', async (req, res) => {
    
    res.render("landingPage");
});

// Success page route
router.get('/success', (req, res) => {
    res.render('success');
});

// POST - After clicking 'Create Account' button
router.post('/create_employee', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Create a new employee record using the request body
        const newEmployee = new Employee({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            title: req.body.title,
            team: req.body.team,
            location: req.body.location
        });
        await newEmployee.save({ session });

        // Make an API call to the Onboarding System to create the tasks
        const onboardingApiUrl = `${process.env.ONBOARDING_API_URL}/create_tasks`;
        console.log('onboardingApiUrl: ', onboardingApiUrl);
        const tasksResponse = await axios.post(onboardingApiUrl, {
            employeeId: newEmployee._id,
            employeeName: `${req.body.firstName} ${req.body.lastName}`
        });

        // Check if the tasks creation was successful
        if (tasksResponse.status === 201) {

            // Commit the transaction and close session if all records creation succeed
            await session.commitTransaction();
            session.endSession();

            // Fetch the associated tasks of the new Employee
            const tasks = tasksResponse.data.tasks;

            //Route to 'success' page
            res.render('success', { newEmployee, tasks });
        }
        else {
            //Rollback if there are error in creating tasks in Onboarding System
            throw new Error('Failed to create any of the tasks in the Onboarding System');
        }
    } catch (err) {
        console.error('Error during onboarding process:', err);
        await session.abortTransaction();
        session.endSession();

        res.status(500).send('Failed to create employee and/or tasks. Please try again.');
    }
});

module.exports = router;
