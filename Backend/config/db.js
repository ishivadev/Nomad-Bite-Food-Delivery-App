import mongoose from 'mongoose';

export const connectDB = async () => {
    const username = encodeURIComponent(process.env.DB_Username);
    const password = encodeURIComponent(process.env.DB_Password);
  
    try {
      await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.boduf7n.mongodb.net/nomad-bite`)
        .then(() => console.log("DB connected successfully.")); // wait for the promise to resolve and log the message
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
