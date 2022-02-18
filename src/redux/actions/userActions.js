import {
  deleteAUser,
  getUsers,
  loginUser,
  registerUser,
  updateAUser,
  userDetails,
  userUpdateProfile,
} from "../../services/userServices";
import actionsTypes from "./actionsTypes";

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.USER_LOGIN_REQUEST,
      });
      const data = await loginUser(email, password);
      dispatch({
        type: actionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: actionTypes.USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: actionTypes.USER_LOGIN_LOGOUT });
    dispatch({ type: actionTypes.USER_DETAILS_RESET });
    dispatch({ type: actionTypes.ORDER_LIST_MY_RESET });
    dispatch({ type: actionTypes.USER_LIST_RESET });
  };
};

export const register = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.USER_REGISTER_REQUEST,
      });
      const data = await registerUser(name, email, password);
      dispatch({
        type: actionTypes.USER_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch({
        type: actionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: actionTypes.USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getUserDetails = (endpoint) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.USER_DETAILS_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const data = await userDetails(endpoint, userInfo);
      dispatch({
        type: actionTypes.USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: actionTypes.USER_DETAILS_FAIL,
        payload: message,
      });
    }
  };
};

export const updateUserProfile = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.USER_UPDATE_PROFILE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const data = await userUpdateProfile(user, userInfo);
      dispatch({
        type: actionTypes.USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: actionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: actionTypes.USER_UPDATE_PROFILE_FAIL,
        payload: message,
      });
    }
  };
};

export const listUsers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.USER_LIST_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const data = await getUsers(userInfo);
      dispatch({
        type: actionTypes.USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: actionTypes.USER_LIST_FAIL,
        payload: message,
      });
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.USER_DELETE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      await deleteAUser(id, userInfo);
      dispatch({
        type: actionTypes.USER_DELETE_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: actionTypes.USER_DELETE_FAIL,
        payload: message,
      });
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.USER_UPDATE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const data = await updateAUser(user, userInfo);
      dispatch({
        type: actionTypes.USER_UPDATE_SUCCESS,
      });
      dispatch({ type: actionTypes.USER_DETAILS_SUCCESS, payload: data });
      dispatch({ type: actionTypes.USER_DETAILS_RESET });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: actionTypes.USER_UPDATE_FAIL,
        payload: message,
      });
    }
  };
};
