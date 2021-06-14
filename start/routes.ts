/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.group(() => {
  Route.on('register').render("register").as('showRegister');
  Route.post('register', "AuthController.register").as('register');
  Route.on("login").render("login").as('showLogin');
  Route.post("/login", "AuthController.login").as('login');
}).middleware('notAuth');

Route.group(()=>{
  Route.get("/logout", "AuthController.logout").as('logout');

  Route.group(()=>{
    Route.get("/", "Dashboard/MainsController.index").as("dashboard");
    Route.resource("users", "Dshboard/UsersController")
  }).prefix('dashboard')
}).middleware('auth')

