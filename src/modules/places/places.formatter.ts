import * as moment from 'moment';
export default class PlacesFormatter {
  formatter(place) {
    const formattedPlace = {
      id: place.id,
      hostId: place.hostId,
      rating: place.rating,
      title: place.title,
      address_id: place.address_id,
      description: place.description,
      value: place.value,
      value_type: place.value_type,
      minimum: place.minimum,
      type: place.type,
      address: place.address,
      details: place.details,
      host: place.host,
      features: place?.features?.map((feature) => {
        return feature.dataValues;
      }),
      rules: place.rules?.map((rule) => {
        return rule.dataValues;
      }),
      images: place?.images,
      bookings: place.bookings?.map((booking) => {
        const startDate: Date = new Date(booking.start_date);
        const endDate: Date = new Date(booking.end_date);
        const diffMillis: number = endDate.getTime() - startDate.getTime();
        const hoursDiff: number = diffMillis / 1000 / 60 / 60;
        booking.start_date = moment(booking.start_date).format(
          'YYYY-MM-DD HH:mm:ss',
        );
        booking.end_date = moment(booking.end_date).format(
          'YYYY-MM-DD HH:mm:ss',
        );
        booking.hours = hoursDiff;
        return booking;
      }),
      opening_hours: place.opening_hours?.map((openHour) => {
        const openingDate: Date = new Date(
          `1970-01-01T${openHour.opening_time}Z`,
        );
        const closingDate: Date = new Date(
          `1970-01-01T${openHour.closing_time}Z`,
        );
        const diffMillis: number =
          closingDate.getTime() - openingDate.getTime();
        const hoursOpen: number = diffMillis / 1000 / 60 / 60;
        openHour.hours = hoursOpen;
        return openHour;
      }),
      categories: place.categories?.map((category) => {
        return category.dataValues;
      }),
      amenities: place.amenities?.map((amenity) => {
        return amenity.dataValues;
      }),
    };

    return formattedPlace;
  }
}
