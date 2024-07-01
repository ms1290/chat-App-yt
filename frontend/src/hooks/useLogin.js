import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext.jsx";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    setLoading(true);
    const success = handleInputErrors({ username, password });
    if (!success) {
      setLoading(false); // Ensure loading is set to false if there are input errors
      return;
    }
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login }; 
};

function handleInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error('Please fill in all fields');
    return false;
  }
  return true;
}

export default useLogin;