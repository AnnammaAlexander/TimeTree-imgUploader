
import { useEffect } from "react";
import { ProjectData } from "../../API/apiConnection";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProjectFile } from "../../redux/projectslice";
export function ProjectFiles() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [allData, setAllDAta] = useState([]);
  const id = useSelector((store) => store.user.id);
  const dataFetch = async () => {
    const response = await ProjectData(id);
    setAllDAta(response);
    console.log(response);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const viewProject = (sigleImg) => {
    console.log("sigleImg.....", sigleImg);
    dispatch(setProjectFile(sigleImg));
    navigate("/singleProject");
  };
  return (
    <div className="fixed flex  h-screen flex-col right-0 overflow-y-scroll w-[calc(100vw-17rem)] bg-cyan-50">
      <div className="mt-5">
        <span className="text-2xl font-semibold">Projects</span>
      </div> 

      <div className="flex ml-2 flex-wrap gap-2  mt-5">
        {allData.map((sigleImg) => {
          return (
            <div
              key={sigleImg._id}
              className="w-32 cursor-pointer rounded-full hover:scale-125 transition ease-in-out delay-150"
              onClick={() => viewProject(sigleImg)}
            >
              <img
                className="object-cover w-100 h-100 rounded-md "
                src={sigleImg.imgUrl}
                alt="card-image"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
