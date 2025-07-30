# Restaurant E-Commerce Hub - Comprehensive API Documentation

## 1. Introduction

Welcome to the Restaurant E-Commerce Hub API. This document provides a comprehensive guide for frontend developers to integrate with the backend services. Our API is built on REST principles and uses JSON for all data interchange.

### 1.1. Base URL

All API endpoints are prefixed with the following base URL:

- **Development**: `http://localhost:3001/api`
- **Production**: `https://restauranthub.azurewebsites.net/api`

### 1.2. General Concepts

- **Request/Response Format**: All requests and responses use `application/json`.
- **Authentication**: Most endpoints are protected and require a JSON Web Token (JWT) for access.
- **HTTPS**: All production traffic is served over HTTPS.

## 2. Authentication

The API uses JWT for authenticating requests. After a user successfully logs in, a token is provided, which must be included in the `Authorization` header for all subsequent protected requests.

**Header Format:**

```
Authorization: Bearer <YOUR_JWT_TOKEN>
```

### 2.1. User Roles

The system has a role-based access control (RBAC) mechanism. User roles determine access permissions for different endpoints.

- `CUSTOMER`: Standard user who can place orders.
- `RESTAURANT_OWNER`: Manages a specific restaurant, its menu, and orders.
- `RESTAURANT_STAFF`: Staff member of a restaurant with limited permissions.
- `DRIVER`: Handles order deliveries.
- `ADMIN`: Manages system-wide settings and multiple restaurants.
- `SUPER_ADMIN`: Has unrestricted access to all system functionalities.

## 3. Common Responses

### 3.1. Success Response

Successful requests will typically return a `200 OK`, `201 Created`, or `204 No Content` status code. The body will contain the requested data.

### 3.2. Error Response

Failed requests will return an appropriate `4xx` or `5xx` status code with a JSON body describing the error.

**Standard Error Format:**

```json
{
  "status": "error",
  "message": "A human-readable error message.",
  "details": {
    "errors": [
      {
        "path": "fieldName",
        "message": "Specific validation error message."
      }
    ]
  },
  "requestId": "a-unique-request-id"
}
```

- `400 Bad Request`: The request was malformed (e.g., invalid JSON, validation error).
- `401 Unauthorized`: Authentication failed (e.g., missing or invalid token).
- `403 Forbidden`: The authenticated user does not have permission to access the resource.
- `404 Not Found`: The requested resource does not exist.
- `500 Internal Server Error`: An unexpected error occurred on the server.

### 3.3. Pagination

Endpoints that return a list of items (e.g., `GET /restaurants`) support pagination via query parameters.

- `page` (number, default: `1`): The page number to retrieve.
- `limit` (number, default: `10`): The number of items per page.

**Paginated Response Format:**

```json
{
  "data": [
    // ... array of items
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

## 4. API Endpoints

---

### 4.1. Authentication (`/auth`)

#### **POST** `/auth/login`

- **Description**: Authenticates a user and returns a JWT.
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "token": "your.jwt.token",
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "role": "CUSTOMER",
      "firstName": "John"
    }
  }
  ```

#### **POST** `/auth/refresh`

- **Description**: Refreshes the JWT access token using a refresh token.
- **Access**: Public (requires valid refresh token)
- **Request Body**:
  ```json
  {
    "refreshToken": "your.refresh.token"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "token": "your.new.jwt.access.token"
  }
  ```

#### **POST** `/auth/logout`

- **Description**: Logs the user out by clearing the session cookie.
- **Access**: Authenticated
- **Success Response (`200 OK`)**:
  ```json
  { "message": "Logged out successfully" }
  ```

#### **GET** `/auth/me`

- **Description**: Retrieves the profile of the currently authenticated user.
- **Access**: Authenticated
- **Success Response (`200 OK`)**: Returns the user object.

#### **POST** `/auth/password/reset-request`

