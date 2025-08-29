import {
  pgEnum,
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const deskStatusEnum = pgEnum('desk_status', [
  'available',
  'reserved',
  'inactive',
]);

export const desks = pgTable('desks', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  floor: varchar('floor', { length: 50 }),
  capacity: integer('capacity').notNull().default(1),
  status: deskStatusEnum('status').notNull().default('available'),
  location: varchar('location', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
