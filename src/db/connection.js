import mongoose from "mongoose";

mongoose.connection.on("connected", () => {
  console.log("db connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("db connection error " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("db disconnected");
});

export const dbConnect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(error.message);
  }
};
