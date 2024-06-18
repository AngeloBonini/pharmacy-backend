import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ProdutoService } from "./produto.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("/produto")
@UseGuards(JwtAuthGuard)
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) {

    }
    @Post()
    create(@Body() dto) {
        return this.produtoService.create(dto);
    }

    @Post('/populate')
    populate() {
        return this.produtoService.createMedicines();
    }

    @Get()
    getProduct(@Body() where?) {
        console.log(where);
        return this.produtoService.getProduct(where);
    }
    
}