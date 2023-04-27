const User = require('../models/userModel');

const bcrypt = require('bcrypt');

const { roles } = require('../roles')
 
exports.grantAccess = function(action, resource) {

return async (req, res, next) => {
  try {
  console.log(req.query);
  userToken=req.query.token;
    console.log(userToken);
  if(userToken=="null"){
    return res.status(401).json({
     error: "You don't have enough permission to perform this action"
    });  
  }
  else
  	var user = await User.findOne({ "email":userToken }); 
	console.log(user.role)

  
   const permission = roles.can(user.role)[action](resource);

   if (!permission.granted) {
   	console.log("You don't have enough permission to perform this action");
    return res.status(401).json({
     error: "You don't have enough permission to perform this action"
    });

   }
   next()
  } catch (error) {console.log("erere");console.log(error);
   next(error)
  }
 }
}
 
exports.allowIfLoggedin = async (req, res, next) => {
 try {
  const user = res.locals.loggedInUser;
  if (!user)
   return res.status(401).json({
    error: "You need to be logged in to access this route"
   });
   req.user = user;
   next();
  } catch (error) {
   next(error);
  }
}
 
async function hashPassword(password) {
 return await bcrypt.hash(password, 10);
}
 
async function validatePassword(plainPassword, hashedPassword) {
 return await bcrypt.compare(plainPassword, hashedPassword);
}
 
exports.signup = async (req, res, next) => {
 try {
  const { email, password, role } = req.body
  const hashedPassword = await hashPassword(password);
  const newUser = new User({ email, password: hashedPassword, role: role || "basic" });
  await newUser.save();
  res.json({
   data: newUser
  })
 } catch (error) {
  next(error)
 }
}

exports.login = async (req, res, next) => {
 try {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new Error('Email does not exist'));
  const validPassword = await validatePassword(password, user.password);
  if (!validPassword) return next(new Error('Password is not correct'))
  console.log({
   data: { email: user.email, role: user.role } });
  res.status(200).json({
   data: { email: user.email, role: user.role } })
 } catch (error) {
  next(error);
 }
}

exports.getUsers = async (req, res, next) => {
 const users = await User.find({});
 console.log(users);
 res.status(200).json({
  data: users
 });
}
 
exports.getUser = async (req, res, next) => {
 try {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) return next(new Error('User does not exist'));
   res.status(200).json({
   data: user
  });
 } catch (error) {
  next(error)
 }
}
 
exports.updateUser = async (req, res, next) => {
 try {
  const update = req.body
  const userId = req.params.userId;
  await User.findByIdAndUpdate(userId, update);
  const user = await User.findById(userId)
  res.status(200).json({
   data: user,
   message: 'User has been updated'
  });
 } catch (error) {
  next(error)
 }
}
 
exports.deleteUser = async (req, res, next) => {
 try {
  const userId = req.params.userId;
  await User.findByIdAndDelete(userId);
  res.status(200).json({
   data: null,
   message: 'User has been deleted'
  });
 } catch (error) {
  next(error)
 }
}