import { Sequelize } from 'sequelize-typescript';

export const addDistanceScope = (
  latitude,
  longitude,
  distance,
  unit = 'km',
) => {
  const constant = unit === 'km' ? 6371 : 3959;
  const haversine = `(
      ${constant} * acos(
          cos(radians(${latitude}))
          * cos(radians(latitude))
          * cos(radians(longitude) - radians(${longitude}))
          + sin(radians(${latitude})) * sin(radians(latitude))
      )
    )`;
  return {
    attributes: [[Sequelize.literal(haversine), 'distance']],
    having: Sequelize.literal(`distance <= ${distance}`),
  };
};
