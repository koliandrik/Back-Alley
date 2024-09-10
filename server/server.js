const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const organsRouter = require('./routes/organs');

const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/organ-shopping', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use('/api/organs', organsRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
