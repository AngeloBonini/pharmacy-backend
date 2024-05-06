import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Estoque } from "./estoque.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Estoque])]
})
export class EntitiesModule {

}