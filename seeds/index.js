const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Coffeeshop = require('../models/coffeeshop');

mongoose
  .connect('mongodb://localhost:27017/cafe-finder')
  .then(() => {
    console.log('Connection with Mongo open');
  })
  .catch((err) => {
    console.log('There was an error');
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Coffeeshop.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const avgprice = Math.floor(Math.random() * 20) + 1;
    const cafe = new Coffeeshop({
      author: '63ebe81836385b27830ef511',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad aut maiores rem, repellendus neque quis inventore dolorem magnam, sunt autem similique corrupti iusto! Modi, earum? Deserunt minus porro fuga atque.',
      avgprice,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dd8osqetv/image/upload/v1678218378/CafeFinder/nnt4sibibqmzbaxk20sz.jpg',
          filename: 'CafeFinder/oepenrg2x4mr1cf8danp',
        },
      ],
    });
    await cafe.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
