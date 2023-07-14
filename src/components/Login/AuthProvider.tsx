import { useEffect, useState, createContext, ReactNode } from "react";
import { Session, Subscription } from "@supabase/supabase-js";
import supabase from "../../supabase/supabase";
import useSnackBar from "../shared/hooks/useSnackBar";

interface AuthContextType {
  user: any; // Reemplaza 'any' con el tipo adecuado para tu usuario
  signIn: (credentials: {
    email: string;
    password: string;
    setIsAlertActive: React.Dispatch<React.SetStateAction<boolean>>;
    setAlertMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  }) => Promise<void>;
  signUp: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (credentials: { email: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const { openSnackBar } = useSnackBar();
  let authListener: Subscription | null = null;

  useEffect(() => {
    authListener = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe;
    };
  }, []);

  const signIn = async ({
    email,
    password,
    guest = false,
    setIsAlertActive,
    setAlertMessage,
  }: {
    email: string;
    password: string;
    guest?: boolean;
    setIsAlertActive: React.Dispatch<React.SetStateAction<boolean>>;
    setAlertMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  }) => {
    if (guest) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Error signing in as guest:", error.message);
      }
    } else {
      // Inicio de sesión normal
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setIsAlertActive(true);
        console.log(error);
        setAlertMessage(error.message);
        setTimeout(() => {
          setIsAlertActive(false);
        }, 6000);
      } else {
        openSnackBar("success", "Has iniciado sesión correctamente");
      }
    }
  };

  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Error signing up:", error.message);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const resetPassword = async ({ email }: { email: string }) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "/",
    });
    if (error) {
      console.error("Error resetting password:", error.message);
    }
  };

  const authContextValue: AuthContextType = {
    user,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
