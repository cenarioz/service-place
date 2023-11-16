import { Controller, Get, Param, ParseFloatPipe } from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get('nearby/:latitude/:longitude/:radius')
  findNearbyPlaces(
    @Param('latitude', ParseFloatPipe) latitude: number,
    @Param('longitude', ParseFloatPipe) longitude: number,
    @Param('radius', ParseFloatPipe) radius: number,
  ) {
    return this.placesService.findNearbyPlaces(latitude, longitude, radius);
  }
}
