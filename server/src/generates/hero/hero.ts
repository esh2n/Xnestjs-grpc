/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Metadata } from "grpc";

export const protobufPackage = "hero";

export interface HeroById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}

export const HERO_PACKAGE_NAME = "hero";

export interface HeroServiceClient {
  /** Unary */

  findOne(request: HeroById, metadata?: Metadata): Observable<Hero>;
}

export interface HeroServiceController {
  /** Unary */

  findOne(
    request: HeroById,
    metadata?: Metadata
  ): Promise<Hero> | Observable<Hero> | Hero;
}

export function HeroServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods = ["findOne"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("HeroService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("HeroService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const HERO_SERVICE_NAME = "HeroService";
