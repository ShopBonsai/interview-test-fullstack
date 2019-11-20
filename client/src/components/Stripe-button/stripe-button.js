import React from "react"
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"
//stripe sees data in cents not dollars
//submission getting handled by this compothe on success callback that triggers is when we submit
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100
  const publishableKey = "pk_test_5yJzgYq9PkMhTZPxEZhumV1100uXd2pBoi"

  const onToken = token => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token
      }
    }).then(response => {
      alert("Payment successful")
    }).catch(error => {
      console.log("Payment error: ", JSON.parse(error))
      alert(
        "There was an issue with your payment. Please make sure you use the provided credit card. "
      )
    })
  }

  return (
    <StripeCheckout
      label="Pay Now"
      name="ShopsBonsai"
      billingAddress={true}
      shippingAddress={true}
      description={`You total is ${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

//import this button into checkout component
export default StripeCheckoutButton
