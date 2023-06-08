import { Args, Query, Resolver } from '@nestjs/graphql';
import { Place } from 'src/commons/models/place.model';
import { Place as PlaceType } from '../graphql/graphql.schema';
import { PlacesService } from './places.service';

@Resolver('Place')
export class PlacesResolver {
  constructor(private readonly placesService: PlacesService) {}

  @Query('places')
  async places(): Promise<Place[]> {
    return this.placesService.getPlaces();
  }

  @Query('place')
  async place(@Args('id') id: number): Promise<PlaceType> {
    return this.placesService.getPlace(id);
  }
}
