// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../conf/supabaseClient';

const AuthContext = createContext({});


/**
 * Authentication Provider
 * Manages user authentication state with Supabase
 * Supports: Email/Password, Google OAuth
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session on mount
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        // Silently fail if session check errors
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  /**
   * Sign up with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password (min 6 chars)
   * @returns {Promise} Supabase auth response
   */
  const signUp = (email, password) => 
    supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: window.location.origin
      }
    });

  /**
   * Sign in with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise} Supabase auth response
   */
  const signIn = (email, password) => 
    supabase.auth.signInWithPassword({ email, password });

  /**
   * Sign in with OAuth provider (Google, GitHub, etc.)
   * @param {string} provider - OAuth provider name ('google', 'github')
   * @returns {Promise} Supabase auth response
   */
  const signInWithProvider = (provider) => {
    return supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  };

  /**
   * Sign out current user
   * @returns {Promise} Supabase auth response
   */
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithProvider,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to access authentication context
 * @returns {Object} Auth context value
 * @throws {Error} If used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
