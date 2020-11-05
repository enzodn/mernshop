
# Mernshop

> eCommerce platform built with the MERN stack and Redux.



<p float="left">
  <img src="https://github.com/enzodn/mernshop/blob/main/uploads/screenshot.png" height="350px" />
  <img height="400px" hspace="30px"/>
  <img src="https://github.com/enzodn/mernshop/blob/main/uploads/screenshot_mobile.jpg" height="350px"/> 
</p>


## 👉 [Live Demo](https://mernshopsimple.herokuapp.com/)

Sample User Logins
```
admin@example.com (Admin)
admin
```
```
user@example.com (Customer)
user
```
```
david@example.com (Customer)
david
```

## Features

- [x] Full featured shopping cart
- [x] Product reviews and ratings
- [x] Top products carousel
- [x] Product search feature
- [x] User profile with orders
- [x] Admin product management
- [x] Admin user management
- [x] Admin Order details page
- [x] Mark orders as delivered option
- [x] Checkout process
- [x] PayPal / credit card integration
- [x] Database seeder (products & users)

## Technologies 
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [MongoDB](https://www.mongodb.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)




# Usage

### Env Variables

Create a .env file in the root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = <your mongodb uri>
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = <your paypal client id>
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

### Seed Database

commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

## License
The MIT License
