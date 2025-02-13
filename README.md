React Pizza Project - README
Overview
This project is a React-based pizza ordering application. The app includes a home page, a menu page, an option to order pizzas, and a checkout page with payment functionality. The application uses React Redux for state management, allowing efficient handling of pizza menu, order details, and payment.

Features
Home Page: Displays an overview of the app and a brief introduction.
Menu Page: Users can browse available pizzas, select their desired pizzas, and add them to the cart.
Cart Page: Users can view their selected pizzas, edit quantities, and proceed to checkout.
Checkout Page: Includes a payment section and order summary.
State Management: Uses Redux to manage application state (cart, pizza items, order details, etc.).
Prerequisites
Before running the project, make sure you have:

Node.js installed on your system (version 14.x or higher)
npm (Node Package Manager) or yarn
Installation
Clone the repository:
**git clone https://github.com/yourusername/react-pizza.git
cd react-pizza
Install dependencies:
npm install
# or if you use yarn
yarn install

Redux Actions
addToCart: Adds a pizza to the cart.
removeFromCart: Removes a pizza from the cart.
increaseQuantity: Increases the quantity of a pizza in the cart.
decreaseQuantity: Decreases the quantity of a pizza in the cart.
setPaymentDetails: Sets the payment details during checkout.

Redux Reducers
cartReducer: Handles the cart state (pizzas, quantity, total cost).
paymentReducer: Manages the payment information and order status.

Future Enhancements
Implement user authentication and order tracking.
Add a variety of payment methods (PayPal, credit card, etc.).
Improve UI/UX for mobile responsiveness.
Integrate with a pizza API for real-time pizza menu updates.


