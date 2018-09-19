const express = require("express");
const router = express.Router();

// GET api/posts/test
// test post route
// access public

router.get("/test", (req, res) => {
  res.json({ message: "posts works" });
});

module.exports = router;