- **Description**: Initiates a password reset process by sending an email to the user.
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "message": "Password reset email sent successfully."
  }
  ```

#### **POST** `/auth/password/reset-confirm`

- **Description**: Resets the user's password using a token from email.
- **Access**: Public (requires valid token)
- **Request Body**:
  ```json
  {
    "token": "reset-token-from-email",
    "newPassword": "NewStrongPassword123!"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  { "message": "Password has been reset successfully." }
  ```

#### **PUT** `/auth/password/change`

- **Description**: Allows an authenticated user to change their password.
- **Access**: Authenticated
- **Request Body**:
  ```json
  {
    "currentPassword": "OldPassword123!",
    "newPassword": "NewStrongPassword123!"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  { "message": "Password changed successfully." }
  ```

---

### 4.2. User Management (`/users`)

#### **POST** `/users/register`

- **Description**: Registers a new user (legacy endpoint).
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "new.user@example.com",
    "password": "A_Strong_Password123!",
    "firstName": "Jane",
    "lastName": "Doe",
    "privacyConsent": true,
    "phoneNumber": "1234567890"
  }
  ```
- **Success Response (`201 Created`)**:
  ```json
  {
    "user": {
      "id": "user-uuid",
      "email": "new.user@example.com",
      "role": "CUSTOMER"
    },
    "token": "your.jwt.token"
  }
  ```

#### **POST** `/users/register/customer`

- **Description**: Registers a new customer.
- **Access**: Public
- **Request Body**: Same as legacy register endpoint.
- **Success Response (`201 Created`)**: Same as legacy register endpoint.

#### **POST** `/users/register/restaurant-owner`

- **Description**: Registers a new restaurant owner.
- **Access**: Public
- **Request Body**: Same as legacy register endpoint.
- **Success Response (`201 Created`)**: Returns user with `RESTAURANT_OWNER` role.

#### **POST** `/users/register/restaurant-staff`

- **Description**: Registers a new restaurant staff member.
- **Access**: Public
- **Request Body**: Same as legacy register endpoint.
- **Success Response (`201 Created`)**: Returns user with `RESTAURANT_STAFF` role.

#### **POST** `/users/register/admin`

- **Description**: Registers a new admin (SUPER_ADMIN only).
- **Access**: `SUPER_ADMIN`
- **Request Body**: Same as legacy register endpoint.
- **Success Response (`201 Created`)**: Returns user with `ADMIN` role.

#### **POST** `/users/setup/super-admin`

- **Description**: Creates the first SUPER_ADMIN (only when no SUPER_ADMIN exists).
- **Access**: Public (restricted to first-time setup)
- **Request Body**: Same as legacy register endpoint.
- **Success Response (`201 Created`)**: Returns user with `SUPER_ADMIN` role.

#### **GET** `/users/verify-email/:token`

- **Description**: Verifies user email with token.
- **Access**: Public
- **Success Response (`200 OK`)**:
  ```json
  { "message": "Email verified successfully." }
  ```

#### **POST** `/users/resend-verification`

- **Description**: Resends verification email.
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  { "message": "Verification email sent successfully." }
  ```

#### **PATCH** `/users/me`

- **Description**: Updates the profile of the currently authenticated user.
- **Access**: Authenticated
- **Request Body**:
  ```json
  {
    "firstName": "Jane",
    "lastName": "Smith"
  }
  ```
- **Success Response (`200 OK`)**: Returns the updated user object.

---

### 4.3. Restaurant Management (`/restaurants`)

This domain covers all resources related to restaurants, including menus, categories, and menu items.

#### Restaurant Core

#### **GET** `/restaurants`

- **Description**: Retrieves a paginated list of active restaurants.
- **Access**: Public
- **Query Parameters**:
  - `page` (number): Page number.
  - `limit` (number): Items per page.
  - `search` (string): Search term to filter by name, description, or address.
  - `isActive` (boolean): Filter by active status (Admin only).
- **Success Response (`200 OK`)**: See [Pagination](#33-pagination) section for format.

#### **POST** `/restaurants`

- **Description**: Creates a new restaurant.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "name": "The Gourmet Place",
    "description": "Fine dining experience.",
    "phone": "9876543210",
    "email": "contact@gourmetplace.com",
    "address": "123 Foodie Lane, Flavor Town",
    "imageUrl": "http://example.com/image.png",
    "timezone": "UTC",
    "currency": "USD",
    "location": {
      "latitude": 40.7128,
      "longitude": -74.006
    },
    "businessHours": {
      "monday": { "isOpen": true, "openTime": "10:00", "closeTime": "22:00" },
      "tuesday": { "isOpen": true, "openTime": "10:00", "closeTime": "22:00" }
      // ... other days
    }
  }
  ```
- **Success Response (`201 Created`)**: Returns the newly created restaurant object.

#### **GET** `/restaurants/:id`

- **Description**: Retrieves a single restaurant by its ID.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns the full restaurant object.

#### **PUT** `/restaurants/:id`

- **Description**: Updates an existing restaurant.
- **Access**: `RESTAURANT_OWNER` (of the restaurant), `ADMIN`, `SUPER_ADMIN`
- **Request Body**: A partial restaurant object with fields to update.
- **Success Response (`200 OK`)**: Returns the updated restaurant object.

#### **DELETE** `/restaurants/:id`

- **Description**: Deletes a restaurant.
- **Access**: `RESTAURANT_OWNER` (of the restaurant), `ADMIN`, `SUPER_ADMIN`
- **Success Response (`204 No Content`)**.

#### Categories

#### **GET** `/restaurants/categories`

- **Description**: Get all categories.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns an array of category objects.

#### **POST** `/restaurants/categories`

- **Description**: Create a new category.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "name": "Appetizers",
    "description": "Starters to whet your appetite."
  }
  ```
- **Success Response (`201 Created`)**: Returns the new category object.

#### **GET** `/restaurants/categories/slug/:slug`

- **Description**: Get a category by its unique slug.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns the category object.

#### **GET** `/restaurants/categories/:id`

- **Description**: Get a category by its ID.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns the category object.

#### **PUT** `/restaurants/categories/:id`

- **Description**: Update a category by its ID.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**: Partial category object.
- **Success Response (`200 OK`)**: Returns the updated category object.

#### **DELETE** `/restaurants/categories/:id`

- **Description**: Delete a category by its ID.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`204 No Content`)**.

#### Menu Items

#### **GET** `/restaurants/menu-items`

- **Description**: Get all menu items across all restaurants (paginated).
- **Access**: Public
- **Query Parameters**: `page`, `limit`, `category`, `search`, `isActive`.
- **Success Response (`200 OK`)**: A paginated list of menu items.

#### **POST** `/restaurants/:restaurantId/menu-items`

- **Description**: Creates a new menu item for a specific restaurant.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "title": "Classic Burger",
    "description": "A juicy beef patty with fresh vegetables.",
    "finalPrice": 12.5,
    "mrp": 12.5,
    "categoryId": "category-uuid",
    "currency": "USD"
    // ... other fields
  }
  ```
- **Success Response (`201 Created`)**: Returns the new menu item object.

#### **GET** `/restaurants/menu-items/:id`

- **Description**: Get a single menu item by its ID.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns the menu item object.

#### **PUT** `/restaurants/menu-items/:id`

- **Description**: Updates a menu item.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**: Partial menu item object.
- **Success Response (`200 OK`)**: Returns the updated menu item object.

#### **DELETE** `/restaurants/menu-items/:id`

- **Description**: Deletes a menu item.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`204 No Content`)**.

