const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: 1,
    },
    email: {
      type: String,
      required: true,
      unique: 1,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    role: {
      type: Number,
      default: 0,
    },
    token: {
      type: String,
    },
    tokenExp: {
      type: Number,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = function (cb) {
  var user = this;
  console.log("method user:", user);
  //jsonwebtoken을 이용하여 token을 생성
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  console.log("static user:", user);

  // 토큰을 decode 한다.
  jwt.verify(token, "secretToken", async function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과  DB에 보관된 token이 일치한지 확인
    console.log("decoded", decoded);
    const currentUser = await user.findOne({ _id: decoded });
    cb(null, currentUser);
  });
};

module.exports = mongoose.model("User", userSchema);
