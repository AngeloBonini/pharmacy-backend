import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { SaldoService } from "./saldo.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("/saldo")
@UseGuards(JwtAuthGuard)
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