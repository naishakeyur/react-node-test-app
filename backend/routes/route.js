 let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
// Student Model

let User = require('../models/userModel')
let studentSchema = require('../models/Student')
const userController = require('../controllers/userController')
const studentController = require('../controllers/studentController')

router.post('/signup', userController.signup);
 
router.post('/login', userController.login);
 
router.get('/user/:userId', userController.getUser);
 
router.get('/users', userController.grantAccess('readAny', 'profile'), userController.getUsers);
 
router.put('/user/:userId', userController.grantAccess('updateAny', 'profile'), userController.updateUser);
 
router.delete('/user/:userId', userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

router.get('/students', userController.grantAccess('readAny', 'profile'),  studentController.getStudents);

router.post('/create-student', userController.grantAccess('updateAny', 'profile'), studentController.createStudent);
router.get('/edit-student/:id', studentController.editStudent);
router.put('/update-student/:id', userController.grantAccess('updateAny', 'profile'), studentController.updateStudent);
router.delete('/delete-student/:id', userController.grantAccess('deleteAny', 'profile'), studentController.deleteStudent);

module.exports = router;