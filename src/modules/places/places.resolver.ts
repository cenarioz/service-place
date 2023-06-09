import { Args, Query, Resolver } from '@nestjs/graphql';
import { Place } from 'src/commons/models/place.model';
import { PlacesService } from './places.service';

@Resolver('Place')
export class PlacesResolver {
  constructor(private readonly placesService: PlacesService) {}

  @Query(returns => [Place])
  async places(): Promise<Place[]> {
    return this.placesService.getPlaces();
  }

  @Query(returns => Place)
  async place(@Args('id') id: number): Promise<Place> {
    return this.placesService.getPlace(id);
  }
}
