import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Receita } from "./receita.entity";
import { ReceitaService } from "./receita.service";
import { ReceitaController } from "./receita.controller";
import { ProdutosReceitaService } from "src/produtos-receita/produtos-receita.service";
import { ProdutosReceita } from "src/produtos-receita/produtos-receita.entity";
@Module({
    imports: [TypeOrmModule.forFeature([Receita]), TypeOrmModule.forFeature([ProdutosReceita])],
    exports: [TypeOrmModule],
    providers: [ReceitaService, ProdutosReceitaService],
    controllers: [ReceitaController],
})
export class ReceitaModule {

}