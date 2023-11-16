import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from 'src/commons/models/address.model';
import { Amenity } from 'src/commons/models/amenity.model';
import { Category } from 'src/commons/models/category.model';
import { Feature } from 'src/commons/models/feature.model';
import { Host } from 'src/commons/models/host.model';
import { PlaceAmenity } from 'src/commons/models/place-amenity.model';
import { PlaceAvailabilityCalendar } from 'src/commons/models/place-availability-calendar.model';
import { PlaceBooking } from 'src/commons/models/place-booking';
import { PlaceCategory } from 'src/commons/models/place-category.model';
import { PlaceDetails } from 'src/commons/models/place-details.mode';
import { PlaceFeature } from 'src/commons/models/place-feature.model';
import { PlaceImage } from 'src/commons/models/place-image.model';
import { PlaceOpeningHour } from 'src/commons/models/place-opening-hour.model';
import { PlaceRule } from 'src/commons/models/place-rule.model';
import { Place } from 'src/commons/models/place.model';
import { Rule } from 'src/commons/models/rule.model';
import { User } from 'src/commons/models/user.model';
import { PlacesController } from './places.controller';
import PlacesFormatter from './places.formatter';
import { PlacesResolver } from './places.resolver';
import { PlacesService } from './places.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Place,
      Host,
      User,
      Address,
      PlaceDetails,
      PlaceFeature,
      PlaceImage,
      PlaceRule,
      Feature,
      Rule,
      Category,
      PlaceCategory,
      Amenity,
      PlaceAmenity,
      PlaceOpeningHour,
      PlaceAvailabilityCalendar,
      PlaceBooking
    ]),
  ],
  providers: [PlacesResolver, PlacesService, PlacesFormatter],
  controllers: [PlacesController]
})
export class PlacesModule {}
