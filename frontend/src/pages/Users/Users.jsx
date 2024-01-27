import './users.css'
import { useGetAllUserQuery } from '../../redux/api/userApiSlice'
import FollowCard from '../../components/FollowCard/FollowCard';

import Loader from '../../components/Loader/Loader';
import CustomToaster from '../../components/CustomToaster/CustomToaster';
import { useEffect, useState } from 'react';


const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const { data: newUsers, isLoading } = useGetAllUserQuery(page);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const scrollTop = e.target.documentElement.scrollTop;


      if (innerHeight + scrollTop >= scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page])

  useEffect(() => {
    setUsers((prevUsers) => [...prevUsers, ...(newUsers || [] )])
  }, [newUsers])


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