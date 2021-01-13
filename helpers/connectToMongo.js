const mongoose = require('mongoose');

const connectToMongo = async ( mongoURI ) => {
  try {
    const mongoConnection = await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    console.log(`App connected to MongoDB: ${mongoConnection.connection.host}`);
  } catch (error) {
    console.log('Unable to connect to MongoDB: ', error);
  }
}

module.exports = connectToMongo;