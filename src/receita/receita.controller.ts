import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { ReceitaService } from "./receita.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("/receita")
@UseGuards(JwtAuthGuard)
export class ReceitaController {
    constructor(private readonly receitaService: ReceitaService) {

    }
    @Post('/')
    create(@Body() dto) {
        return this.receitaService.create(dto);
    }

    @Get('/')
    getReceita(@Body() where?) {
        console.log(where);
        return this.receitaService.getReceita(where);
    }
    @Put('/update')
    putReceita(@Body() set, where) {
        return this.receitaService.updateReceita(set, where);

    }
    @Delete('/delete')
    deleteReceita(@Body() where) {
        return this.receitaService.deleteReceita(where);
    }
    
}