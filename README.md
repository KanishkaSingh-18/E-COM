# 🛒 E-COM — E-Commerce Product Explorer & Cart Management App

A modern, responsive **E-Commerce Frontend Application** built using **React + Vite + Tailwind CSS** that simulates a real-world online shopping experience.

---

## 🚀 PROJECT OVERVIEW

E-COM allows users to:

* Browse products across categories
* Search products dynamically
* Filter and sort listings
* View detailed product pages
* Add/remove items from cart
* Manage wishlist
* View checkout summary

This project demonstrates **scalable React architecture, state management, and UI design**.

---

## 🎯 FEATURES

### 🛍️ Product Listing

* Responsive product grid

  * 3 columns (desktop)
  * 2 columns (tablet)
  * 1 column (mobile)
* Each product card includes:

  * Image
  * Title
  * Price
  * Rating
  * Category
  * Add to Cart button

---

### 🔍 Product Search

* Real-time search by product name
* Debounced input for performance optimization
* Searches across:

  * title
  * category
  * description

---

### 🎛️ Filters & Sorting

* Category filters (Electronics, Clothing, Jewelry, etc.)
* Price range filters
* Sorting options:

  * Price: Low → High
  * Price: High → Low
  * Rating
  * Newest

---

### 📄 Product Details Page

* Image gallery
* Full description
* Price, category, rating
* Add to Cart
* Add to Wishlist

---

### ❤️ Wishlist

* Save products for later
* Dedicated wishlist page

---

### 🛒 Shopping Cart

* Add/remove items
* Update quantity
* Auto price calculation
* Persistent cart (localStorage)

---

### 💳 Checkout Summary

* Displays:

  * Cart items
  * Subtotal
  * Tax calculation
  * Total price

---

## 🧠 TECH STACK

* ⚛️ React (Vite)
* 🎨 Tailwind CSS
* 🎞️ Framer Motion
* 🔔 React Toastify
* 🔗 React Router DOM
* 🌐 Axios
* 🎯 React Icons
* 🧾 React Hook Form + Yup
* 🎠 Swiper
* 🆔 UUID

---

## 🧩 ARCHITECTURE

### 📁 Folder Structure

```
src/

components/
  ProductCard/
  ProductGrid/
  CartItem/
  Filters/
  SearchBar/

pages/
  Home/
  Products/
  ProductDetails/
  Cart/
  Wishlist/
  Checkout/

context/
  CartContext/

hooks/
  useProducts/
  useCart/
  useWishlist/
  useDebounce/

services/
  api.js

utils/
  helpers.js
```

---

## 🔄 STATE MANAGEMENT

### Context API

Global state handled via:

* CartContext
* Wishlist state

### Custom Hooks

* `useProducts()` → API data fetching
* `useCart()` → Cart logic
* `useWishlist()` → Wishlist management
* `useDebounce()` → Search optimization

---

## 🧭 ROUTING

```
/
/products
/products/:id
/wishlist
/cart
/checkout
```

---

## 🌐 API INTEGRATION

Using:

👉 https://fakestoreapi.com/products

---

## 📦 DATA MODELS

### 🧾 Product Object

| Field       | Type   | Description             |
| ----------- | ------ | ----------------------- |
| id          | number | Unique product ID       |
| title       | string | Product name            |
| price       | number | Product price           |
| description | string | Product description     |
| category    | string | Product category        |
| image       | string | Product image URL       |
| rating      | object | Contains rate and count |

---

### 🛒 Cart Item Object

| Field     | Type   | Description       |
| --------- | ------ | ----------------- |
| productId | number | ID of the product |
| quantity  | number | Quantity in cart  |
| price     | number | Price per unit    |

---

### ❤️ Wishlist Object

| Field     | Type   | Description      |
| --------- | ------ | ---------------- |
| productId | number | Saved product ID |


### Product

```
{
 id,
 title,
 price,
 description,
 category,
 image,
 rating
}
```

### Cart Item

```
{
 productId,
 quantity,
 price
}
```

### Wishlist

```
{
 productId
}
```

---

## 🎨 UI HIGHLIGHTS

* Minimal, modern UI (Apple/Amazon inspired)
* Dark & Light mode support
* Smooth animations (Framer Motion)
* Skeleton loaders for better UX
* Toast notifications
* Fully responsive design

---

## ⚙️GETTING STARTED

### 1. Install dependencies

```bash
npm install
```

---

### 2. Start development server

```bash
npm run dev
```

---

### 3. Build for production

```bash
npm run build
npm run preview
```

---

## 📱 NON-FUNCTIONAL FEATURES

* Mobile-first responsive design
* Loading states handling
* API error handling
* Smooth animations & transitions

---

## 💡 FUTURE IMPROVEMENTS

* Payment gateway integration (Stripe)
* User authentication
* Order history
* Admin dashboard

---

## 👨‍💻 AUTHOR

Built by **Kanishka Singh**

---