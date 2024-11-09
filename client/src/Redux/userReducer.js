// userReducer.js

const initialState = {
  isAuthenticated: false,
  userData: null, // Store full user data here
  statusCode: null,
  errorMessage: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload.userData, // Save full user data from payload
        statusCode: action.payload.statusCode,
        errorMessage: null, // Reset error message on success
      };
    case "LOGIN_FAILURE":
    case "LOGIN_ERROR":
      return {
        ...state,
        isAuthenticated: false,
        userData: null, // Clear user data on failure
        statusCode: action.payload.statusCode,
        errorMessage: action.payload.errorMessage,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        userData: null, // Clear user data on logout
        statusCode: null,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default userReducer;
