import { Request, Response, NextFunction } from 'express';
import * as geoip from 'geoip-lite';

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
