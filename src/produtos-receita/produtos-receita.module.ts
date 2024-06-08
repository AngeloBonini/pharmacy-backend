import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutosReceita } from "./produtos-receita.entity";
import { ProdutosReceitaService } from "./produtos-receita.service";

@Module({
    imports: [ TypeOrmModule.forFeature([ProdutosReceita])],
    exports: [TypeOrmModule],
    providers: [ ProdutosReceitaService],
    controllers: [],
})
export class ProdutosReceitaModule {

}