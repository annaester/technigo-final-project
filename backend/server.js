import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";
import crypto from "crypto";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";

import questionsData from "./data/questions.json";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/finalProject";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const MemberSchema = new mongoose.Schema({
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

const Member = mongoose.model("Member", MemberSchema);

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: Array,
  level: Number,
  correctanswer: Number,
});

const Question = mongoose.model("Question", QuestionSchema);

const ResultsSchema = new mongoose.Schema({
  username: String,
  answers: Number,
  timespent: String,
});

const Results = mongoose.model("Results", ResultsSchema);

if (process.env.RESET_DB) {
  const seedDatabase = async () => {
    await Question.deleteMany({});

    questionsData.forEach((item) => {
      const newQuestion = new Question(item);
      newQuestion.save();
    });
  };

  seedDatabase();
}

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

const authenticateMember = async (req, res, next) => {
  const accessToken = req.header("Authorization");

  try {
    const member = await Member.findOne({ accessToken });
    if (member) {
      next();
    } else {
      res.status(401).json({ response: "Please login", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 5) {
      throw "Password must be at least 5 characters long";
    }

    const newMember = await new Member({
      username,
      password: bcrypt.hashSync(password, salt),
    }).save();
    res.status(201).json({
      response: {
        userId: newMember._id,
        username: newMember.username,
        accessToke: newMember.accessToken,
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
    const member = await Member.findOne({ username });

    if (member && bcrypt.compareSync(password, member.password)) {
      res.status(200).json({
        response: {
          userId: member._id,
          username: member.username,
          accessToken: member.accessToken,
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

app.get("/questions", authenticateMember);
app.get("/questions", async (req, res) => {
  const { level } = req.query;

  try {
    let question = await Question.find(req.query);

    if (req.query.level) {
      const questionsByLevel = await Question.find({ level });
      question = questionsByLevel;
    }

    res.status(200).json(question);
  } catch (err) {
    res.status(400).json({ response: "No questions found", success: false });
  }
});

app.get("/results", authenticateMember);
app.get("/results", async (req, res) => {
  try {
    const results = await Results.find()
      .limit(10)
      .sort({ answers: +1, timespent: +1 })
      .exec();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ message: "No results found today", success: false });
  }
});

app.post("/results", async (req, res) => {
  const { username, answers, timespent } = req.body;

  try {
    const newResults = await new Results({
      username: username,
      answers: answers,
      timespent: timespent,
    }).save();
    res.status(201).json({
      response: newResults,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
