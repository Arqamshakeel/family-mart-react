import CartBadgeReducer from "./CartBadgeReducer";
import OrderBadgeReducer from "./OrderBadgeReducer";
import { combineReducers } from "redux";

export default combineReducers({
  counter: CartBadgeReducer,
  order: OrderBadgeReducer,
});
