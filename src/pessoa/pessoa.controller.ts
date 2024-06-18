import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { PessoaService } from "./pessoa.service";
import { Pessoa } from "./pessoa.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('/pessoa')
export class PessoaController {
    constructor(private readonly pessoaService: PessoaService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() dto) {
        return this.pessoaService.create(dto);
    }
    @Post('/populate/cliente')
    populateCliente(@Body() dto) {
        return this.pessoaService.createFakeClients(dto.count);
    }

    @Post('/populate/farmaceuticos')
    populateFarmaceuticos(@Body() dto) {
        return this.pessoaService.createFakePharmaceutics(dto.count);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getPessoa(@Body() where?) {
        return this.pessoaService.getPessoa(where);
    }

}