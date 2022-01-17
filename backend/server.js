import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";
import crypto from "crypto";
import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/finalProject";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const User = mongoose.model("User", UserSchema);
// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");

  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({ response: "Please login", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

app.get("/thoughts", authenticateUser);
app.get("/thoughts", (req, res) => {
  res.send("here are your thoughts");
});

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

// app.post("/signup", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const salt = bcrypt.genSaltSync();

//     if (password.length < 5) {
//       throw "password must be at least 5 characters long";
//     }

//     const newUser = await new User({
//       username,
//       password: bcrypt.hashSync(password, salt),
//     }).save();
//     res.status(201).json({
//       response: {
//         userId: newUser._id,
//         username: newUser.username,
//         accessToke: newUser.accessToken,
//       },
//       success: true,
//     });
//   } catch (error) {
//     res.status(400).json({ response: error, success: false });
//   }
// });

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 5) {
      throw "password must be at least 5 characters long";
    }

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
    }).save();
    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        accessToke: newUser.accessToken,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
        },
        success: true,
      });
    } else {
      res.status(401).json({ response: "User not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const { username } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { username },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({ response: updatedUser, success: true });
    } else {
      res.status(404).json({ response: "Member not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
