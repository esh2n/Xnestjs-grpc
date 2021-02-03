import { Module } from '@nestjs/common';
import { HeroModule } from './hero/hero.module';

@Module({
  imports: [HeroModule], // [HeroModule, Hero2Module]
})
export class AppModule {}
