const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(`Connection error: ${err}`));
