import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import bodyParser from "body-parser";


import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  credentials: true,
}));
app.use(compression())

app.use(cookieParser())
app.use(bodyParser.json());

const server = http.createServer(app)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL);
mongoose.connection.on("error",(error:Error)=>console.log(error))

