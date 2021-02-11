import { DrinkId } from "../../domain/model/DrinkId";
import { Drink } from "../../domain/model/Drink";
import { DrinkRepository } from "../../domain/model/DrinkRepository";
import { GetDrinkMenuDetailUseCaseResponse } from "./GetDrinkMenuDetailUseCaseResponse";
import { ErrorResponse } from "../ErrorResponse";
import { GetDrinkMenuDetailUseCaseRequest } from "./GetDrinkMenuDetailUseCaseRequest";
import { UseCaseResponse, UseCaseSuccessResponse, UseCaseErrorResponse } from "../UseCaseResponse";

export class GetDrinkMenuDetailUseCase {
  private _drinkRepository;

  constructor(drinkRepository: DrinkRepository) {
    this._drinkRepository = drinkRepository;
  }

  handle(request: GetDrinkMenuDetailUseCaseRequest): UseCaseResponse<GetDrinkMenuDetailUseCaseResponse, ErrorResponse> {
    try {
      const drinkId: DrinkId = new DrinkId(request.id);   
      const drink: Drink | null = this._drinkRepository.findById(drinkId);
      if (drink === null) {
        throw new Error('drink not found');
      }

      return new UseCaseSuccessResponse(
        new GetDrinkMenuDetailUseCaseResponse(
          drink.drinkId.id,
          drink.name,
          drink.size
        )
      );
    } catch(e) {
      const errorResponse = new ErrorResponse();
      errorResponse.addMessage(e)
      return new UseCaseErrorResponse(
        errorResponse
      );
    }
  }
}
