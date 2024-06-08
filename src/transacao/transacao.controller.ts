import { Body, Controller, Get, Post } from "@nestjs/common";
import { TransacaoService } from "./transacao.service";

@Controller("/transacao")
export class TransacaoController {
    constructor(private readonly transacaoService: TransacaoService) {

    }
    @Post()
    create(@Body() dto) {
        return this.transacaoService.create(dto);
    }

    @Get()
    getTransacao(@Body() where?) {
        console.log(where);
        return this.transacaoService.getTransacao(where);
    }
    
}