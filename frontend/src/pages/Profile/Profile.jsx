import './profile.css'
import ProfileCard from '../../components/ProfileCard.jsx/ProfileCard'

const Profile = () => {
  return (
    <div className='container'>
      <div className='profile-section flex-column-center scale-up-center'>
        <ProfileCard />
      </div>
    </div>
  )
}

export default Profile