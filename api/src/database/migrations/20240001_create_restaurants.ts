import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('restaurants', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.string('name').notNullable();
    t.specificType('categories', 'text[]').notNullable().defaultTo('{}');
    t.decimal('rating', 2, 1).notNullable().defaultTo(0);
    t.string('delivery_fee').notNullable().defaultTo('Grátis');
    t.string('delivery_time').notNullable();
    t.string('distance').notNullable();
    t.string('icon_name').notNullable();
    t.string('icon_color').notNullable();
    t.boolean('promoted').notNullable().defaultTo(false);
    t.timestamps(true, true);
  });

  await knex.schema.createTable('menu_items', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('restaurant_id').notNullable().references('id').inTable('restaurants').onDelete('CASCADE');
    t.string('name').notNullable();
    t.text('description').notNullable();
    t.decimal('price', 10, 2).notNullable();
    t.enum('tab', ['popular', 'mains', 'drinks', 'desserts']).notNullable();
    t.string('icon_name').notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('menu_items');
  await knex.schema.dropTableIfExists('restaurants');
}
