import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { GraphqlModule } from './modules/graphql/graphql.module'
import { PlacesModule } from './modules/places/places.module'

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
    PlacesModule,
    GraphqlModule
  ]
})
export class AppModule {}
