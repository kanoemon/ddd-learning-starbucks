import { ErrorResponse } from "./ErrorResponse";
export type UseCaseResponse<T> = T | ErrorResponse;
