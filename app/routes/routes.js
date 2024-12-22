const express = require('express');
const router = express.Router();

// Import routes from other files
const frontRoutes = require('./front');
const onboardingTasksRoutes = require('./onboardingTasks');

// Register routes
router.use('/front', frontRoutes);
router.use('/onboardingTasks', onboardingTasksRoutes);

module.exports = router;
