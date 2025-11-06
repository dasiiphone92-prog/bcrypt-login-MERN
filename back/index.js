const express = require('express')
const app = express()
const connectDB = require('./db/connect');
require('dotenv').config() 
const booksRoute = require ('./routes/booksRoute.js');
const cors = require('cors')

app.use(express.json());
app.use(cors());
app.use('/books', booksRoute);


app.get('/', (req, res)=>{
    res.send ("<h2>Sharat</h2>")
})



const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);                  //6
    app.listen(5000, () =>
      console.log('Masad netunim connected. Server is listening on port 5000...'));
  } catch (error) {
    console.log(error);
  }
};

start();

