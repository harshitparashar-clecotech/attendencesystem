const express = require("express");
const router = express.Router();
const User = require("../module/User");
const Timer = require("../module/Timer");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const jwtSecret = "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdf";

router.post(
  "/createuser",
  body("emp", "incorrect emp").isLength({ min: 3 }),
  body("name", "name should be atleast 3 charecter").isLength({ min: 3 }),
  body("password", "password should be min 5").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        emp: req.body.emp,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("emp", "incorrect emp").isLength({ min: 3 }),
    body("password", "password should be min 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let emp = req.body.emp;
    try {
      let userdata = await User.findOne({ emp });
      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "Try loggin with correct credentials" });
      }
      const passCompair = await bcrypt.compare(
        req.body.password,
        userdata.password
      );

      if (!passCompair) {
        return res
          .status(400)
          .json({ errors: "Try loggin with correct credentials" });
      }
      const data = {
        user: {
          id: userdata.id,
        },
      };
      const dataEmp = {
        user: {
          emp: userdata.emp,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      global_id = data.user.id;
      global_emp = dataEmp.user.emp;
      console.log(global_emp);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);



router.get("/userData", async (req, res) => {
  try {
    const data = await User.findById(global_id);
    res.send({ data: data });
  } catch (error) {
    console.log(error.message);
    res.send("Server Error");
  }
});

router.post("/time", async (req, res) => {
  try {
    await Timer.create({
      time: req.body.time,
      date: req.body.date,
      location: req.body.location,
      emp: req.body.emp,
      duration: req.body.duration,
      endtime: req.body.endtime,
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

router.get("/userTime", async (req, res) => {
  try {
    let userTime = global_emp;
    const data = await Timer.find({ emp: userTime });
    console.log("data", data);
    res.send({ data: data });
  } catch (error) {
    console.log(error.message);
    res.send("Server Error");
  }
});

module.exports = router;
