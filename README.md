# Shopping Cart Application

A responsive Shopping Cart web application built using React, TypeScript, Vite, Tailwind CSS, Zustand, TanStack Query, and Zod.

The application allows users to browse products, search and filter products, manage their shopping cart, calculate the order total, and complete a checkout process.

## 🚀 Live Demo

**Live Website:** [Shopping Cart Application] https://shopping-cart-gamma-woad.vercel.app

**GitHub Repository:** [View Source Code]https://github.com/raniya-2/Shopping-cart.git

## Features

### 1. Product Listing

* Fetches product data from the DummyJSON Products API.
* Displays product images, titles, categories, prices, and ratings.
* Provides loading, error, and empty states.

### 2. Search and Filtering

* Search products by title.
* Filter products by category.
* Filter products by price.
* Clear filters to display products without the selected filters.

### 3. Shopping Cart

* Add products to the cart.
* Increase or decrease product quantities.
* Remove individual products.
* Clear the entire cart.
* Limit product quantities to between 1 and 5.
* Save cart data in localStorage so it persists after refreshing the page.

### 4. Cart Summary

* Display individual product totals.
* Calculate the subtotal.
* Calculate 5% tax.
* Apply a 10% discount when the subtotal exceeds $100.
* Calculate the final order total.
* Require a minimum cart value of $10 for checkout.

### 5. Checkout

* Review cart items before placing an order.
* Enter shipping information.
* Validate shipping details using Zod.
* Display validation errors near the relevant fields.
* Display an order success message after placing an order.
* Clear the cart after a successful order.

### 6. Responsive Design

* Responsive layout for desktop, tablet, and mobile screens.
* User-friendly product cards and shopping cart interface.
* Clear feedback for loading, errors, empty results, and order completion.

## Technologies Used

* **React 19** – Build the user interface.
* **TypeScript** – Add static type checking.
* **Vite** – Development server and build tool.
* **Tailwind CSS** – Style the application.
* **Zustand** – Manage shopping cart state.
* **TanStack Query** – Manage API data fetching and caching.
* **Zod** – Validate API data and checkout form inputs.
* **localStorage** – Persist shopping cart data.
* **pnpm** – Package manager.

## API

The application fetches product information from:

https://dummyjson.com/products

The API provides product details used in the product listing.

## Getting Started

### Prerequisites

Install the following software:

* Node.js
* pnpm
* Git
* Visual Studio Code (recommended)

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Open the Project Folder

```bash
cd shopping-cart
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Start the Development Server

```bash
pnpm dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

### 5. Build the Application

```bash
pnpm build
```

### 6. Preview the Production Build

```bash
pnpm preview
```

## Project Structure

The project may contain the following files and folders, depending on the final implementation:

```text
shopping-cart/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── store/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
└── README.md
```

**Note:** The folder names above are illustrative. Keep the actual folder structure of your project if it differs.

## Business Rules

* Product quantities must remain between 1 and 5.
* The tax rate is 5%.
* A 10% discount applies when the subtotal is greater than $100.
* Checkout requires a minimum cart value of $10.
* The cart is cleared after successful order placement.

## Known Limitations

* Product information depends on the availability of the DummyJSON API.
* The checkout process demonstrates order placement; it does not process real payments unless a payment gateway is separately integrated.
* Cart persistence uses the browser's localStorage.

## Future Improvements

* Product sorting by price or rating.
* Product details pages.
* Skeleton loading animations.
* Dark mode.
* Automated unit and component tests.
* Integration with a real payment gateway.

## Deployment

The application can be deployed using a static hosting platform such as Vercel, Netlify, or Cloudflare Pages.

Build command:

```bash
pnpm build
```

Output directory:

```text
dist
```

## Author

Developed as an internship assignment project.
