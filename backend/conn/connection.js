import mongoose from "mongoose";
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongo ✅");
  } catch (err) {
    console.error("MongoDB connection failed ❌", err.message);
  }
};
export default connect;
