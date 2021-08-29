const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(cors());
app.options('*', cors());
dotenv.config();

app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});
