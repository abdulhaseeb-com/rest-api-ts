import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app: Application = express();
const PORT = 3000;

// MongoDB setup
mongoose.connect(
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Create a simple user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

app.use(bodyParser.json());

// Create a user
app.post("/users", async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// Get all users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error getting users" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
