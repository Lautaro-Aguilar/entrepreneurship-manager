import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import supabase from "../../supabase/supabase";

function Login() {
  const authContext = useContext(AuthContext);

  const handleSignIn = async () => {
    await authContext?.signIn({
      email: "metew84206@meogl.com",
      password: "aliciaines123",
    });
  };

  const createPolicy = async (
    table: string,
    role: string,
    permissions: string[]
  ) => {
    const { data, error } = await supabase.rpc("create_policy", {
      table,
      role,
      permissions,
    });

    if (error) {
      console.error("Error al crear la política:", error);
      return null;
    }

    return data;
  };

  // Ejemplo de uso para crear una política
  const createExamplePolicy = async () => {
    const table = "clientes";
    const roleUser = "user";
    const roleAdmin = "administrador";
    const userPermissions = ["select"];
    const adminPermissions = ["select", "insert", "update", "delete"];

    // Crear la política para el rol "user"
    await createPolicy(table, roleUser, userPermissions);

    // Crear la política para el rol "administrador"
    await createPolicy(table, roleAdmin, adminPermissions);

    console.log("Políticas creadas exitosamente");
  };

  console.log(authContext);
  const handleSignOut = async () => {
    await authContext?.signOut();
  };

  const handleRegister = async () => {
    await authContext?.signUp({
      email: "metew84206@meogl.com",
      password: "aliciaines123",
    });
  };

  const handleResetPassword = async () => {
    await authContext?.resetPassword({ email: "supanonymo1@gmail.com" });
  };

  return (
    <div>
      {authContext?.user ? (
        <div>
          <p>Usuario: {authContext?.user.email}</p>
          <button onClick={handleSignOut}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <p>No hay sesión activa</p>
          <button onClick={handleSignIn}>Iniciar sesión</button>
        </div>
      )}
      <div>
        <button onClick={handleRegister}>Registrarse</button>
      </div>
      <div>
        <button onClick={handleResetPassword}>Restaurar Contraseña</button>
        <button onClick={createExamplePolicy}>a</button>
      </div>
    </div>
  );
}

export default Login;
