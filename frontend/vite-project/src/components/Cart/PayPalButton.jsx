import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

function PayPalButton({ amount, onSuccess, onError }) {
  const finalAmount = Number(amount).toFixed(2);

  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: finalAmount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={(err) => {
          console.log("PayPal Error =>", err);
          onError?.(err);
        }}
      />
    </PayPalScriptProvider>
  );
}

// function PayPalButton({ amount, onSuccess, onError }) {
//   return (
//     <PayPalScriptProvider
//       options={{
//         "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
//       }}
//     >
//       <PayPalButtons
//         style={{ layout: "vertical" }}
//         createOrder={(data, actions) => {
//           return actions.order.create({
//             purchase_units: [{ amount: { value: Number(amount).toFixed(2) } }],
//           });
//         }}
//         onApprove={(data, actions) => {
//           return actions.order.capture().then(onSuccess);
//         }}
//         onError={onError}
//       ></PayPalButtons>
//     </PayPalScriptProvider>
//   );
// }

export default PayPalButton;
