import {
  ADMIN_SINGLE_CATEGORY,
  ADMIN_SUB_FROM_CATEGORY,
} from "../actions/types";

const initialState = {
  data: null,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADMIN_SINGLE_CATEGORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case ADMIN_SUB_FROM_CATEGORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