#### Menus

#### **GET** `/restaurants/:restaurantId/menus`

- **Description**: Get all menus for a restaurant.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns an array of menu objects.

#### **POST** `/restaurants/:restaurantId/menus`

- **Description**: Create a new menu for a restaurant.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "name": "Dinner Menu",
    "description": "Our evening dining options."
  }
  ```
- **Success Response (`201 Created`)**: Returns the new menu object.

#### **GET** `/restaurants/:restaurantId/menus/:menuId`

- **Description**: Get menu by ID for a restaurant.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns the menu object.

#### **PUT** `/restaurants/:restaurantId/menus/:menuId`

- **Description**: Update menu by ID for a restaurant.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**: Partial menu object.
- **Success Response (`200 OK`)**: Returns the updated menu object.

#### **DELETE** `/restaurants/:restaurantId/menus/:menuId`

- **Description**: Delete menu by ID for a restaurant.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`204 No Content`)**.

#### Additional Restaurant Resources

#### **GET** `/restaurants/brands`

- **Description**: Get all brands.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns an array of brand objects.

#### **GET** `/restaurants/tax-rates`

- **Description**: Get all tax rates.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns an array of tax rate objects.

#### **GET** `/restaurants/allergens`

- **Description**: Get all allergens.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns an array of allergen objects.

---

### 4.4. Media Management (`/media`)

#### **POST** `/media/upload`

- **Description**: Uploads a media file (image, video). Use `multipart/form-data`.
- **Access**: Authenticated
- **Request Body**: `multipart/form-data` with a `file` field.
- **Success Response (`201 Created`)**:
  ```json
  {
    "message": "File uploaded successfully",
    "data": {
      "public_id": "cloudinary_public_id",
      "url": "http://res.cloudinary.com/.../image.jpg",
      "secure_url": "https://res.cloudinary.com/.../image.jpg",
      "format": "jpg",
      "resource_type": "image"
    }
  }
  ```
- **Usage**: Upload a file here first, then use the returned `secure_url` in other API calls (e.g., creating/updating a restaurant).

#### **DELETE** `/media/{publicId}`

- **Description**: Deletes a media file from cloud storage. The `{publicId}` can contain slashes if the file is in a folder (e.g., `folder/image_id`). The `*` in the route definition (`:publicId(*)`) allows the parameter to capture nested paths.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **URL Parameters**:
  - `publicId` (string, required): The public ID of the file to delete.
- **Success Response (`200 OK`)**:
  ```json
  {
    "message": "File deleted successfully"
  }
  ```

#### **GET** `/media/metadata/{publicId}`

- **Description**: Retrieves metadata for a specific media file. The `{publicId}` can contain slashes, which are captured by the `*` in the route definition (`:publicId(*)`).
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **URL Parameters**:
  - `publicId` (string, required): The public ID of the file.
- **Success Response (`200 OK`)**:
  ```json
  {
    "public_id": "folder/image_id",
    "format": "jpg",
    "width": 800,
    "height": 600,
    "bytes": 123456,
    "resource_type": "image",
    "created_at": "2023-10-27T10:00:00Z",
    "url": "http://res.cloudinary.com/.../image.jpg",
    "secure_url": "https://res.cloudinary.com/.../image.jpg"
  }
  ```

---

### 4.5. Order Management (`/orders`)

#### **POST** `/orders`

- **Description**: Creates a new order from the user's cart.
- **Access**: Authenticated
- **Request Body**:
  ```json
  {
    "restaurantId": "restaurant-uuid",
    "items": [
      {
        "menuItemId": "menu-item-uuid",
        "quantity": 2,
        "unitPrice": 15.99
      }
    ],
    "deliveryAddress": { "street": "123 Main St", "city": "Anytown" },
    "notes": "Extra spicy, please."
  }
  ```
- **Success Response (`201 Created`)**: Returns the newly created order object.

#### **GET** `/orders`

- **Description**: Retrieves orders for the logged-in user. Admins can see more.
- **Access**: Authenticated
- **Query Parameters**: Pagination and filtering options available (e.g., `status`).
- **Success Response (`200 OK`)**: A paginated list of orders.

#### **GET** `/orders/:id`

- **Description**: Retrieves a single order by ID.
- **Access**: Authenticated (user must own the order or be an admin).
- **Success Response (`200 OK`)**: Returns the order object.

#### **PUT** `/orders/:id`

- **Description**: Updates an order.
- **Access**: Order owner, `RESTAURANT_STAFF`, `ADMIN`
- **Request Body**: Partial order object.
- **Success Response (`200 OK`)**: Returns the updated order object.

#### Payment Management

#### **GET** `/orders/:orderId/payments`

- **Description**: Get all payments for an order.
- **Access**: Order owner, `RESTAURANT_STAFF`, `ADMIN`
- **Success Response (`200 OK`)**: Returns an array of payment objects.

#### **POST** `/orders/payments`

- **Description**: Create a new payment.
- **Access**: Authenticated
- **Request Body**:
  ```json
  {
    "orderId": "order-uuid",
    "amount": 25.99,
    "method": "CREDIT_CARD"
  }
  ```
- **Success Response (`201 Created`)**: Returns the new payment object.

#### **GET** `/orders/payments/:id`

- **Description**: Get payment by ID.
- **Access**: Payment owner, `RESTAURANT_STAFF`, `ADMIN`
- **Success Response (`200 OK`)**: Returns the payment object.

#### **PUT** `/orders/payments/:id`

- **Description**: Update payment status.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "status": "COMPLETED"
  }
  ```
