// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const stroutes = require('./routes/stroutes'); 
const fileUploadService = require('./services/file-upload.service');

const app = express();
const port = 8001;

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));

app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files statically

app.use('/api', routes);
app.use('/stapi', stroutes);

const url = "mongodb+srv://easybuy6067:easybuy@stucare.src7kxl.mongodb.net/";

async function connect() {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
}

connect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
