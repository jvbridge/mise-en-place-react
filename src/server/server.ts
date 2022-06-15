import express = require("express");
// import { ApolloServer } from "apollo-server-express";
import path = require("path");

const PORT = process.env.Port || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.listen(PORT, ()=>{
  console.log(`API server running on port ${PORT}`);
})