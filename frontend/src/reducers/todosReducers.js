import {
  TODO_CREATE_FAIL,
  TODO_CREATE_REQUEST,
  TODO_CREATE_SUCCESS,
  TODO_DELETE_FAIL,
  TODO_DELETE_REQUEST,
  TODO_DELETE_SUCCESS,
  TODO_GET_FAIL,
  TODO_GET_REQUEST,
  TODO_GET_SUCCESS,
  TODO_UPDATE_FAIL,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_SUCCESS,
} from "../constants/todosConst";

export const createTodoReducer = (state = {}, action) => {
  switch (action.type) {
    case TODO_CREATE_REQUEST:
      return { loading: true };
    case TODO_CREATE_SUCCESS:
      return { loading: false, todoData: action.payload };
    case TODO_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateTodoReducer = (state = {}, action) => {
  switch (action.type) {
    case TODO_UPDATE_REQUEST:
      return { loading: true };
    case TODO_UPDATE_SUCCESS:
      return { loading: false, todoData: action.payload };
    case TODO_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteTodoReducer = (state = {}, action) => {
  switch (action.type) {
    case TODO_DELETE_REQUEST:
      return { loading: true };
    case TODO_DELETE_SUCCESS:
      return { loading: false, todoData: action.payload };
    case TODO_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTodosReducer = (
  state = { todoData: { todos: [] } },
  action
) => {
  switch (action.type) {
    case TODO_GET_REQUEST:
      return { loading: true };
    case TODO_GET_SUCCESS:
      return { loading: false, todoData: { todos: action.payload } };
    case TODO_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
