import {
  GET_RECIPES,
  GET_DIETS,
  ORDER_BY_NAME,
  ORDER_BY_HEALTH_SCORE,
  ERROR_HANDLER,
  GET_RECIPES_NAME,
  FILTER_BY_DIETS,
  FILTER_BY_CREATOR,
  GET_RECIPE_ID,
  CREATE_RECIPE,
} from "./action-types";
import axios from "axios";


// axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.baseURL = 'https://cook-fast-app-api-production.up.railway.app'

export const getRecipes = () => async (dispatch) => {
  try {
    const response = await axios.get("/recipes");
    return dispatch({
      type: GET_RECIPES,
      payload: response.data,
    });
  } catch (error) {
    dispatch(errorHandler(error)); // set as 'true' a property named 'error' in the store until another action change it
  }
};

export const getRecipesByName = (recipeName) => async (dispatch) => {
  try {
    const response = await axios.get(
      `/recipes?name=${recipeName}`
    );
    return dispatch({
      type: GET_RECIPES_NAME,
      payload: response.data,
    });
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const getRecipeById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/recipes/${id}`);
    return dispatch({
      type: GET_RECIPE_ID,
      payload: response.data,
    });
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const getDiets = () => async (dispatch) => {
  try {
    const response = await axios.get("/diets");
    return dispatch({
      type: GET_DIETS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const createRecipe = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "/recipes",
      formData
    );
    return dispatch({
      type: CREATE_RECIPE,
      payload: response.data,
    });
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const filterByDiets = (diets) => {
  return { type: FILTER_BY_DIETS, payload: diets };
};

export const filterByCreator = (creator) => {
  return { type: FILTER_BY_CREATOR, payload: creator };
};

export const orderByName = (orderType) => {
  return { type: ORDER_BY_NAME, payload: orderType };
};

export const orderByHealthScore = (orderType) => {
  return { type: ORDER_BY_HEALTH_SCORE, payload: orderType };
};

const errorHandler = (err) => {
  return { type: ERROR_HANDLER, payload: err.message };
};
