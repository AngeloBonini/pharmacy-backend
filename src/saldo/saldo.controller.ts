import { Body, Controller, Get, Post } from "@nestjs/common";
import { SaldoService } from "./saldo.service";

@Controller("/saldo")
export class SaldoController {
    constructor(private readonly saldoService: SaldoService) {

    }
    @Post()
    create(@Body() dto) {
        return this.saldoService.create(dto);
    }

    @Get()
    getSaldo(@Body() where?) {
        console.log(where);
        return this.saldoService.getSaldo(where);
    }
    
}