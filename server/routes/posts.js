const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { auth } = require("../middlewares/auth");

// CREATE POST
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) throw new Error("회원만 글을 등록할 수 있습니다.");
    const post = await new Post(req.body).save();
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

// UPDATE POST
router.put("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log("수정 완성");
    if (post.username === req.user.username) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } else {
      throw new Error("내가 등록한 글만 업데이트할 수 있습니다.");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

// DELETE POST
router.delete("/:id", auth, async (req, res) => {
  try {
    // console.log("req.username:", req.cookies.x_auth);
    const post = await Post.findById(req.params.id);
    // console.log("post.username", post.username);
    // console.log("req.user.username", req.user.username);
    if (post.username === req.user.username) {
      await post.delete();
      res.status(200).json("글이 삭제 되었습니다.");
    } else {
      throw new Error("내가 등록한 글만 삭제할 수 있습니다.");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    // req.query.(여기) 여기 부분은 아무렇게나 작성 가능.
    // 대신 여기서 작성한 이름과 주소에서의 이름과 같아야 함
    // 예를 들어서 req.query.user라고 했으면 아래처럼 해야함
    // http://localhost:5000/api/posts/?user=test1
    const username = req.query.user;
    const keyword = req.query.keyword;
    console.log("keyword", keyword);
    // posts는 변경될 수 있으므로 const가 아닌 let으로
    let posts;
    if (username) {
      posts = await Post.find({
        username,
        $text: { $search: keyword },
      });
    } else {
      posts = await Post.find({
        $or: [{ title: { $regex: keyword } }, { desc: { $regex: keyword } }],
      });

      // console.log("posts", posts);
    }
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
