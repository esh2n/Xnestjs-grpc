import { Controller } from '@nestjs/common';
import { Metadata } from 'grpc';
import {
  HeroServiceController,
  HeroServiceControllerMethods,
  HeroById,
  Hero,
} from '../generates/hero/hero';

@Controller('hero')
@HeroServiceControllerMethods()
export class HeroController implements HeroServiceController {
  findOne(data: HeroById, metadata?: Metadata): Promise<Hero> | Hero {
    if (metadata) console.log(metadata);

    return {
      id: data.id,
      name: 'Hi, from server.',
    } as Hero;
  }
}
