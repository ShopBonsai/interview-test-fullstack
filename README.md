# Jiaqi's React Interview Task submission

Features included in the submission:
 -Header feature. User able to click the following route that direct user to its respective page/component: Home, products, contact, shopping cart.
 -Shopping cart Icon feature. The quantity of the items added is displayed in the cart icon, as well in the checkout page. 
 -Shopping Cart dropdown feature. User able to add multiple items to the shopping cart which will also display it in the checkout page. User is able to see the picture, quantity and price of the items added. This feature has toggle feature.
 -Shopping Checkout feature. User is able to add and delete the any items as well select the quantity on this page. User is able to see the overall cost of all the selected items combined.
 -Stripe button. user able to enter a test credit card information and use stripe to 'purchase'.
 -Like item feature. User able to click the heart button to like the items. The liked items are stroed into the database
 -Many more small features.
 -This project is mobile responsive

The following should be noted:
1. The backend is set up to seed the mock data into local MongoDB
2. The information regard shopping carts, for example, items added to cart are all stored in redux state. Redux-persis were leveraged to store the cart data locally. 
3. State management is mainly handled by Redux.  API versus redux for handling local state and the pros and cons of both because they do kind of both solve the same problem and it's rare that you'll want to use an application that has two ways of storing a local state because this kind of removes the idea of a single direction of data flow and one single source of truth. When the application is going to be large, redux is recommanded because the ecosystem is fleshed out and it provides so much more power and flexibility including all of the asynchronous. Redux also has redux-persist where as context-api requires persists to be written manually, however, context API requires less code, less folder than redux. That being said in this test context api and reat hooks are used in one component to demonstrate the alternative way to handling state, although it is not nessesary but for the purpose of the test.
4. This error might occur `Error: listen EADDRINUSE: address already in use :::3000`, if that's the case , kill the node and `yarn dev` again.
5. Currently, when the user click like an item, it will be stored into the database into a user collection with the productId.  UI feedbacks need to be added. For the purpose of the test, the likes are coded to store into the mongoDB database, however, that can take up alot of database over time, which is why Dgraph is currently being implemented.
6. There is only one package.json file. Normally, both client and server folder should each have one package.json for a Monorepo. For the purpose of this test, only one package.json is sufficient.



## Install
1. Ensure `yarn, `mongoDB`, `Robo3T` is installed


## Run & steps
1. `mongod` 
2. `yarn dev`
3. Open `Robo3T`
4. View at `http://localhost:8080/`
5. Browse frontend, navigate in all pages, click add to cart, cart icon, then checkout, stripe, like
6. Close the  browser and reopen, the cart items should be still there
7. Click heart button to like an item. look for collection react-interview-test in Robo3T, then you should be able to see the product id of the liked items
8. Use stripe.

