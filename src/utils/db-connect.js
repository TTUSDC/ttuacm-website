const mongoose = require('mongoose')

module.exports.connectDB = (connection) => {
  mongoose.connect(
    connection,
    {
      useNewUrlParser: true,
    },
  );

  mongoose.connection.on('connect', () => {
    console.log('Connected to MongoDB')
  })
  mongoose.connection.on('error', (err) => {
    console.error(`Error Connecting to database... \n${err}`);
    console.error(`Tried connecting to ${process.env.db}`)
    process.exit(1);
  });
};
