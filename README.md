# Food Delivery App (React + Redux)

A simple food delivery web app that supports:

- Firebase Email/Password Login
- Google & Facebook Login via Firebase
- Category-wise food filtering
- Live search by food name, category 
- Add to cart functionality
- Cart stored in Session Storage and Redux


## Tech Stack

- Frontend: React
- State Management: Redux Toolkit
- Routing: React Router
- Storage: Session Storage
- Icons: Material UI
- Style: CSS and Material UI
- Build Tool: Webpack
- Server: Node.js
- Authentication: Firebase
- Deployment: Firebase
- DataBase: Dummy Food Data (can connect to API later)

---

## Features

### Search
- Search food by typing name in search input.
- Case-insensitive.
- Example: typing `chick` shows `Baked Chicken`, `Fried Chicken`.

### Category Filter
- Filter foods by category:
  - Breakfast
  - Lunch
  - Dinner
- Example: Click "Breakfast" to show only Breakfasts.

### Add to Cart
- Cart items stored in Redux.
- Also saved to sessionStorage.
- Persists even after refresh.

### 🔄 Authentication Flow

1. **Register**: User signs up with username, email, and password.
2. **Login**: User logs in with email and password.
3. **Google/Facebook Login**: User logs in with Google or Facebook account.
4. **Logout**: Clears user session and cart data.

- Login Form validation ensures:
  - **Username**: Required.
  - **Email**: Required, valid email format.
  - **Password**: Required, at least 6 characters, at least one uppercase, at least one digit.

###  Delivery Form

- Utilizes **React Hook Form** for delivery form handling 
- Validates user input with using **React Hook Form**

### States
##  Cart State Management

- Cart state managed with **Redux Toolkit**.
- Users can add, remove, and update item quantities in the cart.

###  Auth State Management
- Authentication state managed with **Redux Toolkit**.
- Redux stores auth state.
- Session Storage stores user data locally.
- Auth state persists even after page reloads.

##  Live Search State Management

- **Search**: Live search functionality managed with **Redux Toolkit**.

##  Delivery Form State Management

- **Search**:  Delivery Form informnation managed with **Redux Toolkit**.



