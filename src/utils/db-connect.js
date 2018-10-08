module.exports.connectDB = () => {
  mongoose.connect(
    process.env.db,
    {
      useMongoClient: true,
      socketTimeoutMS: 0,
      keepAlive: true,
      reconnectTries: 30
    }
  );
  mongoose.connection.on('error', (err) => {
    console.log(`Error Connecting to database... \n${err}`);
    process.exit(1);
  });
}
