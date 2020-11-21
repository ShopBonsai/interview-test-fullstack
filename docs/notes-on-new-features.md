# Tracking number of items in cart

The feature that I've implemented in a simple cart. By clicking the Buy button on the products listed below.

![Shop Page Default Look and browse](add-to-cart.gif)

This change assumed a logged in user and valid data being passed from React to the Apollo server. Additionally, the implementation is such that the database pulled from mockMerchantData but is then stored in memory before being requeried using `GET_CART_PRODUCTS`.

Whenever an item is added to the cart in this way, I use the `dataLayer` on Google Tag Manager to update the `itemsInCartCount` variable which can be used by the marketing team to some effect to target users who appear inclined to make a purchase.