import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { Place } from 'src/commons/models/place.model';
import { PlacesService } from './places.service';

@Resolver('Place')
export class PlacesResolver {
  constructor(private readonly placesService: PlacesService) {}

  @Query((returns) => [Place])
  async places(): Promise<Place[]> {
    return this.placesService.getPlaces();
  }

  @Query((returns) => Place)
  async place(@Args('id') id: number, @Info() info): Promise<Place> {
    const result = this.processSelectionSet(
      info.fieldNodes[0].selectionSet.selections,
    );

    return this.placesService.getPlace(id, result);
  }

  processSelectionSet(selectionSet) {
    if (!selectionSet) {
      return [];
    }

    if (!Array.isArray(selectionSet)) {
      selectionSet = [selectionSet];
    }

    return selectionSet
      .filter((selection) => selection.selectionSet)
      .map((selection) => {
        const obj: any = {
          association: selection.name.value,
          nested: true,
        };

        if (selection.selectionSet) {
          obj.include = this.processSelectionSet(
            selection.selectionSet.selections,
          );
        }

        return obj;
      });
  }
}
