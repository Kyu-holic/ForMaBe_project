const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const Image = require("./models/Image");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");
const cookieParser = require("cookie-parser");

dotenv.config();

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB is connected...");

    const upload = multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "./images");
        },
        filename: (req, file, cb) =>
          cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
      }),
    });

    app.post("/api/images/upload", upload.single("file"), async (req, res) => {
      const image = await new Image({
        key: req.file.filename,
        originalFileName: req.file.originalname,
      }).save();
      res.json(image);
    });

    app.get("/api/images", async (req, res) => {
      try {
        const images = await Image.find();
        res.status(200).json(images);
      } catch (err) {
        console.log(err);
        res.status(400).send({ err: err.message });
      }
    });

    app.use(express.json());
    app.use(cookieParser());
    app.use("/images", express.static("images"));
    app.use("/", express.static("build"));
    // app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/api/posts", postRoute);
    app.use("/api/categories", categoryRoute);

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log("server is listening on port " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
