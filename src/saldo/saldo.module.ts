import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaldoController } from "./saldo.controller";
import { SaldoService } from "./saldo.service";
import { Saldo } from "./saldo.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Saldo])],
    exports: [TypeOrmModule],
    providers: [SaldoService],
    controllers: [SaldoController],
})
export class SaldoModule {

}