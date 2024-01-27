import './users.css'
import { useGetAllUserQuery } from '../../redux/api/userApiSlice'

const Users = () => {

  const { data, error } = useGetAllUserQuery();
  console.log(data)
  console.error(error)

  return (
    <div>Users</div>
  )
}

export default Users