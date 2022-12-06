const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//@route GET api/auth
//@desc Fetch user
//@access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//@route POST api/auth
//@desc Login User
//@access Public

router.post("/", async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ errors: { msg: "Parameter missing" } });

  try {
    //See if user exists

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ errors: { msg: "Invalid credentials" } });
    }

    const isMatch = user.password === password;

    if (!isMatch) {
      return res.status(401).json({ errors: { msg: "Invalid credentials" } });
    }

    const payload = {
      user: {
        id: user.id,
        theme: user.theme,
      },
    };

    //Return jsonwebtoken

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;

        return res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }

  // res.send("Users Route");
});

//@route POST api/auth/theme
//@desc Update theme for user
//@access Public

router.put("/theme", auth, async (req, res) => {

  const { theme } = req.body;
  if (!theme) return res.status(400).json({ msg: "Parameter missing" });

  try {
    //See if user exists
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ msg: "User not found" });
    user.theme = theme;
    await user.save();
    return res.status(200).json({ msg: "Theme updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }

  // res.send("Users Route");
});

module.exports = router;
