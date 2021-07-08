import React from "react";

export const LoginScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const login = async (param: { username: string; password: string }) => {
    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
      });
      if (res.ok) {
      }
    } catch (error) {
      console.log(`fetch users error, error: ${error}`);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止表单提交默认行为
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type="submit"> 登录</button>
    </form>
  );
};
