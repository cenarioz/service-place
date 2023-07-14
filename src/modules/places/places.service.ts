import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Address } from 'src/commons/models/address.model';
import { Host } from 'src/commons/models/host.model';
import { PlaceImage } from 'src/commons/models/place-image.model';
import { PlaceOpeningHour } from 'src/commons/models/place-opening-hour.model';
import { Place } from 'src/commons/models/place.model';
import { User } from 'src/commons/models/user.model';
import PlacesFormatter from './places.formatter';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(Place)
    private readonly placeModel: typeof Place,
    private readonly formatter: PlacesFormatter,
    private readonly sequelize: Sequelize,
  ) {}

  async getPlaces(): Promise<Place[]> {
    const places = await this.placeModel.findAll({
      include: [
        { model: Address },
        {
          model: PlaceOpeningHour,
          as: 'opening_hours',
        },
        {
          model: Host,
          include: [{ model: User, include: [{ model: Address }] }],
        },
        {
          model: PlaceImage,
          as: 'images',
        },
      ],
    });

    return places;
  }

  async getPlace(id: number, includes): Promise<Place> {
    const place = await this.placeModel.findOne({
      nest: true,
      where: { id },
      include: includes,
    });
    return this.formatter.formatter(place) as unknown as Place;
  }
}
