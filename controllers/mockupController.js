
const {mockupUpload, gallaryUpload} = require('./../util/mockupUtil')
const Mockup = require('../models/mockupsModel')

exports.addMockup = async (req, res) => {
    try {
      mockupUpload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: " " + err
            })
        }
        //  console.log("req.body 🌟🌟🌟",req.body);
        //  console.log("req.file 🌟🌟🌟",req.file ) ;
        const result = await Mockup.create({
          ...req.body,
          avtar: `profile/${req.file.filename}`
      });
        res.json({
          success: true,
          message: " Mockup Add Successfuly",
          result 
        
        });
    })
      // ******
   
    } catch (error) {
      console.log("error Mockup :- ",error);
      res.status(400).json({
          message : `🥳 ERROR ${error.message}`
      })
    }
  };


  exports.getMockup = async (req, res) => {
    try {
        const result = await Mockup.find();
        res.json({
          success: true,
          message: "Mockup Get Successfuly",
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

  exports.updatingMockup = async (req, res) => {
    // try {

    //   console.log("req from updatingMockup controller😜😜",req.params.id);

     
    //     const result = await Mockup.findByIdAndUpdate(req.params.id , req.body);
    //     res.json({
    //       success: true,
    //       message: "updates  Successfuly",
        
    //          result 
        
    //     });
    //   } catch (error) {
    //     res.status(400).json({
    //         message : `ERROR ${error.message}`
    //     })
    //   }

      // **************

      try {
        mockupUpload(req, res, async (err) => {
          if (err) {
              return res.status(400).json({
                  success: false,
                  message: " " + err
              })
          }
          //  console.log("req.body 🌟🌟🌟",req.body);
          //  console.log("req.file 🌟🌟🌟",req.file ) ;
          const result = await Mockup.findByIdAndUpdate(req.params.id ,{
            ...req.body,
            avtar: `profile/${req.file.filename}`
        });
          res.json({
            success: true,
            message: " Mockup Add Successfuly",
            result 
          
          });
      })
        // ******
     
      } catch (error) {
        console.log("error Mockup :- ",error);
        res.status(400).json({
            message : `🥳 ERROR ${error.message}`
        })
      }
  };


  exports.deleteMockup = async(req , res)=>{
    try {

        // console.log(req.body)
       

         await Mockup.findByIdAndDelete(req.params.id)
        res.json({
            success : true ,
            message : "Mockup Deleted successfuly",
        })
    } catch (error) {
        res.json({
            success : false ,
            message : `ERROR : ${error}`,
        })

    }

}
  exports.deleteAllMockups = async(req , res)=>{
    try {

        // console.log(req.body)
       

         await Mockup.deleteMany()
        res.json({
            success : true ,
            message : "Mockup Deleted successfuly",
        })
    } catch (error) {
        res.json({
            success : false ,
            message : `ERROR : ${error}`,
        })

    }

}

exports.addToGallary = async (req, res) => {
  try {
      gallaryUpload(req, res, async err => {
          if (err) {
              return res.status(400).json({
                  success: false,
                  message: "Multer ERROR " +  err 
              })
          }
          console.log("BODY", req.body) 
          console.log("FILE", req.file)
          const d = [] 
          for (let i = 0; i < req.files.length; i++) {
              d.push( `gallary/${req.files[i].filename}` )
          }
          console.log(d) 

          const result = await Mockup.create({
              ...req.body,
              docs: d
          })
          res.json({
              success: true,  
              message: "gallary ADD SUCCESSFULLY"
          })
      })
  } catch (error) {
      res.status(400).json({
          success: false,
          message: "ERROR " + error
      })
  }
}