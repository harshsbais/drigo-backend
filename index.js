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
const driverRoute = require('./routes/driver/addBus');

app.use(express.json());
// Auth routes
app.use('/api/user/auth', userAuthRoute);
app.use('/api/driver/auth', driverAuthRoute);
// Driver routes
app.use('/api/driver/buses', driverRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
