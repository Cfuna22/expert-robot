import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from 'src/db/db.service';
import { users } from 'src/db/schema';

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}

  async create(email: string, password: string) {
    const [user] = await this.database.db
      .insert(users)
      .values({ email, password })
      .returning();

    return user;
  }

  async findById(id: number) {
    return this.database.db.query.users.findFirst({ where: eq(users.id, id) });
  }

  async findByEmail(email: string) {
    return this.database.db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async update(
    id: number,
    updates: Partial<{ email: string; password: string }>,
  ) {
    const [updateUser] = await this.database.db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();

    return updateUser;
  }

  async delete(id: number) {
    const result = await this.database.db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (!result || result.length === 0) {
      throw new Error(`User with id ${id} not found`);
    }

    return result;
  }
}