- **Success Response (`200 OK`)**: Returns the updated payment object.

#### Delivery Management

#### **GET** `/orders/deliveries`

- **Description**: Get all deliveries with filtering.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`, `DRIVER`
- **Query Parameters**: Pagination and filtering options.
- **Success Response (`200 OK`)**: A paginated list of deliveries.

#### **POST** `/orders/deliveries`

- **Description**: Create a new delivery.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "orderId": "order-uuid",
    "driverId": "driver-uuid",
    "estimatedDeliveryTime": "2023-10-27T14:30:00Z"
  }
  ```
- **Success Response (`201 Created`)**: Returns the new delivery object.

#### **GET** `/orders/deliveries/:id`

- **Description**: Get delivery by ID.
- **Access**: `RESTAURANT_STAFF`, `DRIVER`, `ADMIN`
- **Success Response (`200 OK`)**: Returns the delivery object.

#### **PUT** `/orders/deliveries/:id`

- **Description**: Update delivery status.
- **Access**: `RESTAURANT_STAFF`, `DRIVER`, `ADMIN`
- **Request Body**:
  ```json
  {
    "status": "IN_TRANSIT"
  }
  ```
- **Success Response (`200 OK`)**: Returns the updated delivery object.

#### Driver Management

#### **GET** `/orders/drivers`

- **Description**: Get all drivers.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`200 OK`)**: Returns an array of driver objects.

#### **POST** `/orders/drivers`

- **Description**: Create a new driver.
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Driver",
    "email": "john.driver@example.com",
    "phone": "1234567890"
  }
  ```
- **Success Response (`201 Created`)**: Returns the new driver object.

#### **GET** `/orders/drivers/:id`

- **Description**: Get driver by ID.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`200 OK`)**: Returns the driver object.

#### **PUT** `/orders/drivers/:id`

- **Description**: Update driver.
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Request Body**: Partial driver object.
- **Success Response (`200 OK`)**: Returns the updated driver object.

#### Order Cancellation

#### **POST** `/orders/cancellations`

- **Description**: Create an order cancellation request.
- **Access**: Order owner, `RESTAURANT_STAFF`, `ADMIN`
- **Request Body**:
  ```json
  {
    "orderId": "order-uuid",
    "reason": "Customer request"
  }
  ```
- **Success Response (`201 Created`)**: Returns the new cancellation object.

#### **GET** `/orders/cancellations/:id`

- **Description**: Get order cancellation by ID.
- **Access**: Requester, `RESTAURANT_STAFF`, `ADMIN`
- **Success Response (`200 OK`)**: Returns the cancellation object.

#### **PUT** `/orders/cancellations/:id`

- **Description**: Update order cancellation status (approve/reject).
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "status": "APPROVED"
  }
  ```
