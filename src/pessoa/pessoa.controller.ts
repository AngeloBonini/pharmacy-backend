import { Body, Controller, Get, Post } from "@nestjs/common";
import { PessoaService } from "./pessoa.service";
import { Pessoa } from "./pessoa.entity";

@Controller('/pessoa')
export class PessoaController {
    constructor(private readonly pessoaService: PessoaService) { }

    @Post()
    create(@Body() dto) {
        return this.pessoaService.create(dto);
    }

    @Get()
    getPessoa(@Body() where? ) {
        return this.pessoaService.getPessoa(where);
    }
}