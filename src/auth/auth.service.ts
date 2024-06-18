import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { Pessoa } from 'src/pessoa/pessoa.entity';

@Injectable()
export class AuthService {
  constructor(
    private pessoaService: PessoaService,
    private jwtService: JwtService,
  ) { }

  async validateUser({ email, password }: LoginDto): Promise<Pessoa> {
    const pessoa = await this.pessoaService.findOne( { email } );
    if (pessoa && (await bcrypt.compare(password, pessoa.password))) {
      return pessoa;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const pessoa = await this.validateUser(loginDto);

    if (pessoa) {
      const { id_pessoa, tipo, nome, email } = pessoa;
      const payload = { id_pessoa, tipo, nome, email };
      return {
        pessoa: {
          id_pessoa, tipo, nome, email
        },
        token: this.jwtService.sign(payload),
      };
    }

    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Pessoa was not found!',
    });
  }
}