- **Success Response (`200 OK`)**: Returns the updated cancellation object.

#### **GET** `/orders/cancellations/all`

- **Description**: Get all order cancellations with filtering.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`200 OK`)**: A paginated list of cancellations.

---

### 4.6. Cart Management (`/cart`)

#### **GET** `/cart`

- **Description**: Retrieves the current user's shopping cart.
- **Access**: Authenticated
- **Success Response (`200 OK`)**: Returns the cart object with its items.

#### **POST** `/cart/items`

- **Description**: Adds an item to the cart. If the item already exists, its quantity is updated.
- **Access**: Authenticated
- **Request Body**:
  ```json
  {
    "menuItemId": "menu-item-uuid",
    "quantity": 1
  }
  ```
- **Success Response (`200 OK`)**: Returns the updated cart.

#### **PUT** `/cart/items/:itemId`

- **Description**: Updates the quantity of a specific item in the cart.
- **Access**: Authenticated
- **Request Body**:
  ```json
  { "quantity": 3 }
  ```
- **Success Response (`200 OK`)**: Returns the updated cart.

#### **DELETE** `/cart/items/:itemId`

- **Description**: Removes an item from the cart.
- **Access**: Authenticated
- **Success Response (`200 OK`)**: Returns the updated cart.

#### **DELETE** `/cart`

- **Description**: Clears all items from the user's cart.
- **Access**: Authenticated
- **Success Response (`204 No Content`)**.

---

### 4.7. Content Management (`/content`)

This domain handles CMS-related data like hero sliders, banners, and blog posts.

#### Hero Sliders

#### **GET** `/content/hero-sliders`

- **Description**: Retrieves all active hero slider items.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns an array of slider objects.

#### **POST** `/content/hero-sliders`

- **Description**: Create a new hero slider.
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "title": "Welcome to Our Restaurant",
    "subtitle": "Delicious food awaits you",
    "imageUrl": "https://example.com/hero-image.jpg",
    "ctaText": "Order Now",
    "ctaLink": "/menu"
  }
  ```
- **Success Response (`201 Created`)**: Returns the new hero slider object.

#### **GET** `/content/hero-sliders/:id`

- **Description**: Get hero slider by ID.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns the hero slider object.

#### **PUT** `/content/hero-sliders/:id`

- **Description**: Update hero slider by ID.
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Request Body**: Partial hero slider object.
- **Success Response (`200 OK`)**: Returns the updated hero slider object.

#### **DELETE** `/content/hero-sliders/:id`

- **Description**: Delete hero slider by ID.
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Success Response (`204 No Content`)**.

#### Deal Sections

#### **GET** `/content/deal-sections`

- **Description**: Get all deal sections.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns an array of deal section objects.

#### **POST** `/content/deal-sections`

- **Description**: Create a new deal section.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "title": "Special Deals",
    "description": "Limited time offers",
    "isActive": true
  }
  ```
- **Success Response (`201 Created`)**: Returns the new deal section object.

#### **GET** `/content/deal-sections/:id`

- **Description**: Get deal section by ID.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns the deal section object.

#### **PUT** `/content/deal-sections/:id`

- **Description**: Update deal section by ID.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**: Partial deal section object.
- **Success Response (`200 OK`)**: Returns the updated deal section object.

#### **DELETE** `/content/deal-sections/:id`

- **Description**: Delete deal section by ID.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`204 No Content`)**.

#### Banners

#### **GET** `/content/banners`

- **Description**: Retrieves all active promotional banners.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns an array of banner objects.

#### **POST** `/content/banners`

- **Description**: Create a new banner.
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "title": "Promotional Banner",
    "imageUrl": "https://example.com/banner.jpg",
    "link": "/special-offers"
  }
  ```
- **Success Response (`201 Created`)**: Returns the new banner object.

#### **GET** `/content/banners/:id`

- **Description**: Get banner by ID.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns the banner object.

#### **PUT** `/content/banners/:id`

- **Description**: Update banner by ID.
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Request Body**: Partial banner object.
- **Success Response (`200 OK`)**: Returns the updated banner object.

#### **DELETE** `/content/banners/:id`

- **Description**: Delete banner by ID.
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Success Response (`204 No Content`)**.

#### Offer Banners

#### **GET** `/content/offer-banners`

- **Description**: Get all offer banners.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns an array of offer banner objects.

#### **POST** `/content/offer-banners`

- **Description**: Create a new offer banner.
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "title": "Special Offer",
    "imageUrl": "https://example.com/offer.jpg",
    "discountPercentage": 20
  }
  ```
