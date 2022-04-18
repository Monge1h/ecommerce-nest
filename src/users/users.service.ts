import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const data_user = await this.prismaService.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });
    if (data_user) throw new ConflictException('User already exists');
    const new_password = await bcrypt.hash(createUserDto.password, 10);
    const new_user = await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        password: new_password,
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        user_country: createUserDto.user_country,
      },
    });
    delete new_user.password;
    return new_user;
  }

  findAll() {
    return this.prismaService.user.findMany({
      select: {
        last_name: true,
        first_name: true,
        id: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        last_name: true,
        first_name: true,
        id: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User Not Found');
    const new_password = await bcrypt.hash(updateUserDto.password, 10);
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        email: updateUserDto.email,
        password: new_password,
        last_name: updateUserDto.last_name,
        first_name: updateUserDto.first_name,
        user_country: updateUserDto.user_country,
      },
      select: {
        id: true,
      },
    });
  }

  async remove(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User Not Found');

    return this.prismaService.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
