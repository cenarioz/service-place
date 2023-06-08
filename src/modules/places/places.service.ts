import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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
import { Place as PlaceType } from '../graphql/graphql.schema';
import PlacesFormatter from './places.formatter';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(Place)
    private readonly placeModel: typeof Place,
    private readonly formatter: PlacesFormatter,
  ) {}

  async getPlaces(): Promise<Place[]> {
    const places = await this.placeModel.findAll({
      include: [
        { model: Address },
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
  async getPlace(id: number): Promise<PlaceType> {
    const place = await this.placeModel.findOne({
      nest: true,
      where: { id },
      include: [
        { model: Address },
        { model: PlaceDetails, as: 'details' },
        {
          model: PlaceFeature,
          as: 'place_feature',
          include: [{ model: Feature, as: 'features' }],
        },
        {
          model: PlaceRule,
          as: 'place_rule',
          include: [{ model: Rule, as: 'rules' }],
        },
        {
          model: PlaceImage,
        },

        {
          model: Host,
          include: [{ model: User, include: [{ model: Address }] }],
        },
      ],
    });
    return this.formatter.formatter(place);
  }
}