- **Success Response (`201 Created`)**: Returns the new offer banner object.

#### **GET** `/content/offer-banners/:id`

- **Description**: Get offer banner by ID.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns the offer banner object.

#### **PUT** `/content/offer-banners/:id`

- **Description**: Update offer banner by ID.
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Request Body**: Partial offer banner object.
- **Success Response (`200 OK`)**: Returns the updated offer banner object.

#### **DELETE** `/content/offer-banners/:id`

- **Description**: Delete offer banner by ID.
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Success Response (`204 No Content`)**.

#### New Arrivals Sections

#### **GET** `/content/new-arrivals-sections`

- **Description**: Get all new arrivals sections.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns an array of new arrivals section objects.

#### **POST** `/content/new-arrivals-sections`

- **Description**: Create a new arrivals section.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "title": "New Menu Items",
    "description": "Check out our latest additions"
  }
  ```
- **Success Response (`201 Created`)**: Returns the new arrivals section object.

#### **GET** `/content/new-arrivals-sections/:id`

- **Description**: Get new arrivals section by ID.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns the new arrivals section object.

#### **PUT** `/content/new-arrivals-sections/:id`

- **Description**: Update new arrivals section by ID.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**: Partial new arrivals section object.
- **Success Response (`200 OK`)**: Returns the updated new arrivals section object.

#### **DELETE** `/content/new-arrivals-sections/:id`

- **Description**: Delete new arrivals section by ID.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`204 No Content`)**.

#### Tabs

#### **GET** `/content/new-arrivals-sections/:sectionId/tabs`

- **Description**: Get tabs by section ID.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns an array of tab objects.

#### **POST** `/content/tabs`

- **Description**: Create a new tab.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "title": "Appetizers",
    "sectionId": "section-uuid"
  }
  ```
- **Success Response (`201 Created`)**: Returns the new tab object.

#### **GET** `/content/tabs/:id`

- **Description**: Get tab by ID.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns the tab object.

#### **PUT** `/content/tabs/:id`

- **Description**: Update tab by ID.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**: Partial tab object.
- **Success Response (`200 OK`)**: Returns the updated tab object.

#### **DELETE** `/content/tabs/:id`

- **Description**: Delete tab by ID.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`204 No Content`)**.

#### Offer Sections

#### **GET** `/content/offer-sections`

- **Description**: Get all offer sections.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns an array of offer section objects.

#### **POST** `/content/offer-sections`

- **Description**: Create a new offer section.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "title": "Special Offers",
    "description": "Limited time deals"
  }
  ```
- **Success Response (`201 Created`)**: Returns the new offer section object.

#### **GET** `/content/offer-sections/:id`

- **Description**: Get offer section by ID.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns the offer section object.

#### **PUT** `/content/offer-sections/:id`

- **Description**: Update offer section by ID.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**: Partial offer section object.
- **Success Response (`200 OK`)**: Returns the updated offer section object.

#### **DELETE** `/content/offer-sections/:id`

- **Description**: Delete offer section by ID.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`204 No Content`)**.

#### Offer Section Banners

#### **GET** `/content/offer-sections/:offerSectionId/banner`

- **Description**: Get offer section banner by offer section ID.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns the offer section banner object.

#### **POST** `/content/offer-section-banners`

- **Description**: Create a new offer section banner.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "offerSectionId": "offer-section-uuid",
    "imageUrl": "https://example.com/banner.jpg"
  }
  ```
- **Success Response (`201 Created`)**: Returns the new offer section banner object.

#### **PUT** `/content/offer-section-banners/:id`

- **Description**: Update offer section banner by ID.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**: Partial offer section banner object.
- **Success Response (`200 OK`)**: Returns the updated offer section banner object.

#### **DELETE** `/content/offer-section-banners/:id`

- **Description**: Delete offer section banner by ID.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`204 No Content`)**.

#### Sliders

#### **GET** `/content/offer-sections/:offerSectionId/sliders`

- **Description**: Get sliders by offer section ID.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns an array of slider objects.

#### **POST** `/content/sliders`

- **Description**: Create a new slider.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "title": "Featured Items",
    "offerSectionId": "offer-section-uuid"
  }
  ```
- **Success Response (`201 Created`)**: Returns the new slider object.

#### **GET** `/content/sliders/:id`

- **Description**: Get slider by ID.
- **Access**: Public
- **Success Response (`200 OK`)**: Returns the slider object.

#### **PUT** `/content/sliders/:id`

- **Description**: Update slider by ID.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**: Partial slider object.
- **Success Response (`200 OK`)**: Returns the updated slider object.

#### **DELETE** `/content/sliders/:id`

- **Description**: Delete slider by ID.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`204 No Content`)**.

#### Menu Items on Sliders

#### **POST** `/content/sliders/:sliderId/menu-items`

- **Description**: Assign menu item to slider.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "menuItemId": "menu-item-uuid",
    "order": 1
  }
  ```
