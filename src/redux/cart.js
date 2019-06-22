import localForage from 'localforage';
import { persistReducer } from 'redux-persist';

export const ADD_ITEMS_TO_CART = 'ADD_ITEMS_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const addItemsToCart = items => ({ type: ADD_ITEMS_TO_CART, payload: items });
export const removeItemFromCart = idx => ({ type: REMOVE_ITEM_FROM_CART, payload: idx });
export const clearCart = () => ({ type: CLEAR_CART });

const initState = {
  items: [],
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_ITEMS_TO_CART: {
      const cartItems = [...state.items];
      let cartItemIndex = -1;

      if (action.payload.item.partId) {
        cartItemIndex = cartItems.findIndex(el => el.item.partId === action.payload.item.partId);
      } else {
        cartItemIndex = cartItems.findIndex(el => el.item.id === action.payload.item.id);
      }

      if (cartItemIndex !== -1) cartItems[cartItemIndex].amount += action.payload.amount;
      else cartItems.push(action.payload);
      return { ...state, items: cartItems };
    }

    case REMOVE_ITEM_FROM_CART:
      return { ...state,
        items: [
          ...state.items.slice(0, action.payload),
          ...state.items.slice(action.payload + 1),
        ] };

    case CLEAR_CART:
      return { ...state, items: [] };

    default:
      return state;
  }
};

export default persistReducer({
  key: 'cart',
  storage: localForage,
}, cartReducer);
