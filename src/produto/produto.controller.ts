import { Body, Controller, Post } from "@nestjs/common";
import { ProdutoService } from "./produto.service";

@Controller("/produto")
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) {

    }
    @Post()
    create(@Body() dto) {
        return this.produtoService.create(dto);
    }
}