# Shop API 🛍️

A REST API for an e-commerce boutique built with Node.js, Express, PostgreSQL, JWT Authentication and Stripe payments.

## Technologies 🛠️

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Bcrypt
- Stripe

## Architecture 🏗️

MVC (Model, View, Controller)

## Routes 🔗

### Auth
- `POST /auth/register` → Create an account
- `POST /auth/login` → Login and get a token 🔑

### Products
- `GET /products` → Get all products
- `GET /products/:id` → Get a product by id
- `POST /products` → Create a product (admin only) 🔒
- `PUT /products/:id` → Update a product (admin only) 🔒
- `DELETE /products/:id` → Delete a product (admin only) 🔒

### Orders
- `POST /orders` → Place an order 🛒
- `GET /orders` → Get all your orders
- `GET /orders/:id` → Get an order by id
- `POST /orders/:id/pay` → Pay with Stripe 💳

## Installation ⚙️

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with your credentials
4. Run `node server.js`

## Environment Variables 🔐

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=boutique
DB_PORT=5432
JWT_SECRET=yoursecret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLIENT_URL=http://localhost:3000
```
