import { int, text, sqliteTable } from 'drizzle-orm/sqlite-core'

export const userTable = sqliteTable('users_table', {
  id: int().primaryKey({ autoIncrement: true }),
  email: text().notNull().unique(),
})
