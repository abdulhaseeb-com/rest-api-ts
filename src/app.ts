import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import bodyParser from "body-parser";


import mongoose,{ConnectOptions} from "mongoose";

//const {MONGODB_URI} = process.env;
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  credentials: true,
}));
app.use(compression())

app.use(cookieParser())
app.use(bodyParser.json());

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
/*
const connectOptions: ConnectOptions = {};

mongoose.connect(MONGODB_URI!, connectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err: Error) => {
    console.error('Failed to connect to MongoDB', err);
  });
*/
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("error",(error:Error)=>console.log(error))

