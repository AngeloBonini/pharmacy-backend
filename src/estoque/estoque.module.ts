import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Estoque } from "./estoque.entity";
import { EstoqueService } from "./estoque.service";
import { EstoqueController } from "./estoque.controller";
import { Produto } from "src/produto/produto.entity";
import { ProdutoModule } from "src/produto/produto.module";

@Module({
    imports: [TypeOrmModule.forFeature([Estoque, Produto]), ProdutoModule],
    exports: [TypeOrmModule],
    providers: [EstoqueService],
    controllers:[EstoqueController]
  })
export class EstoqueModule {
  }