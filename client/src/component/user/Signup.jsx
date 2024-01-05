import {
     
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { useFormik } from "formik";
  import * as Yup from 'yup'
  import {Link} from "react-router-dom"
import { signupUser } from "../../API/apiConnection";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { useDispatch } from "react-redux";
import { setID, setToken } from "../../redux/slice";

function Signup() {
    const dispatch = useDispatch();

const navigate = useNavigate()
    const formik = useFormik({
        initialValues:{
          name:'',
          
          phonenumber:'',
          email:'',
          password:'',
          conformPassword:''
        },
        validationSchema: Yup.object({
  
            name: Yup.string()
            .max(20, 'Must be less than 20 characters')
            .required('Required'),
  
           
  
            phonenumber: Yup.string()
            .matches(/^[0-9]{10}$/,'Mobile number must be a 10-digit numeric value')
            
            .required('Required'),
  
  
  
            email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
  
  
          password: Yup.string()
            .max(20, 'Must be less than 20 characters')
            .min(4,'Must be 4 characters or more')
            .required('Required'),
  
            conformPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Password not match')
            .required('Required'),
  
  
  
        }),
        onSubmit:async (values) => {
         const response = await signupUser(values)
      
          
          if(response?.status== 'success'){
            //  localStorage.setItem("token",response?.token)
            dispatch(setToken(response?.token));
            dispatch(setID(response?.user?._id));
            navigate('/')

          }else{
            toast.error('Registration Failes')
          }
        }
      })
  







  return (
    <div className='h-screen w-screen flex justify-center ite'>
    {/* <Card  className='flex justify-center items-center' color="" shadow={false} > */}
      <div className='shadow-2xl w-fit p-5 bg-white h-fit m-auto rounded-lg' >
      <Typography variant="h4" className="text-center" color="blue">
            Sign Up
          </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <div className='flex justify-center rounded '>


      <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 ">
        <div className="mb-4 flex flex-col gap-0.5">

             <input className='border-[.1rem] border-gray-400 rounded-md p-2 placeholder:text-sm focus:border-blue-600' placeholder='Name' id="name"
              {...formik.getFieldProps('name')} />
              <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.name && formik.errors.name ? 
              formik.errors.name : null}</p>

           

            <input className='border-[.1rem] border-gray-400 rounded-md p-2 placeholder:text-sm focus:border-blue-600' placeholder='Mobile Number' id="phonenumber"
              {...formik.getFieldProps('phonenumber')} />
              <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.phonenumber && formik.errors.phonenumber ? 
              formik.errors.phonenumber : null}</p>


           <input className='border-[.1rem] border-gray-400 rounded-md p-2 placeholder:text-sm focus:border-blue-600' placeholder='email' id="email"
              {...formik.getFieldProps('email')} />
              <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.email && formik.errors.email ? 
              formik.errors.email : null}</p>

<Input type="password"  label="password" size="lg" id="password"
              {...formik.getFieldProps('password')} />
              <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.password && formik.errors.password ?
                formik.errors.password : null}</p>

<Input type="password" label="conform Password" size="lg" id="conformPassword"
              {...formik.getFieldProps('conformPassword')} />
              <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.conformPassword && formik.errors.conformPassword ?
                formik.errors.conformPassword : null}</p>


        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button type="submit" className=" mt-6 bg-green-500   shadow-lg" fullWidth>
          Signup
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to="/" className="font-medium text-green-400"> Sign In </Link>
           
          
        </Typography>
      </form>
      </div>
    </div>
    {/* </Card> */}
    </div>
  )
}

export default Signup
