import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../createClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

// login supabase
// const login = (email, password) => {
//     supabase.auth.signInWithPassword({ email, password });
// }

// logout supabase
const logout = () => supabase.auth.signOut();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      setAuth(currentUser ? true : false);

      if (currentUser) {
        getDataUser(currentUser.id);
      } else {
        console.log("Data Empthy");
        setLoading(false);
      }
    };

    getUser();

    const getDataUser = async (userId) => {
      try {
        const { data: userData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId);

        console.log(userData);
        setUsername(userData[0].username);
        setRole(userData[0].role);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
      // setLoading(false)
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, auth, username, role, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
