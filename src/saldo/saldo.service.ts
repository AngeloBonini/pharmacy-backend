import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Saldo } from "./saldo.entity";

@Injectable()
export class SaldoService {
    constructor(@InjectRepository(Saldo) private readonly saldoRepository: Repository<Saldo>) {
    }

    async create(dto: Saldo) {
        const produto = this.saldoRepository.create(dto);
        return await this.saldoRepository.save(produto);
    }

    async getSaldo(where?: any) {
        const saldos = await this.saldoRepository.findBy(where);
        return saldos;
    }
}