# Bonsai Fullstack React/Node Test - Submission by Pierre Yue

Welcome to my (not)ShopBonsai Shopping app!

![Bonsai-Fullstack-Test-login-page](/IMG/landing-page.png)

The below information will document some features I have build for this submission as well as outline the dependencies/libraries I have used to complete this test.

Requirement: Build a full stack shopping application to allow users to interface with. Front end will be built with React and back end will be built with Node.js. Database will be a mock data files located within the project. Request will be made using GraphQL queries/mutations from the front end to the backend.

App Features:
 - Allow user to browse products available to be sold by the merchants working with Bonsai
 - Allow user to add the products they would like to purchase to an online shopping cart
 - Menubar to allow user to navigate between "products" page and "user profile" page
 - User can change the quantity of the product they want to add to cart before clicking "add to cart"
 - Shopping cart allows users to increase or decrease quantity in cart
     - increase only allowed if there is enough available product quantity - otherwise the "add to cart" button of the product and the (+) button in cart will be disabled
     - "add to cart" button will also be disabled for that item if user is trying to add a quantity exceeding the sum of "quantity to add" and "quantity in cart" for that item
     - decrease quantity of the product in cart only until 1 is showing - if (-) is pressed at quantity x 1, item is removed from cart
 - Shopping cart allows users to click "clear cart" which will remove all items in the cart at the same time.
 - Users can sign in via social media(Google Sign-in)
     - *New users* will have their account created in the mock users database, while *returning users* will load their existing data from the database
     - After Google authentication, app will then store the Google-returned payload of user's profile information as context for the app 
     - Once logged in, tool bar will update to show a welcome message relating to the user's full name
     - *Returning users* will have their cart updated to what was stored in the database
 - Users can sign out of with Google Sign-out
     - user information will be removed from the app's current user profile information
     - Logging out will empty the shopping cart of all items
 - Cart persistance - *if user is logged in*, anytime an item is added to cart or when the quantity of an item changes(including clear cart), the new state of the cart will be stored in the database for that corresponding user
     - therefore refreshing or reloading the page will keep the existing cart items for logged-in users
 - Search bar will allow users to enter text that will search all products on the webpage by merchant or by product name
     - the page will then only show all products matching the search text
     - button is shown and used to switch between searching by product name or by merchant (by default it is set to search by product name)
 - Formatted display and styling to enhance user experience during usage on the app

![Bonsai-Fullstack-Test-login-page](/IMG/show-cart.png)

Main dependancies/libraries:
 - React for frontend development
 - Node for backend development
 - GraphQL with apollo-client/apollo-server setup for querying
 - MUI/MUI-icons for simple & quick styling of components
 - React-google-login for using Google authentication

Assumptions:
 - I can restructure some of the cloned project's code (ie. change class components to React functional components, write graphql queries/mutations using Apollo-client library instead of apollo-boost, etc)
 - I can overwrite/mutate the mock user database I created that is used to store user profiles as this is how my GraphQL mutations will create a new user or update a user's profile with new cart items
 - Users have a gmail account they can log into for Google authentication so that they can use the cart persistance feature
 - List of data in both the user database and the merchants database does not get extremely large where it will exceed maximum limit for uploading to GitHub or affect application performance (ie. 10's or 100's of thousands of users or products/merchants)
     - If data becomes large, switch from mock databases to actual SQL/noSQL databases (ie. mongoDB, Postgres, etc)
 - App will not be large enough or require handling of many asynchronous activies to require a state management library/system (such as the Redux ecosystem)
 - All users will allow their information stored in the database
 - No issues storing user's PI(personal information) in a private repo on GitHub (as opposed to using blockchain services)

How to get the project started:
## Run
1. Download or clone this repository
2. If you don't have yarn installed, install yarn by running `npm i --global yarn` in CLI
3. Run `yarn install` to install all project dependencies
4. Run `yarn dev` to run the project (both front/back end will start thanks to concurrently)
5. View portal on `http://localhost:8080/`
6. View GraphQL playground on `http://localhost:3000/graphql` (server is located on port 3000)
