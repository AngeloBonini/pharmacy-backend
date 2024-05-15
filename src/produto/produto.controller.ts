import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProdutoService } from "./produto.service";

@Controller("/produto")
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) {

    }
    @Post()
    create(@Body() dto) {
        return this.produtoService.create(dto);
    }

    @Get()
    getProduct(@Body() where?) {
        console.log(where);
        return this.produtoService.getProduct(where);
    }
    
}