- **Success Response (`201 Created`)**: Returns the menu item assignment object.

#### **PUT** `/content/sliders/:sliderId/menu-items/:menuItemId`

- **Description**: Update menu item assignment on slider.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "order": 2
  }
  ```
- **Success Response (`200 OK`)**: Returns the updated assignment object.

#### **DELETE** `/content/sliders/:sliderId/menu-items/:menuItemId`

- **Description**: Remove menu item from slider.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`204 No Content`)**.

---

### 4.8. Notifications (`/notifications`)

#### **GET** `/notifications/notifications`

- **Description**: Retrieves notifications for the authenticated user.
- **Access**: Authenticated
- **Query Parameters**: Filtering and pagination options.
- **Success Response (`200 OK`)**: Returns a list of notification objects.

#### **GET** `/notifications/notifications/unread-count`

- **Description**: Get count of unread notifications for the user.
- **Access**: Authenticated
- **Success Response (`200 OK`)**:
  ```json
  {
    "count": 5
  }
  ```

#### **GET** `/notifications/notifications/stats`

- **Description**: Get notification statistics.
- **Access**: Authenticated (Admin or User for their own stats)
- **Success Response (`200 OK`)**: Returns notification statistics.

#### **POST** `/notifications/notifications`

- **Description**: Create a new notification.
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "userId": "user-uuid",
    "title": "New Order",
    "message": "You have a new order #12345",
    "type": "ORDER"
  }
  ```
- **Success Response (`201 Created`)**: Returns the new notification object.

#### **POST** `/notifications/notifications/bulk`

- **Description**: Create bulk notifications.
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "userIds": ["user1-uuid", "user2-uuid"],
    "title": "System Maintenance",
    "message": "Scheduled maintenance tonight",
    "type": "SYSTEM"
  }
  ```
- **Success Response (`201 Created`)**: Returns an array of created notifications.

#### **PUT** `/notifications/notifications/mark-all-read`

- **Description**: Mark all notifications as read for the authenticated user.
- **Access**: Authenticated
- **Success Response (`200 OK`)**:
  ```json
  { "message": "All notifications marked as read" }
  ```

#### **GET** `/notifications/notifications/:id`

- **Description**: Get notification by ID.
- **Access**: Owner or Admin
- **Success Response (`200 OK`)**: Returns the notification object.

#### **PUT** `/notifications/notifications/:id/read`

- **Description**: Mark notification as read.
- **Access**: Owner
- **Success Response (`200 OK`)**: Returns the updated notification object.

#### **DELETE** `/notifications/notifications/:id`

- **Description**: Delete notification.
- **Access**: Owner or Admin
- **Success Response (`204 No Content`)**.

#### Feedback

#### **GET** `/notifications/feedback`

- **Description**: Get all feedback (Admin only).
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Query Parameters**: Filtering and pagination options.
- **Success Response (`200 OK`)**: Returns a paginated list of feedback objects.

#### **GET** `/notifications/feedback/user`

- **Description**: Get current user's feedback.
- **Access**: Authenticated
- **Query Parameters**: Pagination options.
- **Success Response (`200 OK`)**: Returns a paginated list of user's feedback.

#### **GET** `/notifications/feedback/stats`

- **Description**: Get feedback statistics.
- **Access**: `ADMIN`, `SUPER_ADMIN`, `RESTAURANT_OWNER`
- **Query Parameters**: Filtering options.
- **Success Response (`200 OK`)**: Returns feedback statistics.

#### **GET** `/notifications/feedback/recent`

- **Description**: Get recent feedback for dashboard.
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Query Parameters**: Pagination options.
- **Success Response (`200 OK`)**: Returns recent feedback objects.

#### **POST** `/notifications/feedback`

- **Description**: Create new feedback.
- **Access**: Authenticated
- **Request Body**:
  ```json
  {
    "orderId": "order-uuid",
    "rating": 5,
    "comment": "Excellent food and service!"
  }
  ```
- **Success Response (`201 Created`)**: Returns the new feedback object.

#### **GET** `/notifications/feedback/orders/:orderId`

- **Description**: Get feedback for specific order.
- **Access**: Owner or Admin
- **Success Response (`200 OK`)**: Returns the feedback object.

#### **GET** `/notifications/feedback/:id`

- **Description**: Get feedback by ID.
- **Access**: Owner or Admin
- **Success Response (`200 OK`)**: Returns the feedback object.

#### **DELETE** `/notifications/feedback/:id`

- **Description**: Delete feedback.
- **Access**: Owner or Admin
- **Success Response (`204 No Content`)**.

#### **GET** `/notifications/feedback/restaurants/:restaurantId/rating`

- **Description**: Get average rating for a restaurant.
- **Access**: Public
- **Success Response (`200 OK`)**:
  ```json
  {
    "averageRating": 4.5,
    "totalReviews": 150
  }
  ```

---

### 4.9. Inventory Management (`/inventory`)

This domain covers inventory items and their suppliers.

#### Inventory Items

#### **GET** `/inventory/get-all`

- **Description**: Retrieves a paginated list of inventory items, with filtering options.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Query Parameters**:
  - `restaurantId` (string): Filter by restaurant.
  - `search` (string): Search by item name.
  - `page` (number): Page number for pagination.
  - `limit` (number): Items per page.
- **Success Response (`200 OK`)**: A paginated list of inventory items.

#### **POST** `/inventory/create`

- **Description**: Creates a new inventory item.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "itemName": "Beef Patties",
    "restaurantId": "restaurant-uuid",
    "menuItemId": "menu-item-uuid",
    "quantity": 100,
    "unit": "pieces",
    "costPerUnit": 1.50,
    "supplierId": "supplier-uuid"
  }
  ```
