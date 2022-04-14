import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as geoip from 'geoip-lite';
import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from './utils.service';

export function GeoLocationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const ip = req.header('x-forwarded-for') || req.socket.remoteAddress;
  const geo = geoip.lookup(ip);
  res.locals.geocodeLocation = geo;
  next();
}

@Injectable()
export class userPreferencesMiddleware implements NestMiddleware {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly utilsService: UtilsService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const user_geoLocation: any = res.locals.geocodeLocation;
    let user_preferences: any = {};
    if (user_geoLocation !== null) {
      const country = await this.prismaService.countries.findFirst({
        where: {
          country_code: user_geoLocation['country'],
        },
      });
      if (country !== null) {
        user_preferences = {
          id_currency: country.id_currency,
          id_language: country.id_language,
          id_country: country.id,
        };
      } else {
        const default_settings =
          await this.utilsService.getDefaultStoreValues();
        user_preferences = {
          id_currency: default_settings.id_default_currency,
          id_language: default_settings.id_default_language,
        };
      }
    } else {
      const default_settings = await this.utilsService.getDefaultStoreValues();
      user_preferences = {
        id_currency: default_settings.id_default_currency,
        id_language: default_settings.id_default_language,
      };
    }
    res.locals.user_preferences = user_preferences;
    next();
  }
}
