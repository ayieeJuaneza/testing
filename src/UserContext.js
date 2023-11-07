import React from "react";

// Create a context object
const UserContext = React.createContext();

// The "Provider" component allows other components to consume or use the context
export const UserProvider = UserContext.Provider;

export default UserContext;