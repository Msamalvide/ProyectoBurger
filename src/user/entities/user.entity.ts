import { userRole } from 'src/enums/rol';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!:string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({
        default: true
    })
    isActive!: true;

    @Column({
        type: 'enum',
        enum: userRole,
        default: userRole.user
    })
    role!: userRole;

    


}
