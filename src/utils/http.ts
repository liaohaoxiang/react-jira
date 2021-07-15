import qs from "qs";
import * as auth from "../auth-provider";
import { useAuth } from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string | undefined;
  data?: object;
}

/**
 *
 * @param url 传入的请求url
 * @param param1 传入的Config对象,包含token和data
 * @returns
 */
export const http = async (
  url: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET", // 默认为GET, 如果customConfig如果传入method会覆盖
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  // 如果请求为get,加到querystring里
  if (config.method.toUpperCase() === "GET") {
    // data对象不为空时,加入?
    if (data && Object.keys(data).length !== 0) {
      url += `?${qs.stringify(data)}`;
    }
  } else {
    // 不然加在request.body里
    config.body = JSON.stringify(data || null);
  }
  // ferch API
  try {
    const res = await window.fetch(`${apiUrl}/${url}`, config);
    // 打印进度
    loggerProgress(url, res.clone()); // Response类型只可以读一次,clone一个副本打印
    // Fetch响应2xx以外状态码不会报错,需要手动reject
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    if (res.ok) {
      return await res.json();
    } else {
      return Promise.reject(data);
    }
  } catch (e) {
    console.log(`Fetch Error, e = ${e}`);
    Promise.reject(e);
  }
};

export const useHttp = () => {
  const { user } = useAuth();
  // TODO Parameters用法
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, {
      ...config,
      token: user?.token,
    });
};

const loggerProgress = async (url: string, res: Response) => {
  const reader = (res.body as ReadableStream<Uint8Array>).getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    console.log(`FetchAPI | 接口${url} 接收到 ${value?.length} bytes`);
  }
};
