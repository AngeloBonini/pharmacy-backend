import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
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
import { ReceitaModule } from './receita/receia.module';
import { ReceitaController } from './receita/receita.controller';
import { ReceitaService } from './receita/receita.service';
import { ProdutosReceitaService } from './produtos-receita/produtos-receita.service';
import { TransacaoModule } from './transacao/transacao.module';
import { TransacaoController } from './transacao/transacao.controller';
import { TransacaoService } from './transacao/transacao.service';
import { SaldoModule } from './saldo/saldo.module';
import { SaldoController } from './saldo/saldo.controller';
import { SaldoService } from './saldo/saldo.service';
import { CustomLogger } from './custom-logger/custom-logger.service';

@Module({
  imports: [
    EstoqueModule,
    ProdutoModule,
    PessoaModule,
    ReceitaModule,
    TransacaoModule,
    SaldoModule,
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
        logging: true,
        logger: new CustomLogger(),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, EstoqueController, ProdutoController, PessoaController, ReceitaController, TransacaoController, SaldoController],
  providers: [AppService, EstoqueService, ProdutoService, PessoaService, ReceitaService, ProdutosReceitaService, TransacaoService, SaldoService],
})
export class AppModule { }
