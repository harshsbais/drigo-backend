const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();
app.use(cors());
app.options('*', cors());
dotenv.config();
require('./connectDB');
const userAuthRoute = require('./routes/auth/userAuth');
const driverAuthRoute = require('./routes/auth/driverAuth');
const driverRoute = require('./routes/driver.routes');
const userRoute = require('./routes/user.routes');
const busRoute = require('./routes/bus.routes');
const placeRoute = require('./routes/place.routes');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Drigo Backend',
      description: 'Backend for Drigo',
      contact: {
        name: 'HSB',
      },
      servers: ['http://localhost:8000'],
    },
  },
  apis: ['app.js', './routes/**/*.routes.js', './routes/*.routes.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(express.json());
// Docs route
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// Auth routes
app.use('/api/user/auth', userAuthRoute);
app.use('/api/driver/auth', driverAuthRoute);
// Driver routes
app.use('/api/driver', driverRoute);
app.use('/api/user', userRoute);
app.use('/api/bus', busRoute);
app.use('/api/place', placeRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
