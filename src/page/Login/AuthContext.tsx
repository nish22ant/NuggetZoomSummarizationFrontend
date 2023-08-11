import React, { createContext, useState, ReactNode } from "react";

/**
 * Interface representing user data fields.
 *
 * @interface
 * @property {string} _id - User's unique identifier.
 * @property {string} firstName - User's first name.
 * @property {string} lastName - User's last name.
 * @property {string} email - User's email address.
 * @property {any} [otherField] - Other user data fields as needed.
 */
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  // Add other user data fields as needed
}

/**
 * Interface defining the properties of the authentication context.
 *
 * @interface
 * @property {User | null} user - User object or null if not logged in.
 * @property {boolean} isLoggedIn - Indicates if the user is logged in.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoggedIn - Setter function to update isLoggedIn.
 * @property {React.Dispatch<React.SetStateAction<User | null>>} setUser - Setter function to update the user.
 * @property {string | null} token - User token or null if not logged in.
 * @property {React.Dispatch<React.SetStateAction<string | null>>} setToken - Setter function to update the token.
 */
export interface AuthContextProps {
  user: User | null;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null; // New token property
  setToken: React.Dispatch<React.SetStateAction<string | null>>; // New setToken property
}

/**
 * Context for managing authentication-related state.
 *
 * This context provides user data, login status, and token information to the components.
 *
 * @context
 * @type {React.Context<AuthContextProps>}
 */
export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  setUser: () => {},
  token: null, // Initialize token as null
  setToken: () => {}, // Initialize setToken as an empty function
});

/**
 * Provider component for the AuthContext.
 *
 * This component wraps the application with the AuthContext, providing authentication state to child components.
 *
 * @component
 * @param {AuthProviderProps} props - Props containing child components.
 * @returns {JSX.Element} - JSX element wrapping the child components with AuthContext.
 */
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null); // Initialize token state

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, setIsLoggedIn, setUser, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
