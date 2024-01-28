import './profile.css'
import ProfileCard from '../../components/ProfileCard.jsx/ProfileCard'
import ActivityCard from '../../components/ActivityCard/ActivityCard'


const Profile = () => {

  return (
    <div className='container'>
      <div className='profile-section flex-column-center scale-up-center'>
        <ProfileCard />
        <ActivityCard />
      </div>
    </div>
  )
}

export default Profile