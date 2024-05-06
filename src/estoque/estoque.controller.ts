import { Body, Controller, Post } from "@nestjs/common";
import { EstoqueService } from "./estoque.service";

@Controller("/estoque")
export class EstoqueController {
    constructor(private readonly estoqueService: EstoqueService) {

    }
    @Post()
    create(@Body() dto) {
        return this.estoqueService.create(dto);
    }
}