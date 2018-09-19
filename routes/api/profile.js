const express = require("express");
const router = express.Router();

// GET api/profile/test
// test profile route
// access public

router.get("/test", (req, res) => {
  res.json({ message: "profile works" });
});

module.exports = router;
