import { Card, CardBody, Typography } from "@material-tailwind/react";
import {
  ShoppingCartIcon,
  CalendarDaysIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import BarChart from "./BarChart";

function AdDashboard() {
  return (
    <div className=" bg-cyan-50 h-screen overflow-y-scroll fixed right-0 w-[calc(100vw-17rem)] ">
      <h1 className="text-left pt-6 pl-4 font-bold text-2xl">Dahboard</h1>
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="flex  flex-wrap justify-center gap-4  ml-5 mt-5  ">
          <Card className="mt-6  w-80 h-52">
            <CardBody>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-left"
              >
                Inactive Members
              </Typography>
              <Typography className="flex items-center gap-8">
                <div className=" rounded-full w-20 h-20 bg-light-green-50 mt-5">
                  <ShoppingCartIcon className="p-3" />
                </div>

                <p className="text-2xl font-semibold">3</p>
              </Typography>
            </CardBody>
          </Card>

          <Card className="mt-6  w-80 h-52">
            <CardBody>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-left"
              >
                Unpaid Members
              </Typography>
              <Typography className="flex items-center gap-8">
                <div className=" rounded-full w-20 h-20 bg-light-green-50 mt-5">
                  <ShoppingCartIcon className="p-3" />
                </div>

                <p className="text-2xl font-semibold">176</p>
              </Typography>
            </CardBody>
          </Card>

          <Card className="mt-6  w-80 h-52">
            <CardBody>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-left"
              >
                Total Payment
              </Typography>
              <Typography className="flex items-center gap-8">
                <div className=" rounded-full w-20 h-20 bg-light-green-50 mt-5">
                  <CalendarDaysIcon className="p-3" />
                </div>

                <div className="">
                  {/* <p className="text-2xl font-semibold">151</p> */}
                  {/* <p>This month</p> */}
                </div>
              </Typography>
            </CardBody>
          </Card>

          <Card className="mt-6  w-80 h-52">
            <CardBody>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-left"
              >
                Bronze Customer
              </Typography>
              <Typography className="flex items-center gap-8">
                <div className=" rounded-full w-20 h-20 bg-light-green-50 mt-5">
                  <UsersIcon className="p-3" />
                </div>

                <p className="text-2xl font-semibold">55</p>
              </Typography>
            </CardBody>
          </Card>

          <Card className="mt-6  w-80 h-52">
            <CardBody>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-left"
              >
                Silver Customer
              </Typography>
              <Typography className="flex items-center gap-8">
                <div className=" rounded-full w-20 h-20 bg-light-green-50 mt-5">
                  <UsersIcon className="p-3" />
                </div>

                <p className="text-2xl font-semibold">142</p>
              </Typography>
            </CardBody>
          </Card>

          <Card className="mt-6  w-80 h-52">
            <CardBody>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-left"
              >
                Gold Customer
              </Typography>
              <Typography className="flex items-center gap-8">
                <div className=" rounded-full w-20 h-20 bg-light-green-50 mt-5">
                  <UsersIcon className="p-3" />
                </div>

                <p className="text-2xl font-semibold">37</p>
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div className="w-80 m-auto ">
          <BarChart />
        </div>
      </div>
    </div>
  );
}

export default AdDashboard;
