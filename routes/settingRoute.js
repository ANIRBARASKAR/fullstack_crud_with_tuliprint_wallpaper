const {
  addDesign,
  getDesign,
  updatingDesign,
  deleteDesign,
  deleteAllDesignSizes,
} = require("../controllers/designController");
const {
  addMaterial,
  getMaterial,
  updatingMaterial,
  deleteMaterial,
  deleteAllMatrials,
} = require("../controllers/materialController");
const {
  addMockup,
  getMockup,
  addToGallary,
  deleteMockup,
  deleteAllMockups,
  updatingMockup,
} = require("../controllers/mockupController");
const {
  addSetting,
  getSetting,
  updatingSetting,
  deleteSetting,
  deleteAllSettings,
} = require("../controllers/settingController");

const router = require("express").Router();

// ************ setting

router.post("/setting/add", addSetting);
router.get("/setting/get", getSetting);
router.put("/setting/update/:id", updatingSetting);
router.delete("/setting/delete/:id", deleteSetting);
router.delete("/material/deleteAllSettings", deleteAllSettings);

// *************** Design
router.post("/design/add", addDesign);
router.get("/design/get", getDesign);
router.put("/design/update/:id", updatingDesign);
router.delete("/design/delete/:id", deleteDesign);
router.delete("/design/deleteAlldesignSize", deleteAllDesignSizes);

// **************** Mockup

router.post("/mockup/add", addMockup);
router.get("/mockup/get", getMockup);
router.put("/mockup/update/:id", updatingMockup);
router.delete("/mockup/delete/:id", deleteMockup);
router.delete("/mockup/deleteAllMockups", deleteAllMockups);

// router.post("/mockup/multiple",addToGallary)

// ********** Material

router.post("/material/add", addMaterial);
router.get("/material/get", getMaterial);
router.put("/material/update/:id", updatingMaterial);
router.delete("/material/delete/:id", deleteMaterial);
router.delete("/material/deleteAllMaterial", deleteAllMatrials);

module.exports = router;
