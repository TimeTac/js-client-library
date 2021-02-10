import { Resources } from '../..';
import { ApiResponse, ApiResponseOnSuccess } from './apiResponse';

export type DeltaSyncResponse<R extends keyof Resources & string> = ApiResponse<{ [r in R]: DeltaSyncResourceResponse<r> }> & {
  ResourceName: 'deltaSync';
};

// It's just ApiResponse for eg. User[] when R is "users". With some properties omitted and ResourceName set to R
export type DeltaSyncResourceResponse<R extends keyof Resources & string> = Omit<
  ApiResponseOnSuccess<Resources[R][], undefined>,
  'Host' | 'Codeversion' | 'RequestStartTime' | 'RequestEndTime' | 'ServerTimeZone'
> & { ResourceName: R };

/*
 The mapping of "users" => User is provided by the Resources type to enable the "users" => Response<User[]> here.
 ResourceName and Results (inner and outer, including keys) are type checked.

 Example for Results:

 ```
 const response: DeltaSyncResponse<'users' | 'tasks'> = {
  Success: true,
  ResourceName: 'deltaSync',
  RequestStartTime: '01-01-2000 00:00:00'
  //...
  NumResults: 5,
  NumResultsNested: 500,
  Results: {
    users: {
      Success: true,
      ResourceName: 'users',
      NumResults: 4,
      NumResultsNested: 4,
      Results: [{} as User],
      // Notice the absence of fields such as RequestStartTime, that's the reason for the Omit<...> above
    },
    tasks: {
      Success: true,
      // ...
      ResourceName: 'tasks',
      Results: [{} as Task],
    },
  },
};
```
*/
