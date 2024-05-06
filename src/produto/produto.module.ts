import { Module } from "@nestjs/common";
import { Produto } from "./produto.entity";

@Module({
    imports: [Produto]
})
export class ProdutoModule {

}