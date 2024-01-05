import { PencilIcon,  } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  
  Typography,
  Button,
  CardBody,
  
  CardFooter,
  
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../API/apiAdminConnection";

 
const TABLE_HEAD = ["Member", "Mobile Number", "ExpairyDaa", "UploadTask", ""];
 
// const TABLE_ROWS = []
 
 
export function MembersTable() {

    const [userData,setUserData] = useState([])



async function dataFectch(){
        const response = await getUserDetails()
        // console.log(response);
        setUserData(response)
}
useEffect(()=>{
    dataFectch();
},[])




    const navigate = useNavigate()
  return (
    <Card className="h-screen w-[calc(100vw-17rem)] fixed right-0  bg-cyan-50">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className=" flex items-center justify-between bg-cyan-50">
          <div className="m-auto">
            <Typography variant="h5" color="blue-gray">
              Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
        {/* <div className="flex flex-col items-center justify-end  md:flex-row">
          
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div> */}
    </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            { userData && userData.map(
              ({ dp, name, email,phonenumber, createdAt,_id }, index) => {
                const isLast = index === userData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={dp? dp:"https://docs.material-tailwind.com/img/face-2.jpg"} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray" 
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {phonenumber}
                        </Typography>
                       
                      </div>
                    </td>
                    
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {createdAt}
                      </Typography>
                    </td>
                    <td onClick={()=>{navigate(`/imgupload/${_id}`)}} className={classes}>
                      <Tooltip content="Upload Image">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}