import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RolesController {
  /**
   *  index
   */
  public async index({ view }: HttpContextContract) {
    const roles = await Role.all();
    return view.render('roles', { roles })
  }

  public async show({ view, params }: HttpContextContract) {
    try {
      const role = await Role.find(params.id);

      return view.render('show', { role })
    } catch (e) {
      console.log(e);
    }
  }

  public async edit({ view, params }: HttpContextContract) {

    const role = await Role.find(params.id);
    return view.render('show', { role })
  }

  public async update({ view, params, request }: HttpContextContract) {

    const role = await Role.find(params.id);

    if (role) {
      role.name = request.input("name");
      role.description = request.input("description");
      if (await role.save()) {
        return view.render('show', { role });
      }
    }
    return;
  }

  public async create({ view }: HttpContextContract) {
    return view.render('add');
  }

  public async store({request, response }: HttpContextContract) {
    const role = new Role();
    role.name = request.input('name');
    role.description = request.input('description');
    await role.save();
    response.redirect('/roles/' + role.id);
  }
}
