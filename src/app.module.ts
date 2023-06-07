import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoModule } from './modules/todo/todo.module'

const logger = new Logger('Sequelize')
@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      dialect: 'postgres',
      autoLoadModels: true,
      logging:
        process.env.NODE_ENV === 'development'
          ? (log) => {
              logger.verbose(log)
            }
          : false,
      define: { timestamps: false, schema: 'cenarioz' },
    }),
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
