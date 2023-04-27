const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let studentSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
	required: true,
  trim: true
  },
  rollno: {
    type: Number
  }
}, {
    collection: 'students'
  })
module.exports = mongoose.model('Student', studentSchema)