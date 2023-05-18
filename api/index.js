import express from "express"
import cors from "cors"
import multer from "multer";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import commentsRoutes from "./routes/comments.js"
import likesRoutes from "./routes/likes.js"
import usersRoutes from "./routes/users.js"


const app = express();

const corsOptions = {
  origin:'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
}


app.use(express());
app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser())


app.use("/api/auth", authRoutes)
app.use("/api/posts", postsRoutes)
app.use("/api/comments", commentsRoutes)
app.use("/api/likes", likesRoutes)
app.use("/api/users", usersRoutes)



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage }).single('file')
app.post('/api/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});

app.listen(5500, ()=> {console.log("Conected!")})
