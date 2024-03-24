import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

// const rootReducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });

// const store = createStore(rootReducer);
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  }
});
export default store;
