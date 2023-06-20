const fs = require("fs")
const multer = require("multer")
const path = require("path")
const { v4: uuid } = require("uuid")

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const allowedEXT = [".png", ".jpg", ".jpeg"]
        if (!allowedEXT.includes(ext)) {
            cb("INVALID EXTAINTION")
        }
        const fn = uuid() + ext
        cb(null, fn)
    }, 
    destination: (req, file, cb) => {
        const loc = "public/profile"
        // const loc = "public/mockups"
        fs.mkdirSync(loc, { recursive: true })
        cb(null, loc)
    }
})
// 

const multistorage = multer.diskStorage({
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const allowedEXT = [".png", ".jpg", ".jpeg", ".pdf"]
        if (!allowedEXT.includes(ext)) {
            cb("INVALID EXTAINTION")
        }
        const fn = uuid() + ext
        cb(null, fn)
    },
    destination: (req, file, cb) => {
        const loc = "public/gallary"
        fs.mkdirSync(loc, { recursive: true })
        cb(null, loc)
    }
})
// 
exports.mockupUpload = multer({ storage }).single("avtar")
// 
exports.gallaryUpload = multer({ storage: multistorage, limits: { fileSize: "1mb" } }).array("doc", 5)
