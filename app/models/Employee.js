const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: false,
        default: function () {
            return this.firstName + ' ' + this.lastName;
        }
    }
});
// Export both models in an object
module.exports = {
    Employee: mongoose.model('employees', EmployeeSchema)
};
