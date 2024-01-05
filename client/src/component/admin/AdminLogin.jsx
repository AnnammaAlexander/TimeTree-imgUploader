import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {Adminlog} from '../../API/apiAdminConnection'
import {setAdminToken ,setAdminEmail  } from '../../redux/adminSlice'




function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

//formik validation
const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email address").required("Required"),
      password: Yup.string()
        .max(10, "Password must be less than 10 character")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      console.log("values",values);
      const response = await Adminlog(values)
      console.log("response....",response);
      if(response?.status=="success"){
        if(response?.token){
            dispatch(setAdminToken(response?.token));
         dispatch(setAdminEmail(response?.admin?.email)); 
         navigate("/admin");
         toast.success(response?.message)
        }
      }else{
        toast.error('Email already exist. Please try again.') 

      }
    } 
  });





  return (
    <div className="mt-8" >
        <div className="">
      <Card shadow={false}>
        <div className="border border-gray-300 p-16 rounded-md w-fill drop-shadow-xl  ">
          <Typography variant="h4" className="text-center" color="blue">
           Admin Log In
          </Typography>
          <Typography color="gray" className="mt-1  text-center font-normal">
            Enter your details
          </Typography>
          <form
            className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96 "
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-2">
              <Typography variant="h5" className="-mb-3 justify-center">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className="!border-t-blue-gray-200 focus:!border-blue-500 mt-2"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                crossOrigin={undefined}
                // inputProps={{
                //   style: { fontSize: '18px', padding: '12px' }, // Adjust size as needed
                // }}
                {...formik.getFieldProps("email")}
              />
              <p className="ml-2 text-sm text-red-800">
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null}
              </p>

              <Typography variant="h5" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 mt-2 focus:!border-blue-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                crossOrigin={undefined}
                // inputProps={{
                //   style: { fontSize: '18px', padding: '12px' }, // Adjust size as needed
                // }}
                {...formik.getFieldProps("password")}
              />
              <p className="ml-2 text-sm text-red-800">
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null}
              </p>
            </div>

            <Button className="mt-6 bg-green-500" type="submit" fullWidth>
              Log In
            </Button>
            
          </form>
        </div>
      </Card>
    </div>
    </div>
  )
}

export default AdminLogin
