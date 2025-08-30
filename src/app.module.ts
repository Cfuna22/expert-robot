import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { DatabaseService } from './db/db.service';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, DbModule, ClientModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
