import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from 'src/commons/models/address.model';
import { Feature } from 'src/commons/models/feature.model';
import { Host } from 'src/commons/models/host.model';
import { PlaceDetails } from 'src/commons/models/place-details.mode';
import { PlaceFeature } from 'src/commons/models/place-feature.model';
import { PlaceImage } from 'src/commons/models/place-image.model';
import { PlaceRule } from 'src/commons/models/place-rule.model';
import { Place } from 'src/commons/models/place.model';
import { Rule } from 'src/commons/models/rule.model';
import { User } from 'src/commons/models/user.model';
import PlacesFormatter from './places.formatter';
import { PlacesResolver } from './places.resolver';
import { PlacesService } from './places.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Place, Host, User, Address, PlaceDetails, 
    PlaceFeature, PlaceImage, PlaceRule, Feature, Rule]),
  ],
  providers: [PlacesResolver, PlacesService, PlacesFormatter],
})
export class PlacesModule {}
