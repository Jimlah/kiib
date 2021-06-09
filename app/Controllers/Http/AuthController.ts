import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import {schema, rules} from '@ioc:Adonis/Core/Validator';
import User from "App/Models/User";

export default class AuthController {
  /**
   * register
   */
  public async register({auth, request, response}: HttpContextContract) {
    const validateSchema = schema.create({
      email: schema.string({trim: true}, [
        rules.email(),
        rules.unique({table: "users", column:"email"}),
      ]),
      password: schema.string({trim: true}, [
        rules.confirmed()
      ]),
      phone_number: schema.string({trim: true}, [
        rules.required()
      ])
    });

    const UserDetails = await request.validate({
      schema: validateSchema,
    });

    const user = new User();
    user.email = UserDetails.email;
    user.password = UserDetails.password;
    user.phoneNumber = UserDetails.phone_number;
    await user.save();
    await auth.login(user);
    response.redirect("/dashboard");
  }

  /**
   * async login
   */
  public async login({auth, request, response}: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    await auth.attempt(email, password);
    response.redirect("/dashboard");
  }
}
