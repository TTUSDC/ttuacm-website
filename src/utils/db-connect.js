const mongoose = require('mongoose')

module.exports.connectDB = () => {
  mongoose.connect(
    process.env.db || 'mongodb://localhost:27017/development',
    {
      useNewUrlParser: true,
    },
  );

  mongoose.connection.on('connect', () => {
    console.log('Connected to MongoDB')
  })
  mongoose.connection.on('error', (err) => {
    console.log(`Error Connecting to database... \n${err}`);
    process.exit(1);
  });
};
