const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OnboardingTaskSchema = new Schema({
    taskName: {
        type: String,
        required: true
    },
    taskStatus: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
    employeeName: {
        type: String,
        required: true
    },
    employeeGuid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    }
});

module.exports = {
    OnboardingTask: mongoose.model('onboardingtasks', OnboardingTaskSchema)
};