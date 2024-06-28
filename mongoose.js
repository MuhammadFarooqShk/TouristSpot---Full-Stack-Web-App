const mongoose = require("mongoose");
const URL ="mongodb+srv://admin:admin@cluster0.wzubzlm.mongodb.net/webproject";

const connectMongo = async () => {
  await mongoose.connect(URL);
  console.log("Connected");
  //const foodItems = mongoose.connection.collection("product");
  const foodItems = mongoose.connection.collection("products");

  try {
    const data = await foodItems.find({}).toArray();
    global.items = data;
  } catch (error) {
    console.error(error);
  }
//   const foodCategory = mongoose.connection.collection("itemsCategory");
//   try {
//     const categ = await foodCategory.find({}).toArray();
//     global.categ = categ;
//   } catch (e) {
//     console.log(e);
//   }
};
module.exports = connectMongo;