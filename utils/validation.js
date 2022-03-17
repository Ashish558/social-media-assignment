
var Joi = require("@hapi/joi")

//validation
function registerValidation(data){

   const schema = Joi.object({
      username: Joi.string().min(2).required(),
      email: Joi.string().min(4).required(),
      password: Joi.string().min(4).required()
   })
   try{
      return schema.validate(data)
   }
   catch(err){
      return err
   }
}


function loginValidation(data){

   const schema = Joi.object({
      username: Joi.string().min(2).required(),
      password: Joi.string().min(4).required()
   })
   try{
      return schema.validate(data)
   }
   catch(err){
      return err
   }
}


module.exports = {
  registerValidation,
  loginValidation
}
