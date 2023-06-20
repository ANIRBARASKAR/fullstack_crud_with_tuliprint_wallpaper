
const {materialUpload } = require('./../util/materialUtil')
const Material = require('../models/materialModel')

exports.addMaterial = async (req, res) => {
    try {
        materialUpload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: " " + err
            })
        }
        //  console.log("req.body 🌟🌟🌟",req.body);
        //  console.log("req.file 🌟🌟🌟",req.file ) ;
        const result = await Material.create({
          ...req.body,
          materialAvtar: `materials/${req.file.filename}`
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


  exports.getMaterial = async (req, res) => {
    try {
        const result = await Material.find();
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

  exports.updatingMaterial = async (req, res) => {
    
      try {
        materialUpload(req, res, async (err) => {
          if (err) {
              return res.status(400).json({
                  success: false,
                  message: " " + err
              })
          }
          //  console.log("req.body 🌟🌟🌟",req.body);
          //  console.log("req.file 🌟🌟🌟",req.file ) ;
          const result = await Material.findByIdAndUpdate(req.params.id ,{
            ...req.body,
            materialAvtar: `materials/${req.file.filename}`
        });
          res.json({
            success: true,
            message: " Material Update Successfuly",
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


  exports.deleteMaterial = async(req , res)=>{
    try {

       

         await Material.findByIdAndDelete(req.params.id)
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
  exports.deleteAllMatrials = async(req , res)=>{
    try {

       

         await Material.deleteMany()
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

// exports.addToGallary = async (req, res) => {
//   try {
//       gallaryUpload(req, res, async err => {
//           if (err) {
//               return res.status(400).json({
//                   success: false,
//                   message: "Multer ERROR " +  err 
//               })
//           }
//           console.log("BODY", req.body) 
//           console.log("FILE", req.file)
//           const d = [] 
//           for (let i = 0; i < req.files.length; i++) {
//               d.push( `gallary/${req.files[i].filename}` )
//           }
//           console.log(d) 

//           const result = await Mockup.create({
//               ...req.body,
//               docs: d
//           })
//           res.json({
//               success: true,  
//               message: "gallary ADD SUCCESSFULLY"
//           })
//       })
//   } catch (error) {
//       res.status(400).json({
//           success: false,
//           message: "ERROR " + error
//       })
//   }
// }