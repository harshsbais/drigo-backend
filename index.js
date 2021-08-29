const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(cors());
app.options('*', cors());
dotenv.config();
require('./connectDB');
const userAuthRoute = require('./routes/auth/userAuth');
const driverAuthRoute = require('./routes/auth/driverAuth');

app.use(express.json());
app.use('/api/auth/user', userAuthRoute);
app.use('/api/auth/driver', driverAuthRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
