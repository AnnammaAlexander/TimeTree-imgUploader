import { MembersTable } from "../../component/admin/UserDetails"
import Sidebar from "../../component/admin/adminHome/Sidebar"

function AdminUserDetails() {
  return (
    <div className=" ">
      <Sidebar/>
      <MembersTable/>
    </div>
  )
}

export default AdminUserDetails
