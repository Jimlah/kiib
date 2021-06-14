import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MainsController {
  public async index ({view}: HttpContextContract) {
    return await view.render('dashboard.home')
  }

  public async create ({}: HttpContextContract) {
  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
