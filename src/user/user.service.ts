import { Injectable,ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterDto } from 'src/auth/dto/register.dto/register.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(user:RegisterDto): Promise<User> {

    const userDb: User | null = await this.userRepository.findOne({ where: { email: user.email } });

    if(userDb){
      throw new ConflictException('Ya existe un usuario con este email');
    }

    const { confirmPassword, ...rest} = user;

    const hashedPassword = await bcrypt.hash(user.password,10)

    const newUser: User = this.userRepository.create({...rest,password: hashedPassword});

    return this.userRepository.save(newUser);
    
  }


  async findByEmail(email:string): Promise<User | null>{

    const user: User | null = await this.userRepository.findOne({where:{email}})

    if(!user){
      throw new ConflictException('No existe un usuario con este email');
    }

    return user;
  }
 
}
