import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer("role_id").notNullable();
      table.string("email").unique().notNullable();
      table.string("phone_number").unique().nullable();
      table.string("password").notNullable();
      table.string("remember_me_token").nullable();
      table.boolean("email_verified").defaultTo(0);
      table.timestamps(true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
