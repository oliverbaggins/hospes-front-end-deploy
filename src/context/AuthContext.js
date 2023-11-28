import { createContext, useEffect, useReducer } from "react";

const parseStoredUser = (storedUser) => {
   try {
      return JSON.parse(storedUser) || null;
   } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
   }
};

const updateLocalStorageUser = (user) => {
   localStorage.setItem("user", JSON.stringify(user));
};

const INITIAL_STATE = {
   user: parseStoredUser(localStorage.getItem("user")),
   loading: false,
   error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
   switch (action.type) {
      case "loginStart":
         return {
            user: null,
            loading: true,
            error: null,
         };
      case "loginSuccess":
         return {
            user: action.payload,
            loading: false,
            error: null,
         };
      case "loginFailure":
         return {
            user: null,
            loading: false,
            error: action.payload,
         };
      case "logout":
         return {
            user: null,
            loading: false,
            error: null,
         };
      default:
         return state;
   }
};

export const AuthContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

   useEffect(() => {
      updateLocalStorageUser(state.user);
   }, [state.user]);

   return (
      <AuthContext.Provider
         value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            dispatch,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
