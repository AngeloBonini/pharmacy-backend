import { ProdutosReceitaService } from './../produtos-receita/produtos-receita.service';
import { ProdutosReceita } from './../produtos-receita/produtos-receita.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Receita } from "./receita.entity";
import { Transacao } from 'src/transacao/transacao.entity';
import { TransacaoService } from 'src/transacao/transacao.service';

interface ReceitaDto {
    receita: Receita,
    produtosReceitas: ProdutosReceita[],
}
@Injectable()
export class ReceitaService {
    constructor(@InjectRepository(Receita) private readonly receitaRepository: Repository<Receita>,
        @InjectRepository(ProdutosReceita) private readonly produtosReceitaService: ProdutosReceitaService,
        @InjectRepository(Transacao) private readonly transacaoService: TransacaoService,
    ) {
    }

    async create(dto: ReceitaDto) {
        const receita = this.receitaRepository.create(dto.receita);

        const produtosReceitasCreateds = [] as ProdutosReceita[]
        let transactionSum = 0;
        for (const produtoReceita of dto.produtosReceitas) {
            produtoReceita.id_receita = receita.id_receita;
            produtoReceita.receita = receita;
            const produtosReceitaCreated = await this.produtosReceitaService.create(produtoReceita);
            produtosReceitasCreateds.push(produtosReceitaCreated);
            const transactionValue = produtoReceita.quantidade * produtoReceita.produto.preco; 7

            transactionSum += transactionValue;
        }

        const saveReceita = await this.receitaRepository.save(receita);

        const transacao = await this.transacaoService.create({
            id_pessoa: dto.receita.id_farmaceutico,
            data_transacao: new Date(),
            valor_transacao: transactionSum,
        });

        return { saveReceita, produtosReceitasCreateds }
    }

    async getReceita(where?: any) {
        const receitas = await this.receitaRepository.findBy(where);
        return receitas;
    }

    async updateReceita(set: any, where: any) {
        return await this.receitaRepository.update(where, set);
    }

    async deleteReceita(where: any) {
        return await this.receitaRepository.delete(where);
    }
}