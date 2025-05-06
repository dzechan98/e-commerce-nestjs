import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import { CategoryEntity } from 'src/entities/category.entity';
import { ProductsModule } from './modules/products/products.module';
import { ProductEntity } from 'src/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'vinhdoan',
      password: 'password',
      database: 'demo',
      entities: [CategoryEntity, ProductEntity],
      synchronize: true,
    }),
    CategoriesModule,
    //ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
