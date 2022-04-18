import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
      include: {
        countries: {
          select: {
            id_language: true,
            id_currency: true,
          },
        },
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }
    return user;
  }
  generateJwt(user) {
    const payload = {
      sub: user.id,
      user: user.id,
      userPreferences: {
        id_language: user.countries.id_language,
        id_currency: user.countries.id_currency,
      },
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
