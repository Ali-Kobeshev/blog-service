import mongoose from "mongoose";

const mongoUri =
   process.env.DB_URL ||
   "mongodb+srv://alikobeshev:9eTEJeBuRkvtv0oq@blog-cluster.5vwnd.mongodb.net/blog?retryWrites=true&w=majority&appName=blog-cluster";

export async function runDb() {
   try {
      await mongoose.connect(mongoUri);
      console.log("connected to mongo serever");
   } catch (error) {
      console.log(error);
      await mongoose.disconnect();
   }
}
