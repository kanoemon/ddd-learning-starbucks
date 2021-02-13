import { DrinkId } from "../../domain/model/DrinkId";
import { Drink } from "../../domain/model/Drink";
import { DrinkRepository } from "../../domain/model/DrinkRepository";
import { GetDrinkDetailUseCaseResponse } from "./GetDrinkDetailUseCaseResponse";
import { ErrorResponse } from "../ErrorResponse";
import { GetDrinkDetailUseCaseRequest } from "./GetDrinkDetailUseCaseRequest";
import { UseCaseResponse, UseCaseSuccessResponse, UseCaseErrorResponse } from "../UseCaseResponse";

export class GetDrinkDetailUseCase {
  private _drinkRepository;

  constructor(drinkRepository: DrinkRepository) {
    this._drinkRepository = drinkRepository;
  }

  handle(request: GetDrinkDetailUseCaseRequest): UseCaseResponse<GetDrinkDetailUseCaseResponse, ErrorResponse> {
    try {
      const drinkId: DrinkId = new DrinkId(request.id);   
      const drink: Drink | null = this._drinkRepository.findById(drinkId);
      if (drink === null) {
        throw new Error('drink not found');
      }

      return new UseCaseSuccessResponse(
        new GetDrinkDetailUseCaseResponse(
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
