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
import { ReceitaModule } from './receita/receita.module';
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
import { ProdutosReceitaModule } from './produtos-receita/produtos-receita.module';
import { Receita } from './receita/receita.entity';
import { Transacao } from './transacao/transacao.entity';
import { Saldo } from './saldo/saldo.entity';
import { ProdutosReceita } from './produtos-receita/produtos-receita.entity';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    EstoqueModule,
    ProdutoModule,
    PessoaModule,
    ReceitaModule,
    TransacaoModule,
    AuthModule,
    ProdutosReceitaModule,
    SaldoModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Estoque, Produto, Pessoa, Receita, Transacao, Saldo, ProdutosReceita],
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
