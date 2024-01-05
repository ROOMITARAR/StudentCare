// stroutes.js

const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { upload } = require('../services/file-upload.service');
const stuser = require('../models/stuser');

const router = Router();

///////////////////////////////////////////////////////////////////////////

router.post('/sregister', upload.single('transcriptFile'), async (req, res) => {
  try {
    const { name, email, password, gender, cgpa } = req.body;
    const transcriptFile = req.file;
    const existingUser = await stuser.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({ message: "Email is already registered" });
    }


    if (!transcriptFile) {
      return res.status(400).send({ message: 'No transcript file uploaded' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = new stuser({
      name: name,
      email: email,
      password: hashedPassword,
      gender: gender,
      cgpa: cgpa,
      transcriptFile: transcriptFile.filename,
    });



    const savedStudent = await newStudent.save();

    const token = jwt.sign({ _id: savedStudent._id }, "secret");

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.send({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
router.post('/login', async (req, res) => {
  const user = await stuser.findOne({email:req.body.email})
  if(!user){
     return res.status(404).send({
      message: "User Not Found"
     })     
  }

  if(!(await bcrypt.compare(req.body.password,user.password))){
      return res.status(400).send({
          message: "Wrong Password"
         }) 
  }

 const token = jwt.sign({_id:user._id}, "secret")

res.cookie('jwt', token, {
  httpOnly:true,
  maxAge:24*60*60*1000
})
res.send({
  message:"success"
})


});

//////////////////////////////////////////////////

router.get('/user', async (req, res) => {
  try{

   const cookie= req.cookies['jwt']

   const claims = jwt.verify(cookie, "secret")

   if(!claims){
       return rs.status(401).send({
           message: "unauthenticated"
       }) 
   }   

       const user = await stuser.findOne({_id:claims._id})

       const {password,...data} = await user.toJSON()
       res.send(data)
   
   }

  catch(err){
        return res.status(401).send({
           message: 'unauthenticate'
        })
  }
}
);
////////////////////////////////

router.post('/logout', (req , res) =>{
  res.cookie("jwt" , "" , {maxAge:0})

  res.send({
      message:"logout success"
  })
} )

module.exports = router;
