const Design = require('./../models/designModel')

exports.addDesign = async (req, res) => {
    try {
      const result = await Design.create(req.body);
      res.json({
        success: true,
        message: " Design Add Successfuly",
      
      });
    } catch (error) {
      console.log("error addDesign :- ",error);
      res.status(400).json({
          message : `🥳 ERROR ${error.message}`
      })
    }
  };


  exports.getDesign = async (req, res) => {
    try {
        const result = await Design.find();
        res.json({
          success: true,
          message: "Design Get Successfuly",
          result : {
             result 
          }
        });
      } catch (error) {
        res.status(400).json({
            message : `ERROR ${error.message}`
        })
      }
  };

  exports.updatingDesign = async (req, res) => {
    try {

      console.log("req from updatingDesign controller😜😜",req.params.id);

     
        const result = await Design.findByIdAndUpdate(req.params.id , req.body);
        res.json({
          success: true,
          message: "updates  Successfuly",
        
             result 
        
        });
      } catch (error) {
        res.status(400).json({
            message : `ERROR ${error.message}`
        })
      }
  };


  exports.deleteDesign = async(req , res)=>{
    try {

        console.log(req.params.id)
       

         await Design.findByIdAndDelete(req.params.id)
        res.json({
            success : true ,
            message : "deleteDesign Deleted successfuly",
        })
    } catch (error) {
        res.json({
            success : false ,
            message : `ERROR : ${error}`,
        })

    }

}

exports.deleteAllDesignSizes = async(req , res)=>{
  try {

     

       await Design.deleteMany()
      res.json({
          success : true ,
          message : "Material Deleted successfuly",
      })
  } catch (error) {
      res.json({
          success : false ,
          message : `ERROR : ${error}`,
      })

  }

}