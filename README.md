# Online Material Store
Online store for order materials

## User Stories
* As admin, I would like to CREATE new materials
* As admin, I would like to UPDATE materials
* As admin, I would like to DELETE materials

* As a user, I would like to see a homepage where I can log in to the site with my login details
* As a user, I would like to READ and access a database of materials
* As a user, I would like to add selected materials to the cart
* As a user, I would like to confirm items in chat and receive an invoice to my email

### Acceptance Criteria

* It's done when the `/` homepage route renders a login page.

* It's done when an existing user can enter their credentials on the login page to create a session on the server.

* It's done when a new user can create an account on the login page and then be immediately logged in with a session.

* It's done when the `/user` route renders the logged-in user's saved passwords and a form to save a new password.

* It's done when the `/user/:id` route renders the login information saved for the specific user.

* It's done when only a logged in user can visit the `/products` route.

* It's done when a logged in user is redirected to `/products` when they try to visit `/` again.

* It's done when a logged in user can add viewed product to there shopping cart

* It's done when a logged in user can sumit there cart and receive an emailed invoice.

* It's done when a logged in user can select a "Logout" button to remove their session.

* It's done when the API routes to create and delete posts are protected from non logged-in users.

* It's done when the code is organized using MVC architecture.

* It's done when the views are rendered with Handlebars.js templates.

* It's done the online material store is able to send an emailed invoice

## Specifications 

* The database models have the following fields and associations:

  * `User`
    * `id`: primary key

    * `name`

    * `email`
    
    * `password`
      `validate`: {
        len: [8],
      },

  * `Product`
    * `id`: primary key

    * `type`

  * `Material`
    * `id`

    * `colour`

    * `finish`

    * `product_code`

    * `length`

    * `width`

    * `thickness`

    * `price`
 
    * `brand_id`: foreign key that references `brand.id`   

  * `Brand`
    * `id`: primary key

    * `name`
 
    * `product_id`: foreign key that references `product.id`   

  
Sando:
models and seeds

Dan:
config, controllers and view

Sophie:
view

workout how bcrypt will be getting use
what framework we should use

things to work on:
shopping cart
getting a order number working