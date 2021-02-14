import { DrinkId, Drink, DrinkRepository, DrinkPrice } from "../../domain/model/drinks";
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
          this.toHash(drink.drinkPrices)
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

  private toHash(drinkPrices: DrinkPrice[]): {size: string, price: number}[] {
    let hashArray = [];
    for(const drinkPrice of drinkPrices) {
      hashArray.push({
        size: drinkPrice.drinkSize.size,
        price: drinkPrice.menuPrice.price
      })
    }
    return hashArray;
  }
}
