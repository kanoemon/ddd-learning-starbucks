import { DrinkId } from "../../domain/model/DrinkId";
import { Drink } from "../../domain/model/Drink";
import { DrinkRepository } from "../../domain/model/DrinkRepository";
import { UpdateDrinkUseCaseResponse } from "./UpdateDrinkUseCaseResponse";
import { ErrorResponse } from "../ErrorResponse";
import { UpdateDrinkUseCaseRequest } from "./UpdateDrinkUseCaseRequest";
import { UseCaseResponse, UseCaseSuccessResponse, UseCaseErrorResponse } from "../UseCaseResponse";

export class UpdateDrinkUseCase {
  private _drinkRepository;

  constructor(drinkRepository: DrinkRepository) {
    this._drinkRepository = drinkRepository;
  }

  handle(request: UpdateDrinkUseCaseRequest): UseCaseResponse<UpdateDrinkUseCaseResponse, ErrorResponse> {
    try {
      const drinkId: DrinkId = new DrinkId(request.id);
      const drink: Drink | null = this._drinkRepository.findById(drinkId);
      
      if (drink === null) throw new Error('not found');

      drink.changeName(request.name);

      this._drinkRepository.save(drink);

      return new UseCaseSuccessResponse(
        new UpdateDrinkUseCaseResponse(
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
