import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transacao } from "./transacao.entity";
import { TransacaoService } from "./transacao.service";
import { TransacaoController } from "./transacao.controller";
@Module({
    imports: [TypeOrmModule.forFeature([Transacao])],
    exports: [TypeOrmModule],
    providers: [TransacaoService],
    controllers: [TransacaoController],
})
export class TransacaoModule {

}