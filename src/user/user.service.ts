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
}
