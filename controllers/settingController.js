const Setting = require('./../models/settingModel')

exports.addSetting = async (req, res) => {
    try {
      const result = await Setting.create(req.body);
      res.json({
        success: true,
        message: " Setting Add Successfuly",
      
      });
    } catch (error) {
      console.log("error addSetting :- ",error);
      res.status(400).json({
          message : `🥳 ERROR ${error.message}`
      })
    }
  };
exports.getSetting = async (req, res) => {
    try {
        const result = await Setting.find();
        res.json({
          success: true,
          message: "Get Successfuly",
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
exports.updatingSetting = async (req, res) => {
    try {

      console.log("req from updatingSetting controller😜😜",req.params.id);

     
        const result = await Setting.findByIdAndUpdate(req.params.id , req.body);
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


  exports.deleteSetting = async(req , res)=>{
    try {

        console.log(req.body)
       

         await Setting.findByIdAndDelete(req.params.id)
        res.json({
            success : true ,
            message : "Setting Deleted successfuly",
        })
    } catch (error) {
        res.json({
            success : false ,
            message : `ERROR : ${error}`,
        })

    }

}

exports.deleteAllSettings = async(req , res)=>{
  try {

     

       await Setting.deleteMany()
      res.json({
          success : true ,
          message : "Setting's Deleted successfuly",
      })
  } catch (error) {
      res.json({
          success : false ,
          message : `ERROR : ${error}`,
      })

  }

}