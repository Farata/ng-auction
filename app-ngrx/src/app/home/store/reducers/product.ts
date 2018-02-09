import { Product } from '../../../shared/services';
import { ProductActions, ProductActionTypes } from '../actions';


export interface State {
  data: Product[];
  loading: boolean;
  loadingError?: string;
}

const initialState: State = {
  data: [],
  loading: false
};

export function reducer(state = initialState, action: ProductActions): State {
  switch (action.type) {
    case ProductActionTypes.Load: {
      return {
        ...state,
        loading: true,
        loadingError: null
      };
    }

    case ProductActionTypes.LoadSuccess: {
      return {
        ...state,
        data: action.payload.products,
        loading: false,
        loadingError: null
      };
    }

    case ProductActionTypes.LoadFailure: {
      return {
        ...state,
        data: [],
        loading: false,
        loadingError: action.payload.error
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Selectors
 */

export const getData = (state: State) => state.data;
export const getDataLoading = (state: State) => state.loading;
export const getDataLoadingError = (state: State) => state.loadingError;
