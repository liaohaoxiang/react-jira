import { useState, useEffect } from "react"
import qs from 'qs';

import { cleanObject, useMount, useDebounce } from '../../utils/index';
import {SearchPanel} from './search-panel'
import {List} from './list';

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  
  const debouncedparam = useDebounce(param, 1000) // 自定义hook

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedparam))}`).then(async (res) => {
      if(res.ok) {
        setList(await res.json())
      }
    })
  }, [debouncedparam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if(res.ok) {
        setUsers(await res.json())
      }
    })
  })
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}/>
    <List users={users} list={list}/>
  </div>
}