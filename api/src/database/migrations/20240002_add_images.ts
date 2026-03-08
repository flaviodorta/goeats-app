import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('restaurants', (t) => {
    t.string('cover_image').notNullable().defaultTo('');
  });

  await knex.schema.alterTable('menu_items', (t) => {
    t.string('image').notNullable().defaultTo('');
    t.decimal('rating', 2, 1).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('restaurants', (t) => {
    t.dropColumn('cover_image');
  });
  await knex.schema.alterTable('menu_items', (t) => {
    t.dropColumn('image');
    t.dropColumn('rating');
  });
}
