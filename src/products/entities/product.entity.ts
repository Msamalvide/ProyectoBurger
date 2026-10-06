import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column()
    name!: string;

    @Column('text',{array:true})
    ingredients!: string[];

    @Column({nullable:true})
    imageUrl?: string;

    @Column({
        default: true
    })
    isActive!: boolean;


    @Column()
    simplePrice!: number;

    @Column()
    doublePrice!: number;


}
