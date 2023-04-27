let studentSchema = require('../models/Student')

exports.createStudent = async (req, res, next) => {

  try{  
    const data = await studentSchema.create(req.body);
	 console.log(data);
	 
    res.json(data)
	}
	catch (error) {
    //console.log(err);
     return next(error)
  }
	
}


exports.getStudents = async (req, res, next) => {

try {
    const data = await studentSchema.find({ });
      res.json(data)
    console.log(data);
  } catch (error) {
    //console.log(err);
     return next(error)
  }
	
}

exports.editStudent = async (req, res, next) => {

try{
    const data = await studentSchema.findById(req.params.id);
    console.log(data);
     res.json(data)
  }
  catch (error) {
    //console.log(err);
     return next(error)
  }
	
}

exports.updateStudent = async (req, res, next) => {

    try{
	const update = req.body;
	const id = req.params.id;	
    await studentSchema.findByIdAndUpdate(req.params.id, update);
	const data = await studentSchema.findById(id)
    console.log(data);
     res.json(data)
	}
	catch (error) {
    //console.log(err);
     return next(error)
  }
	
}

exports.deleteStudent = async (req, res, next) => {

   try{
      const data = await studentSchema.findByIdAndRemove(req.params.id);
      res.status(200).json({msg: data})
      }
  	  catch (error) {
      //console.log(err);
      return next("EOOR "+error)
     }
 
}
 
