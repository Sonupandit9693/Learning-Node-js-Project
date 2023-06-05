const express = require("express");

const {
  handelGetAllUsers,
  handelGetUserById,
  handelUpdateUserById,
  handelDeleteUserById,
  createNewUser,
} = require("../controllers/user");

const router = express.Router();

// REST API'S
router.route("/").get(handelGetAllUsers).post(createNewUser);

router
  .route("/:id")
  .get(handelGetUserById)
  .patch(handelUpdateUserById)
  .delete(handelDeleteUserById);
 

module.exports = router;
