import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
    Button,
    Dialog,
    DialogHeader,
    
    DialogFooter,
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

// import { Avatar } from "@material-tailwind/react";

import { Link } from "react-router-dom";
import { setAdminLogOut } from "../../../redux/adminSlice";
function Sidebar() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open); //sign out function

    const navigate =useNavigate()
    const dispatch = useDispatch()
    const logout =()=>{
        handleOpen()
    }
        // dispatch(setLogOut())
     const handleLogout = ()=>{
            dispatch(setAdminLogOut())
            handleOpen();
                navigate("/admin")

        
    }
  return (
    <Card className="h-screen fixed z-50 p-4 shadow-xl bg-blue-gray-100 ">
      <div className="flex  gap-5  m-6">
        {/* <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="lg" /> */}
        <Typography
          variant="h5"
          color="blue-gray"
          className="text-2xl font-bold mt-3"
        >
          Admin
        </Typography>
      </div>

      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/admin">Home</Link>
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/adminprofile">Profile</Link>
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/userlist">Users</Link>
        </ListItem>
        <ListItem onClick={logout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>






      <Dialog open={open} size="xs" handler={handleOpen}>
            <div className="flex flex-col justify-center items-center mt-3">

        <DialogHeader>Do you want to logout ?</DialogHeader>
       
            </div>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleLogout}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

    </Card>
  );
}

export default Sidebar;
