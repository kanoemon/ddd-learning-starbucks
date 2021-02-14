import { DrinkId, Drink, DrinkRepository, DrinkSize } from "../../domain/model/drinks";
import { UpdateDrinkUseCaseResponse } from "./UpdateDrinkUseCaseResponse";
import { ErrorResponse } from "../ErrorResponse";
import { UpdateDrinkUseCaseRequest } from "./UpdateDrinkUseCaseRequest";
import { UseCaseResponse, UseCaseSuccessResponse, UseCaseErrorResponse } from "../UseCaseResponse";
import { MenuPrice } from "../../domain/model/MenuPrice";

export class UpdateDrinkUseCase {
  private _drinkRepository;

  constructor(drinkRepository: DrinkRepository) {
    this._drinkRepository = drinkRepository;
  }

  handle(request: UpdateDrinkUseCaseRequest): UseCaseResponse<UpdateDrinkUseCaseResponse, ErrorResponse> {
    try {
      const drink: Drink | null = this._drinkRepository.findById(
        new DrinkId(request.id)
      );
      
      if (drink === null) throw new Error('not found');

      if (request.name) drink.changeName(request.name);
      if (request.prices) {
        for (const price of request.prices) {
          drink.registerPrice(
            new DrinkSize(price.size),
            new MenuPrice(price.price)
          );
        }
      }

      this._drinkRepository.save(drink);

      return new UseCaseSuccessResponse(
        new UpdateDrinkUseCaseResponse(drink.drinkId.id)
      );
    } catch(e) {
      console.log(e);
      const errorResponse = new ErrorResponse();
      errorResponse.addMessage(e)
      return new UseCaseErrorResponse(
        errorResponse
      );
    }
  }
}
