import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pessoa } from "./pessoa.entity";
import { PessoaService } from "./pessoa.service";
import { PessoaController } from "./pessoa.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Pessoa])],
    exports: [PessoaService, TypeOrmModule],
    providers: [PessoaService],
    controllers: [PessoaController],
})
export class PessoaModule {

}