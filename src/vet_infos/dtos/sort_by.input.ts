import { Field, InputType, registerEnumType } from '@nestjs/graphql';

@InputType()
export class SortByInput {
  @Field(() => SORT_BY)
  sortBy: SORT_BY;

  @Field(() => Number,{nullable:true})
  lat?: number;

  @Field(() => Number,{nullable:true})
  lng?: number;
}

enum SORT_BY {
  DISTANCE = 'DISTANCE',
  DURATION = 'DURATION',
  RATINGS = 'RATINGS',
  EXPERIENCE = 'EXPERIENCE',
  LASTNAME = 'LASTNAME',
}

registerEnumType(SORT_BY, {
  name: 'SORT_BY',
});
