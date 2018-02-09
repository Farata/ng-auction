import { CategoryActions, CategoryActionTypes } from '../actions';


export interface State {
  data: string[];
}

const initialState: State = {
  data: []
};

export function reducer(state = initialState, action: CategoryActions): State {
  switch (action.type) {
    case CategoryActionTypes.Load: {
      return {
        ...state
      };
    }

    case CategoryActionTypes.LoadSuccess: {
      return {
        ...state,
        data: action.payload.categories
      };
    }

    default: {
      return state;
    }
  }
}

export const getData = (state: State) => state.data;
