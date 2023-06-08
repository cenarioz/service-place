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
      features: place.place_feature.map((feature) => {
        return feature.features;
      }),
      rules: place.place_rule.map((rule) => {
        return rule.rules;
      }),
      images: place.place_image.map((image) => {
        return image;
      }),
    };

    return formattedPlace;
  }
}
