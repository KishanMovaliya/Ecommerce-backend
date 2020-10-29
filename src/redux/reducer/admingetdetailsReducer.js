import {
  ADMIN_ALL_CATEGORY,
  ADMIN_ALL_PRODUCT,
  ADMIN_ALL_SUB_CATEGORY,
} from "../actions/types";

const initialState = {
  data: null,
  subdata: null,
  productdata: null,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADMIN_ALL_CATEGORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ADMIN_ALL_SUB_CATEGORY:
      return {
        ...state,
        subdata: action.payload,
        loading: false,
      };
    case ADMIN_ALL_PRODUCT:
      return {
        ...state,
        productdata: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
