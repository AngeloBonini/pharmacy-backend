import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import {ConfigModule, ConfigService} from '@nestjs/config'
import { Estoque } from './estoque/estoque.entity';
import { Produto } from './produto/produto.entity';
import { EstoqueController } from './estoque/estoque.controller';
import { EstoqueService } from './estoque/estoque.service';
import { EstoqueModule } from './estoque/estoque.module';
import { ProdutoController } from './produto/produto.controller';
import { ProdutoService } from './produto/produto.service';
import { ProdutoModule } from './produto/produto.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { PessoaController } from './pessoa/pessoa.controller';
import { PessoaService } from './pessoa/pessoa.service';
import { Pessoa } from './pessoa/pessoa.entity';

@Module({
  imports: [
    EstoqueModule,
    ProdutoModule,
    PessoaModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Estoque, Produto, Pessoa],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, EstoqueController, ProdutoController, PessoaController],
  providers: [AppService, EstoqueService, ProdutoService, PessoaService],
})
export class AppModule { }
