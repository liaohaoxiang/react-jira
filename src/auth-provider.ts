// 可以用firebase等第三方auth服务
import { User } from "screens/project-list/search-panel";
const localStorageKey = "__auth_provider_token__";
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = async (data: { username: string; password: string }) => {
  try {
    const res = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      return Promise.reject(data);
    }
    return handleUserResponse(await res.json());
  } catch (e) {
    console.log(`fetch users error, error: ${e}`);
    return Promise.reject(data);
  }
};

export const register = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const res = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      return Promise.reject(data);
    }
    return handleUserResponse(await res.json());
  } catch (e) {
    console.log(`fetch users error, error: ${e}`);
    return Promise.reject(e);
  }
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
