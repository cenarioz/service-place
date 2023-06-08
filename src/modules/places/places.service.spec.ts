import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Address } from 'src/commons/models/address.model';
import { Feature } from 'src/commons/models/feature.model';
import { Host } from 'src/commons/models/host.model';
import { PlaceFeature } from 'src/commons/models/place-feature.model';
import { PlaceImage } from 'src/commons/models/place-image.model';
import { PlaceRule } from 'src/commons/models/place-rule.model';
import { Place } from 'src/commons/models/place.model';
import { Rule } from 'src/commons/models/rule.model';
import { User } from 'src/commons/models/user.model';

import { PlaceDetails } from 'src/commons/models/place-details.mode';
import PlacesFormatter from './places.formatter';
import { PlacesService } from './places.service';

describe('PlacesService', () => {
  let placesService: PlacesService;
  let placesFormatter: PlacesFormatter;
  let placeModelMock: any;

  beforeEach(async () => {
    placeModelMock = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlacesService,
        PlacesFormatter,
        {
          provide: getModelToken(Place),
          useValue: placeModelMock,
        },
      ],
    }).compile();

    placesService = module.get<PlacesService>(PlacesService);
    placesFormatter = module.get<PlacesFormatter>(PlacesFormatter);
  });

  describe('getPlaces', () => {
    it('should return an array of places', async () => {
      const expectedResult = [{ id: 1, name: 'Place 1' }, { id: 2, name: 'Place 2' }];
      placeModelMock.findAll.mockResolvedValue(expectedResult);

      const result = await placesService.getPlaces();

      expect(placeModelMock.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getPlace', () => {
    it('should return a formatted place', async () => {
      const placeId = 1;
      const place = {
        id: placeId,
        name: 'Place',
        // ...other properties
      };
      const formattedPlace = {
        id: placeId,
        name: 'Place',
        // ...formatted properties
      };
      placeModelMock.findOne.mockResolvedValue(place);
      placesFormatter.formatter = jest.fn().mockReturnValue(formattedPlace);

      const result = await placesService.getPlace(placeId);

      expect(placeModelMock.findOne).toHaveBeenCalledWith({
        nest: true,
        where: { id: placeId },
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
      expect(placesFormatter.formatter).toHaveBeenCalledWith(place);
      expect(result).toEqual(formattedPlace);
    });
  });
});
