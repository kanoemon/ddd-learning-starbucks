export type UseCaseResponse<T, E> = UseCaseSuccessResponse<T, E> | UseCaseErrorResponse<T, E>;

export class UseCaseSuccessResponse<T, E> {
  readonly response: T;

  constructor(response: T) {
    this.response = response;
  }

  fail(): this is UseCaseErrorResponse<T, E>{
    return false;
  }
}

export class UseCaseErrorResponse<T, E> {
  readonly response: E;

  constructor(response: E) {
    this.response = response;
  }

  fail(): this is UseCaseErrorResponse<T, E>{
    return true;
  }
}
