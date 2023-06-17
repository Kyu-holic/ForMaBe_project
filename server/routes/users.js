const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { hash, compare } = require("bcryptjs");
const { auth } = require("../middlewares/auth");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const user = await new User({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      profilePicture: req.body.profilePicture,
      nickname: req.body.nickname,
      userid: req.body.userid,
      hashedPassword,
    }).save();
    res.status(200).json({ user, message: "회원가입 성공" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) throw new Error("존재하지 않는 유저입니다.");
    const isMatch = await compare(req.body.password, user.hashedPassword);
    if (!isMatch) throw new Error("비밀번호가 틀렸습니다.");
    // 비밀번호까지 맞다면 토큰 생성
    console.log("user :", user);
    user.generateToken((err, user) => {
      console.log("user:", user);
      console.log("err:", err);
      const { hashedPassword, ...others } = user._doc;
      if (err) return res.status(400).send(err);
      res.cookie("x_auth", user.token).status(200).json(others);
      // .json({ loginSuccess: true, userId: user._id });
    });

    // if (!isValid) throw new Error("입력하신 정보가 일치하지 않습니다.");
    // const { hashedPassword, ...others } = user._doc;
    // res.status(200).json(others);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

// LOGOUT USER
router.get("/logout", auth, async (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

router.get("/auth", auth, async (req, res) => {
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.profilePicture,
  });
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        req.body.password = await hashedPassword;
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      res.status(400).json("본인의 계정만 업데이트할 수 있습니다.");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    // 유저가 삭제되었을 때 그 유저가 작성한 posts를 모두 삭제하기 위함.
    const user = await User.findById(req.params.id);
    if (!user) throw new Error("찾고자 하는 유저가 없습니다.");
    // post model에 username이 있기 때문에 가능
    await Post.deleteMany({ username: user.username });
    if (req.body.userId === req.params.id) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("계정이 삭제 되었습니다.");
    } else {
      res.status(400).json("본인의 계정만 삭제할 수 있습니다.");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { hashedPassword, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
