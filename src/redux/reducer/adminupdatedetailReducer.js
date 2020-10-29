import {
  ADMIN_UPDATE_CATEGORY,
  ADMIN_UPDATE_PRODUCT,
  ADMIN_UPDATE_SUB_CATEGORY,
} from "../actions/types";

const initialState = {
  data: null,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADMIN_UPDATE_CATEGORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ADMIN_UPDATE_SUB_CATEGORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case ADMIN_UPDATE_PRODUCT:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
