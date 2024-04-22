import { Entity, LibraryReturn, Resources } from '../utils/response/apiResponse';
import { list, required, Required } from '../utils/response/responseHandlers';
import { RequestParams } from '../utils/params/requestParams';
import BaseApi from '../baseApi';
import { OnboardingStepToUsersUpdate } from './types';

const resourceName = 'onboardingStepToUsers';
type ResourceName = typeof resourceName;

export class OnboardingStepToUserSEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public read(
    params?: RequestParams<Entity<typeof resourceName>> | string,
  ): Promise<LibraryReturn<typeof resourceName, Entity<typeof resourceName>[]>> {
    const response = this._get<typeof resourceName>('read', { params });
    return list(response);
  }

  public update(data: OnboardingStepToUsersUpdate): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._post<ResourceName>('submit', data);
    return required(response);
  }
}
