import UserSidebar from "../../component/user/Home/UserSidebar"
import { ProjectFiles } from "../../component/user/ProjectFiles"
// import Project from "../../component/user/Project"

function ProjectUser() {
  return (
    <div >
      <UserSidebar/>
      {/* <Project/> */}
      <ProjectFiles/>
    </div>
  )
}

export default ProjectUser
