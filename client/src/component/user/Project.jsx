
import * as Yup from "yup";
import { useFormik } from "formik";
import { saveProject } from "../../API/apiConnection";

import { Input, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearProject } from "../../redux/projectslice";
import { useNavigate } from "react-router-dom";
function Project() {
  const singleData = useSelector((store) => store.project.projectfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const [currentImageSrc, setCurrentImageSrc] = useState(images[0]);
  const clearData = ()=>{
    navigate("/projects")
  }
  const formik = useFormik({
    initialValues: {
      shippingArea: "",
      brand: "",
      entryDate: "",
      time: "",
      warranty: "",
      shippingTimeframe: "",
      productRating: "",
      dateSubmittedForReview: "",
      material: "",
      productType: "",
      globalRating: "",
    },
    validationSchema: Yup.object({
      shippingArea: Yup.string()
        .max(100, "Must be less than 100 characters")
        .required("Required"),

      brand: Yup.string().required("Required"),

      entryDate: Yup.string().required("Required"),

      time: Yup.string().required("Required"),

      warranty: Yup.string().required("Required"),

      shippingTimeframe: Yup.string().required("Required"),

      productRating: Yup.string().required("Required"),

      dateSubmittedForReview: Yup.string().required("Required"),

      material: Yup.string().required("Required"),

      productType: Yup.string().required("Required"),

      globalRating: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      values._id = singleData._id;
      console.log("responsesssssss,,,,", values);
      const response = await saveProject(values);
      if (response.status) {
        toast.success("Updated successfully");
        dispatch(clearProject());
        navigate("/projects");
      }
    },
  });

  return (
    <div className=" fixed flex  h-screen flex-col right-0  w-[calc(100vw-17rem)] ">
      <div className=" bg-cyan-50  h-1/3  flex justify-center ">
        <img
          src={singleData?.imgUrl}
          className=" object-cover w-100 h-100"
        ></img>
      </div>
      <div className=" bg-cyan-50 h-2/3 overflow-y-scroll ">
        <form className="" onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-start flex-wrap gap-9 mt-6 p-4">
           
            <div className="w-72">
              <Input
                label="shippingArea"
                {...formik.getFieldProps("shippingArea")}
              />
              <p className="ml-2 text-sm text-red-800">
                {formik.touched.shippingArea && formik.errors.shippingArea
                  ? formik.errors.shippingArea
                  : null}
              </p>
            </div>

            <div className="w-72">
              <Input label="brand" {...formik.getFieldProps("brand")} />
              <p className="ml-2 text-sm text-red-800">
                {formik.touched.brand && formik.errors.brand
                  ? formik.errors.brand
                  : null}
              </p>
            </div>

            <div className="w-72">
              <Input label="entryDate" {...formik.getFieldProps("entryDate")} />
              <p className="ml-2 text-sm text-red-800">
                {formik.touched.entryDate && formik.errors.entryDate
                  ? formik.errors.entryDate
                  : null}
              </p>
            </div>

            <div className="w-72">
              <Input label="time" {...formik.getFieldProps("time")} />
              <p className="ml-2 text-sm text-red-800">
                {formik.touched.time && formik.errors.time
                  ? formik.errors.time
                  : null}
              </p>
            </div>

            <div className="w-72">
              <Input label="warranty" {...formik.getFieldProps("warranty")} />
              <p className="ml-2 text-sm text-red-800">
                {formik.touched.warranty && formik.errors.warranty
                  ? formik.errors.warranty
                  : null}
              </p>
            </div>

            <div className="w-72">
              <Input
                label="shippingTimeframe"
                {...formik.getFieldProps("shippingTimeframe")}
              />
              <p className="ml-2 text-sm text-red-800">
                {formik.touched.shippingTimeframe &&
                formik.errors.shippingTimeframe
                  ? formik.errors.shippingTimeframe
                  : null}
              </p>
            </div>

            <div className="w-72">
              <Input
                label="productRating"
                {...formik.getFieldProps("productRating")}
              />
              <p className="ml-2 text-sm text-red-800">
                {formik.touched.productRating && formik.errors.productRating
                  ? formik.errors.productRating
                  : null}
              </p>
            </div>

            <div className="w-72">
              <Input
                label="dateSubmittedForReview"
                {...formik.getFieldProps("dateSubmittedForReview")}
              />
              <p className="ml-2 text-sm text-red-800">
                {formik.touched.dateSubmittedForReview &&
                formik.errors.dateSubmittedForReview
                  ? formik.errors.dateSubmittedForReview
                  : null}
              </p>
            </div>

            <div className="w-72">
              <Input label="material" {...formik.getFieldProps("material")} />
              <p className="ml-2 text-sm text-red-800">
                {formik.touched.material && formik.errors.material
                  ? formik.errors.material
                  : null}
              </p>
            </div>

            <div className="w-72">
              <Input
                label="productType"
                {...formik.getFieldProps("productType")}
              />
              <p className="ml-2 text-sm text-red-800">
                {formik.touched.productType && formik.errors.productType
                  ? formik.errors.productType
                  : null}
              </p>
            </div>

            <div className="w-72">
              <Input
                label="globalRating"
                {...formik.getFieldProps("globalRating")}
              />
              <p className="ml-2 text-sm text-red-800">
                {formik.touched.globalRating && formik.errors.globalRating
                  ? formik.errors.globalRating
                  : null}
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-2 mb-4">
            <Button className="mt-6 bg-green-400 w-32 " type="submit" >
              Save
            </Button>
            <Button onClick={clearData} className="mt-6">clear</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Project;
