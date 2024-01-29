import './profile.css'
import ProfileCard from '../../components/ProfileCard.jsx/ProfileCard'
import ActivityCard from '../../components/ActivityCard/ActivityCard'
import CustomToaster from '../../components/CustomToaster/CustomToaster'


const Profile = () => {

  return (
    <div className='container'>
      <CustomToaster />
      <div className='profile-section flex-column-center scale-up-center'>
        <ProfileCard />
        <ActivityCard />
      </div>
    </div>
  )
}

export default Profile