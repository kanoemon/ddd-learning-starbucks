import { DrinkId } from "../../domain/model/DrinkId";
import { Drink } from "../../domain/model/Drink";
import { DrinkRepository } from "../../domain/model/DrinkRepository";
import { SaveDrinkUseCaseResponse } from "./SaveDrinkUseCaseResponse";
import { ErrorResponse } from "../ErrorResponse";
import { SaveDrinkUseCaseRequest } from "./SaveDrinkUseCaseRequest";
import { UseCaseResponse, UseCaseSuccessResponse, UseCaseErrorResponse } from "../UseCaseResponse";
import { DrinkService } from "../../domain/model/DrinkService";
import { Size } from "../../domain/model/Size";

export class SaveDrinkUseCase {
  private _drinkRepository;
  private _drinkService;

  constructor(drinkRepository: DrinkRepository) {
    this._drinkRepository = drinkRepository;
    this._drinkService = new DrinkService(drinkRepository);
  }

  handle(request: SaveDrinkUseCaseRequest): UseCaseResponse<SaveDrinkUseCaseResponse, ErrorResponse> {
    try {
      const drinkId: DrinkId = this._drinkRepository.nextIdentifier();
      const drink: Drink = new Drink(
        drinkId,
        request.name,
        'short'
      );

      if (this._drinkService.exists(drink)) {
        throw new Error('already exists');
      }

      this._drinkRepository.save(drink);

      return new UseCaseSuccessResponse(
        new SaveDrinkUseCaseResponse(
          drink.drinkId.id, 
          drink.name,
          'short'
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
