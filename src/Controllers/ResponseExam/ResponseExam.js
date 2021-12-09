const Response = require('../../Models/Exam/responseExamModel');
const User = require('../../Models/User/userModel');
module.exports = {
    index: async (req, res, next) => {
        const response = await Response.find({});
        res.status(200).json(response)

    },
    newRespon: async (req, res, next) => {
        // res.status(200).json(req);
        const userCode=req.user;
        const newRespon = new Response(req.body);
        try {
            const respon = await newRespon.save();
            await User.findOneAndUpdate({_id:userCode},{$push:{'exams':respon._id}})
            res.status(200).json(respon);
        }catch(e){
            console.log(e);
            res.status(500).json({success:false});
        }

}







}