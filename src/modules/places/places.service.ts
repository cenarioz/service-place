import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Address } from 'src/commons/models/address.model';
import { Host } from 'src/commons/models/host.model';
import { PlaceDetails } from 'src/commons/models/place-details.mode';
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
    @InjectModel(PlaceDetails)
    private readonly placeDetailsModel: typeof PlaceDetails,
    @InjectModel(Address)
    private readonly addressModel: typeof Address,
    private readonly formatter: PlacesFormatter,
    private readonly sequelize: Sequelize,
  ) {}

  async getPlaces(
    latitude?: number,
    longitude?: number,
    radius?: number,
    type?: string,
    howManyPeople?: number,
    minValue?: number,
    maxValue?: number,
    limit?: number,
    offset?: number,
    keyword?: any
  ): Promise<any> {
    const haversine = `(
      6371 * acos(
          cos(radians(${latitude}))
          * cos(radians(address.latitude))
          * cos(radians(address.longitude) - radians(${longitude}))
          + sin(radians(${latitude})) * sin(radians(address.latitude))
      )
  )`;

    const attributes = [];

    if (latitude && longitude && radius) {
      attributes.push([Sequelize.literal(haversine), 'distance']);
    }
    console.log(keyword)
    attributes.push(...Object.keys(Place.getAttributes()));
    const data = await this.placeModel.findAndCountAll({
      where: {
        ...(latitude &&
          longitude &&
          radius && {
            [Op.and]: [
              Sequelize.where(Sequelize.literal(haversine), '<=', radius),
            ],
          }),
        ...(type && [
          Sequelize.where(Sequelize.literal(`details.${type}`), '=', true),
        ]),
        ...(howManyPeople && [
          Sequelize.where(
            Sequelize.literal(`details.max_attendees`),
            '>=',
            howManyPeople,
          ),
        ]),
      },
      attributes,
      include: [
        {
          model: PlaceDetails,
          as: 'details',
          where: {
            ...(minValue &&
              maxValue && {
                price_pp_hourly_0: {
                  [Op.between]: [minValue, maxValue],
                },
              }),
          },
        },
        { model: Address },
        {
          model: PlaceOpeningHour,
          as: 'opening_hours',
          separate: true,
        },
        {
          model: PlaceDetails,
        },
        {
          model: Host,
          include: [{ model: User, include: [{ model: Address }] }],
        },
        {
          model: PlaceImage,
          as: 'images',
          separate: true,
        },
      ],

      subQuery: false,
      limit,
      offset,
    });
    return data;
  }

  async getMediumValues(
    latitude?: number,
    longitude?: number,
    radius?: number,
    type?: string,
    howManyPeople?: number,
  ) {
    const result = await this.sequelize.query(`
    SELECT
    COUNT(*) AS "numPlaces",
    AVG(subquery.min_price) AS "minValue",
    AVG(subquery.max_price) AS "maxValue",
    AVG(subquery.min_price + subquery.max_price) / 2 AS "mediumValue"
FROM (
    SELECT
        MIN("details"."price_pp_hourly_0") AS min_price,
        MAX("details"."price_pp_hourly_0") AS max_price
    FROM "s_cenarioz"."place" AS "Place"
    LEFT JOIN "s_cenarioz"."address" AS "address" ON "Place"."address_id" = "address"."id"
    LEFT JOIN "s_cenarioz"."place_details" AS "details" ON "Place"."place_details_id" = "details"."id"
    WHERE 1=1 
${
  latitude && longitude && radius
    ? `AND (
  (
      6371 * acos(
          cos(radians(${latitude}))
          * cos(radians("address"."latitude"))
          * cos(radians("address"."longitude") - radians(${longitude}))
          + sin(radians(${latitude})) * sin(radians("address"."latitude"))
      )
  ) <= ${radius}
)`
    : ''
}
 ${type ? `AND "details"."${type}" = true` : ''}
) AS subquery;

    `);

    return result[0][0];
  }

  async getPlace(id: number, includes): Promise<Place> {
    const place = await this.placeModel.findOne({
      nest: true,
      where: { id },
      include: includes,
    });
    return this.formatter.formatter(place) as unknown as Place;
  }

  async findNearbyPlaces(latitude: number, longitude: number, radius: number) {
    const haversine = `(
        6371 * acos(
            cos(radians(${latitude}))
            * cos(radians(latitude))
            * cos(radians(longitude) - radians(${longitude}))
            + sin(radians(${latitude})) * sin(radians(latitude))
        )
    )`;

    const users = await Place.findAll({
      attributes: ['id', [Sequelize.literal(haversine), 'distance']],
      include: {
        model: Address,
      },

      where: {
        [Op.and]: [Sequelize.where(Sequelize.literal(haversine), '<=', radius)],
      },
      order: Sequelize.col('distance'),
      limit: 10,
    });
    return users;
  }
}
