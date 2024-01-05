
import Sidebar from '../../component/admin/adminHome/Sidebar'
import  {ProfileCard}  from '../../component/admin/AdminProfile'

function AdminProfilePage() {
  return (
    <div className='flex'>
      <Sidebar/>
      <ProfileCard/>
    </div>
  )
}

export default AdminProfilePage
