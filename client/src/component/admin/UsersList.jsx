import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
//   import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
} from "@material-tailwind/react";
import { toast } from "react-toastify";

//   import { XMarkIcon } from "@heroicons/24/outline";

import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { uploadImageFiles } from "../../API/apiAdminConnection";

export function UserList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  // const [userId,setUserId] = useState("")
  const [imgfiles, setImgfiles] = useState([]);
  const uploadImages = (e) => {
    const val = e.target.files;
    setImages(Object.values(val));
    setImgfiles(Array.from(e.target.files));
  };
  //uploaad image files
  const handleUpload = async () => {
    const response = await uploadImageFiles(id, images);

    console.log(response);
    if (response.status) {
      toast.success("Upload successfullt");
      navigate("/userlist");
    }
  };
  const clerInputField = useRef(null);
  const clearImages = () => {
    setImgfiles([]);
    setImages([]);
    if (clerInputField.current) {
      clerInputField.current.value = "";
    }
  };

  return (
    <Card className="h-screen w-[calc(100vw-17rem)] fixed right-0 ">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Assign Project
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="relative flex w-full max-w-[24rem]">
            <Input
              type="file"
              label="Upload Images"
              multiple
              accept=".jpg,.png,.gif,.jpeg"
              name="img"
              ref={clerInputField}
              onChange={uploadImages}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <div className=" top-1 gap-1 absolute right-1">
              <Button
                size="sm"
                color={imgfiles.length ? "gray" : "blue-gray"}
                disabled={!imgfiles.length}
                className=" right-1  rounded text-red-900 p-1 "
                onClick={clearImages}
              >
                <XMarkIcon class="h-6 w-6 text-gray-500" />
              </Button>
              <Button
                size="sm"
                color={imgfiles.length ? "gray" : "blue-gray"}
                disabled={!imgfiles.length}
                className=" right-1 top-1 rounded"
                onClick={handleUpload}
              >
                Upload
              </Button>
            </div>
          </div>

          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-y-auto px-0 flex gap-2 flex-wrap">
        {imgfiles?.map((img, index) => (
          <div key={index} className=" w-12 h-12 ">
            <img src={URL.createObjectURL(img)} alt={`Image ${index}`} className="object-cover w-full h-full" />
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
