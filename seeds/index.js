const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Coffeeshop = require("../models/coffeeshop");

mongoose
  .connect("mongodb://localhost:27017/cafe-finder")
  .then(() => {
    console.log("Connection with Mongo open");
  })
  .catch((err) => {
    console.log("There was an error");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Coffeeshop.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const avgprice = Math.floor(Math.random() * 20) + 10;
    const cafe = new Coffeeshop({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/2557534",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad aut maiores rem, repellendus neque quis inventore dolorem magnam, sunt autem similique corrupti iusto! Modi, earum? Deserunt minus porro fuga atque.",
      avgprice,
    });
    await cafe.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
