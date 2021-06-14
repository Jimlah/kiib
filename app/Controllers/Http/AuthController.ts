import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import {schema, rules} from '@ioc:Adonis/Core/Validator';
import User from "App/Models/User";

export default class AuthController {
  /**
   * register
   */
  public async register({auth, request, response, session}: HttpContextContract) {
    const validateSchema = schema.create({
      email: schema.string({trim: true}, [
        rules.email(),
        rules.unique({table: "users", column:"email"}),
      ]),
      password: schema.string({trim: true}, [
        rules.confirmed()
      ]),
      phone_number: schema.string({trim: true})
    });

    const errorMessage = {
      'email.required': "email is required",
      'email.unique': "email already used",
      'password.required': "password is required",
      'password.confirmed': "Password confirmation is incorrect",
      'phone_number.required': "Phone Number is required"
    }

    const UserDetails = await request.validate({
      schema: validateSchema,
      messages: errorMessage
    });

    const user = new User();
    user.email = UserDetails.email;
    user.password = UserDetails.password;
    user.phoneNumber = UserDetails.phone_number;
    user.roleId = 3;
    await user.save();
    await auth.login(user);
    session.flash('success', 'Register Successful, Welcome User')
    response.redirect("/dashboard");
  }

  /**
   * async login
   */
  public async login({auth, request, response, session}: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    await auth.attempt(email, password);
    session.flash('success', 'Login Successful, Welcome Back')
    response.redirect("/dashboard");
  }

  /**
   * logout
   */
  public async logout({auth, response, session}: HttpContextContract) {

    await auth.logout();
    session.flash('success', "You have successfully logged out")
    response.redirect("/login");
  }
}
