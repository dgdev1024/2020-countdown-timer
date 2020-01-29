/**
 * @file reducers/use-events-reducer.js
 */

// Imports
import { useReducer } from 'react';

// Initial State
const initialState = [];

// Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return [ ...state, action.payload ];
    case 'REMOVE_EVENT':
      return state.filter((_, index) => index !== action.payload);
    default:
      console.warn(`Event Reducer: Invalid Action - '${action.type}'`);
      return state;
  }
};

// Export
export const useEventsReducer = () => useReducer(reducer, initialState);
