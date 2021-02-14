import { Drink, DrinkId, DrinkRepository, DrinkService, DrinkSize } from "../../domain/model/drinks";
import { SaveDrinkUseCaseResponse } from "./SaveDrinkUseCaseResponse";
import { ErrorResponse } from "../ErrorResponse";
import { SaveDrinkUseCaseRequest } from "./SaveDrinkUseCaseRequest";
import { UseCaseResponse, UseCaseSuccessResponse, UseCaseErrorResponse } from "../UseCaseResponse";
import { MenuPrice } from "../../domain/model/MenuPrice";

export class SaveDrinkUseCase {
  private _drinkRepository;
  private _drinkService;

  constructor(drinkRepository: DrinkRepository) {
    this._drinkRepository = drinkRepository;
    this._drinkService = new DrinkService(drinkRepository);
  }

  handle(request: SaveDrinkUseCaseRequest): UseCaseResponse<SaveDrinkUseCaseResponse, ErrorResponse> {
    try {
      const drinkId: DrinkId = this._drinkRepository.nextIdentity();
      const drink: Drink = this.newDrink(
        drinkId,
        request.name,
        request.prices
      );

      if (this._drinkService.exists(drink)) {
        throw new Error('already exists');
      }

      this._drinkRepository.save(drink);

      return new UseCaseSuccessResponse(
        new SaveDrinkUseCaseResponse(drink.drinkId.id)
      );
    } catch(e) {
      const errorResponse = new ErrorResponse();
      errorResponse.addMessage(e)
      return new UseCaseErrorResponse(
        errorResponse
      );
    }
  }

  private newDrink(drinkId: DrinkId, name: string, prices: {size: string, price: number}[]): Drink {
    const drink: Drink = new Drink(
      drinkId,
      name
    );

    for(const price of prices) {
      drink.registerPrice(
        new DrinkSize(price.size),
        new MenuPrice(price.price)
      );
    }
    return drink;
  }
}
