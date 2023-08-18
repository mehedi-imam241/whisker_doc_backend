import { Field, InputType,registerEnumType } from '@nestjs/graphql';

@InputType()
export class SortByInput {
    @Field(() => SORT_BY)
    sortBy: SORT_BY;
}


enum  SORT_BY {
    DISTANCE = 'DISTANCE',
    DURATION = 'DURATION',
  }
  
  registerEnumType(SORT_BY, {
    name: 'SORT_BY',
  });
  