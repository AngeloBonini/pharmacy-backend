import { Module } from "@nestjs/common";
import { Produto } from "./produto.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoService } from "./produto.service";
import { ProdutoController } from "./produto.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Produto])],
    exports: [TypeOrmModule],
    providers: [ProdutoService],
    controllers: [ProdutoController]
})
export class ProdutoModule {

}