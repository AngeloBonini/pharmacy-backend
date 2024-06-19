import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { EstoqueService } from "./estoque.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("/estoque")
@UseGuards(JwtAuthGuard)
export class EstoqueController {
    constructor(private readonly estoqueService: EstoqueService) {

    }
    
    @Post()
    create(@Body() dto) {
        return this.estoqueService.create(dto);
    }
    @Post('/populate')
    populateFarmaceuticos(@Body() dto) {
        return this.estoqueService.createFakeStocks();
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getPessoa(@Body() where?) {
        return this.estoqueService.getEstoque(where);
    }
}