import {
  Args,
  Field,
  Info,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { Place, dynamicFilter } from 'src/commons/models/place.model';
import { PlacesService } from './places.service';

@ObjectType()
class PostsAndCount {
  @Field(() => [Place])
  places: [Place];
  @Field(() => Number)
  count: number;
}

@Resolver('Place')
export class PlacesResolver {
  constructor(private readonly placesService: PlacesService) {}

  @Query((_returns) => dynamicFilter)
  async dynamicFilters(
    @Args('latitude', { nullable: true }) latitude: number,
    @Args('longitude', { nullable: true }) longitude: number,
    @Args('radius', { nullable: true }) radius: number,
    @Args('type', { nullable: true }) type: string,
    @Args('howManyPeople', { nullable: true }) howManyPeople: number,
    @Args('keyword', { nullable: true }) keyword: string,
    @Info() _info,
  ) {
    const filter = await this.placesService.getMediumValues(
      latitude,
      longitude,
      radius,
      type,
      howManyPeople,
    );

    return filter;
  }

  @Query(() => PostsAndCount)
  async places(
    @Args('latitude', { nullable: true }) latitude: number,
    @Args('longitude', { nullable: true }) longitude: number,
    @Args('radius', { nullable: true }) radius: number,
    @Args('minValue', { nullable: true }) minValue: number,
    @Args('maxValue', { nullable: true }) maxValue: number,
    @Args('type', { nullable: true }) type: string,
    @Args('howManyPeople', { nullable: true }) howManyPeople: number,
    @Args('limit', { nullable: true }) limit: number,
    @Args('offset', { nullable: true }) offset: number,
    @Args('keyword', { nullable: true }) keyword: string,
    @Info() _info,
  ): Promise<any> {
    const data = await this.placesService.getPlaces(
      latitude,
      longitude,
      radius,
      type,
      howManyPeople,
      minValue,
      maxValue,
      limit,
      offset,
      keyword
    );

    const places = data.rows;
    return { places, count: data.count };
  }

  @Query((_returns) => Place)
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