- **Success Response (`201 Created`)**: Returns the newly created inventory item.

#### **GET** `/inventory/single/:id`

- **Description**: Retrieves a single inventory item by its ID.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`200 OK`)**: Returns the inventory item object.

#### **PUT** `/inventory/update/:id`

- **Description**: Updates an inventory item's details.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**: Partial inventory item object.
- **Success Response (`200 OK`)**: Returns the updated inventory item.

#### **DELETE** `/inventory/delete/:id`

- **Description**: Deletes an inventory item.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`204 No Content`)**.

#### **POST** `/inventory/adjust`

- **Description**: Adjusts the quantity of an inventory item.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "inventoryId": "inventory-item-uuid",
    "adjustment": -10,
    "reason": "Wastage"
  }
  ```
- **Success Response (`200 OK`)**: Returns the updated inventory item.

#### **GET** `/inventory/analytics`

- **Description**: Retrieves inventory analytics, such as total value and item counts.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`200 OK`)**: Returns analytics data.

#### **GET** `/inventory/low-stock`

- **Description**: Retrieves a list of items that are low in stock or out of stock.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`200 OK`)**: Returns an array of low-stock inventory items.

#### **GET** `/inventory/menu-item/:menuItemId`

- **Description**: Retrieves inventory linked to a specific menu item.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`200 OK`)**: Returns an array of related inventory items.

#### Suppliers

#### **GET** `/inventory/suppliers/get-all`

- **Description**: Retrieves a paginated list of suppliers.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Query Parameters**: `search`, `page`, `limit`.
- **Success Response (`200 OK`)**: A paginated list of suppliers.

#### **POST** `/inventory/suppliers/create`

- **Description**: Creates a new supplier.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**:
  ```json
  {
    "name": "Farm Fresh Meats",
    "contactPerson": "John Farmer",
    "email": "john@farmfresh.com",
    "phone": "1112223333"
  }
  ```
- **Success Response (`201 Created`)**: Returns the new supplier object.

#### **GET** `/inventory/suppliers/single/:id`

- **Description**: Retrieves a single supplier by ID.
- **Access**: `RESTAURANT_OWNER`, `RESTAURANT_STAFF`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`200 OK`)**: Returns the supplier object.

#### **PUT** `/inventory/suppliers/update/:id`

- **Description**: Updates a supplier's details.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Request Body**: Partial supplier object.
- **Success Response (`200 OK`)**: Returns the updated supplier object.

#### **DELETE** `/inventory/suppliers/delete/:id`

- **Description**: Deletes a supplier.
- **Access**: `RESTAURANT_OWNER`, `ADMIN`, `SUPER_ADMIN`
- **Success Response (`204 No Content`)**.

---

### 4.10. Admin System (`/admin/system`)

#### **GET** `/admin/system/test-email`

- **Description**: Tests the email server configuration.
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Success Response (`200 OK`)**:
  ```json
  {
    "status": "success",
    "message": "Email connection successful. Your configuration is working."
  }
  ```

#### **GET** `/admin/system/health`

- **Description**: Provides a health check of the system, including database connectivity.
- **Access**: `ADMIN`, `SUPER_ADMIN`
- **Success Response (`200 OK`)**:
  ```json
  {
    "status": "ok",
    "timestamp": "2023-10-27T10:00:00.000Z",
    "database": "connected"
  }
  ```

---

This guide covers all the primary endpoints for the application. For more detailed information on specific models, validation rules, or less common endpoints, please refer to the domain-specific route and validation files in the backend codebase.
