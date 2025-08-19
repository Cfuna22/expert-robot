import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private client = postgres(process.env.DATABASE_URL!);
  public db = drizzle(this.client, { schema });

  async onModuleDestroy() {
    await this.client.end();
  }
}
