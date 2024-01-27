import './users.css'
import { useGetAllUserQuery } from '../../redux/api/userApiSlice'
import FollowCard from '../../components/FollowCard/FollowCard';

import Loader from '../../components/Loader/Loader';
import CustomToaster from '../../components/CustomToaster/CustomToaster';


const Users = () => {

  const { data: users, isLoading } = useGetAllUserQuery();


  return (
    <div className='container'>
       <CustomToaster />
      <div className='users-section flex-column-center scale-up-center'>
        { isLoading ? ( <Loader />) : users?.map((user) => {
          return <FollowCard key={user._id} user={user}/>
        })}
      </div>
    </div>
  )
}

export default Users