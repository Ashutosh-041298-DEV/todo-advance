import { getLocalData, saveLocalData } from "../../utils/localStorage";
import * as types from "./actionTypes";

const initState = {
  isAuth:getLocalData("token") ? true : false,
  token: getLocalData("token") || "",
  isLoading: false,
  isError: false,
};

const reducer = (state = initState, { type, payload }) => {
  switch (type) {
      case types.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case types.LOGIN_SUCCESS:
      saveLocalData("token",payload)
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload,
      };

    case types.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isAuth: false,
        token: "",
      };

    default: {
      return state;
    }
  }
};

export { reducer };
