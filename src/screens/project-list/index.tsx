import { useState, useEffect } from "react";
// import qs from "qs";

import { cleanObject, useMount, useDebounce } from "../../utils/index";
import { useHttp } from "../../utils/http";
import { SearchPanel } from "./search-panel";
import { List } from "./list";

// const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  const client = useHttp();
  const debouncedparam = useDebounce(param, 500); // 自定义hook

  // Mount生命周期
  useMount(async () => {
    client("users").then(setUsers);
    // 获取users
    // try {
    //   const res = await fetch(`${apiUrl}/users`);
    //   if (res.ok) {
    //     return setUsers(await res.json());
    //   }
    // } catch (error) {
    //   console.log(`fetch users error, error: ${error}`);
    // }
  });

  // 请求List
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedparam) }).then(setList);
    // useEffect不可直接用async,只能这样调用
    // const fetchData = async () => {
    //   const querystring = cleanObject(debouncedparam);
    //   const res = await fetch(
    //     `${apiUrl}/projects?${qs.stringify(querystring)}`
    //   );
    //   if (res.ok) {
    //     setList(await res.json());
    //   }
    // };
    // fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedparam]);
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
