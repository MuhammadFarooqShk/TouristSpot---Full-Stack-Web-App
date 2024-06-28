const mongoose = require("mongoose");
const URL ="mongodb+srv://admin:admin@cluster0.wzubzlm.mongodb.net/webproject";

const connectMongo = async () => {
  await mongoose.connect(URL);
  console.log("Connected");
  const foodItems = mongoose.connection.collection("products");
  try {
    const data = await foodItems.find({}).toArray();
    global.items = data;
  } catch (error) {
    console.error(error);
  }
};
module.exports = connectMongo;