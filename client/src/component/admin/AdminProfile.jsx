import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import {
  getAdmin,
  ChangeProfile,
  changePassword,
  changeMobileNum,
} from "../../API/apiAdminConnection";
import { setAdminLogOut } from "../../redux/adminSlice";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export function ProfileCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adminData, setAdminData] = useState({});
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [phOpen, setPhOpen] = useState("");
  const [profilePhoto, setprofilePhoto] = useState(null);
  const handleOpenImg = () => setOpen(!open);
  const handleEditOpen = () => setEditOpen(!editOpen);
  const handleNumberChange = () => setPhOpen(!phOpen);
  const submitProfilePhoto = async () => {
    const response = await ChangeProfile(profilePhoto);
    if (response.status) {
      setAdminData((prevProfile) => {
        return { ...prevProfile, dp: URL.createObjectURL(profilePhoto) };
      });
      handleOpenImg();
      // setprofilePhoto();
      toast.success('Update Successfully')
    }else{
      toast.error('Failed..Try again Later')
    }
  };

  const getAdminDetaile = async () => {
    const response = await getAdmin();
    if (response) {
      setAdminData(response);
    }
  };

  useEffect(() => {
    getAdminDetaile();
  }, []);
  const chooseProfileImg = (e) => {
    setprofilePhoto(e.target.files[0]);
  };

  const changePhone = () => {
    handleNumberChange();
  };

  const formik = useFormik({
    initialValues: {
      currentpassword: "",
      password: "",
      conformPassword: "",
    },
    validationSchema: Yup.object({
      currentpassword:
        Yup.string()
        .required("Required"),

      password: Yup.string()
        .max(20, "Must be less than 20 characters")
        .min(4, "Must be 4 characters or more")
        .required("Required"),

      conformPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Password not match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const response = await changePassword(values);
      if (response.status) {
        toast.success("Password changed successfully");
        dispatch(setAdminLogOut());
        navigate("/admin");
      } else {
        toast.error("Invalid password");
      }
    },
  });

  const formik2 = useFormik({
    initialValues: {
      phonenumber: "",
    },
    validationSchema: Yup.object({
      phonenumber: Yup.string()
        .matches(
          /^[0-9]{10}$/,
          "Mobile number must be a 10-digit numeric value"
        )

        .required("Required"),
    }),
    onSubmit: async (values) => {
      console.log("value", values);
      const response = await changeMobileNum(values);

      if (response?.status) {
        setAdminData((prevProfile) => {
          return { ...prevProfile, phonenumber: values.phonenumber };
        });
        toast.success("Updated successfully");
        handleNumberChange();
      } else {
        toast.error("Failed.Try again later..!");
      }
    },
  });

  return (
    <div className="bg-cyan-50   h-screen w-[calc(100vw-17rem)] fixed right-0">
      <div className="bg-white w-96 m-auto mt-10">
        <h1 className="text-2xl font-medium p-8">Admin Profile</h1>
        <div className="flex justify-between gap-4 flex-wrap">
          <div className="ml-auto mr-auto flex justify-center items-center w-52 h-52">
            <div
              onClick={handleOpenImg}
              className="cursor-pointer rounded-full overflow-hidden relative w-52 h-52 group"
            >
              <img
                className="h-full w-full object-cover relative"
                src={adminData?.dp?.length && adminData.dp}
                alt="Profile photo"
              />
              <div className="group-hover:opacity-40 bg-blue-gray-800 absolute top-0 left-0 w-full h-full opacity-0 flex items-center justify-center">
                <PencilSquareIcon className="w-10 h-8 text-white rounded-full"></PencilSquareIcon>
              </div>
            </div>
          </div>

          <div className="ml-auto mr-auto flex flex-col justify-around gap-4">
            <h1 className="text-3xl capitalize">Name: {adminData.name}</h1>

            <p className="mt-2"> Email: {adminData.email}</p>

            <div className=" flex justify-center items-center ">
              <p className="whitespace-pre-line text-blue-gray-800">
                Mobile Number:{adminData.phonenumber}{" "}
              </p>
              <div className="mb-1">
                <Tooltip content="Change phone number">
                  <IconButton variant="text" onClick={changePhone}>
                    <PencilIcon className="h-4 w-4" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <Button className="m-4" onClick={handleEditOpen}>
          Change password
        </Button>
      </div>

      <Dialog
        size="xs"
        open={open}
        handler={handleOpenImg}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <div className="flex justify-center items-center gap-2 m-2">
          <div className="ml-auto mr-auto flex justify-center items-center w-1/2 h-1/2 p-2">
            <div className="rounded-full overflow-hidden">
              <img
                className="object-cover"
                src={
                  profilePhoto
                    ? URL.createObjectURL(profilePhoto)
                    : adminData?.dp?.length
                    ? adminData.dp
                    : "https://docs.material-tailwind.com/img/face-2.jpg"
                }
                alt="Profile photo"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="w-20 bg-blue-500 hover:bg-blue-600 text-white text-center py-1 rounded-lg cursor-pointer">
              Choose
              <input
                className="hidden"
                name="profilePic"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={chooseProfileImg}
              />
            </label>
            <p className="file-label break-words">
              Allowed formats: JPG, JPEG, PNG
            </p>
          </div>
        </div>

        <div className="text-center p-2 space-x-4">
          <Button
            onClick={handleOpenImg}
            size="lg"
            className="px-2 py-1 mt-2 capitalize font-thin"
          >
            Cancel
          </Button>

          <Button
            onClick={submitProfilePhoto}
            disabled={false}
            size="lg"
            className="px-2 py-1 mt-2 capitalize font-thin"
          >
            Update
          </Button>
        </div>
      </Dialog>

      <Dialog
        size="xs"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        open={editOpen}
        handler={handleEditOpen}
      >
        <form
          onSubmit={formik.handleSubmit}
          className=" p-5 flex flex-col gap-3"
        >
          <h1 className="text-center text-xl font-bold mb-5">
            Change Password
          </h1>

          <Input
            type="password"
            label="Currentpassword"
            size="lg"
            id="currentpassword"
            {...formik.getFieldProps("currentpassword")}
          />
          <p className="h-4 ml-2 text-sm text-red-800">
            {formik.touched.currentpassword && formik.errors.currentpassword
              ? formik.errors.currentpassword
              : null}
          </p>

          <Input
            type="password"
            label="password"
            size="lg"
            id="password"
            {...formik.getFieldProps("password")}
          />
          <p className="h-4 ml-2 text-sm text-red-800">
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : null}
          </p>

          <Input
            type="password"
            label="conform Password"
            size="lg"
            id="conformPassword"
            {...formik.getFieldProps("conformPassword")}
          />
          <p className="h-4 ml-2 text-sm text-red-800">
            {formik.touched.conformPassword && formik.errors.conformPassword
              ? formik.errors.conformPassword
              : null}
          </p>
          <Button type="submit">Update</Button>
        </form>
      </Dialog>

      <Dialog size="xm" open={phOpen} handler={handleNumberChange}>
        <div className="flex flex-col items-center p-4">
          <h1 className="text-2xl font-bold mb-4">Change Mobile Number</h1>
          <form onSubmit={formik2.handleSubmit} className="w-full max-w-sm">
            <input
              className="border-[.1rem] border-gray-400 rounded-md p-2 mb-2 w-full placeholder:text-sm focus:border-blue-600"
              placeholder="Mobile Number"
              id="phonenumber"
              {...formik2.getFieldProps("phonenumber")}
            />
            <p className="h-4 ml-2 text-sm text-red-800">
              {formik2.touched.phonenumber && formik2.errors.phonenumber
                ? formik2.errors.phonenumber
                : null}
            </p>
            <div className="flex justify-center gap-2">
              <Button
                type="submit"
                className="bg-green-400 text-white p-2 rounded-md "
              >
                Update Number
              </Button>
              <Button className="bg-gray-600" onClick={handleNumberChange}>
                cancel
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
