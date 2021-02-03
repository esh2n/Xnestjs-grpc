import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Hero, HeroServiceClient } from 'src/generates/hero/hero';

@Injectable()
export class HeroService implements OnModuleInit {
  private heroService: HeroServiceClient;

  constructor(@Inject('HERO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.heroService = this.client.getService<HeroServiceClient>('HeroService');
  }

  getHero(): Observable<Hero> {
    return this.heroService.findOne({ id: 1 });
  }
}
