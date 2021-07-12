/**
 * 登录后的界面
 */
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div className="App">
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  );
};
