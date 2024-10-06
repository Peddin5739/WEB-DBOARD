const initialState = {
  isAuthenticated: false,
  userType: null,
  statusCode: null,
  errorMessage: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        userType: action.payload.userType,
        statusCode: action.payload.statusCode,
        errorMessage: null, // Reset error message on success
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        statusCode: action.payload.statusCode,
        errorMessage: action.payload.errorMessage,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        isAuthenticated: false,
        statusCode: action.payload.statusCode,
        errorMessage: action.payload.errorMessage,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        userType: null,
        statusCode: null,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default userReducer;
