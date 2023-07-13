<br/>
<p align="center">
  <a href="https://github.com/ndrsov/CafeFinder">
    <img src="https://res.cloudinary.com/dd8osqetv/image/upload/v1681239758/cafefinder-logo_i9nkvn.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Cafe Finder</h3>

  <p align="center">
    Minimalist app to find the best coffee around the world.
    <br/>
    <br/>
    <a href="https://cafefinder-2otd.onrender.com">View Demo</a>
    .
  </p>
</p>



## About The Project

![Screen Shot](https://res.cloudinary.com/dd8osqetv/image/upload/v1681935985/screely-1681935979036_vvy6te.png)

MInimalist NodeJS app made to be able to find and rate the best coffee-shops around the globe and registered user can add new cafés to share with the rest of the world.

## Built With

- [Node.js](https://nodejs.org) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [express](https://expressjs.com//) - Fast, unopinionated, minimalist web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - The database for
  modern applications
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js
- [ejs](https://ejs.co/) - Embedded JavaScript templating

## Getting Started


1. Install Node

2. Clone the repo

```sh
git clone https://github.com/ndrsov/CafeFinder.git
```

3. Install NPM packages

```sh
npm install
```

4. Create a .env file (or just export manually in the terminal) in the root of the project and add the following with your personal keys:  

```
CLOUDINARY_CLOUD_NAME='<key>'
CLOUDINARY_KEY='<key>'
CLOUDINARY_SECRET='<secret>'
DB_URL='<url>'
SESSION_SECRET='<secret>'
MONGO_STORE_SECRET='<secret>'
```
5. Run it locally

```sh
npm run start
```
