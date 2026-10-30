import { Injectable,ConflictException, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterDto } from 'src/auth/dto/register.dto/register.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {userRole} from '../enums/rol'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements OnModuleInit {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}


  async onModuleInit() {
    const email = process.env.ADMIN_EMAIL;
    const password= process.env.ADMIN_PASSWORD;

    if(!email || !password){
      return;
    }

    const userDb: User | null = await this.userRepository.findOne({ where: { email } });

    if(userDb){
      return;
    }

    const admin: User = this.userRepository.create({
      name: 'Admin',
      email,
      password : await bcrypt.hash(password,10),
      role: userRole.admin, 
    })

    await this.userRepository.save(admin);

  }

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
    return user;
  }
 
}
