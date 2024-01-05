import {
  Card,
  CardBody,

  Typography,
  
} from "@material-tailwind/react";
import {
  CurrencyPoundIcon,
  ShoppingCartIcon,
  CalendarDaysIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

function Dashboard() {
  return (
    <div className=" bg-cyan-50 overflow-y-scroll w-[calc(100vw-17rem)] fixed right-0 h-screen">
      <h1 className="text-left pt-6 pl-4 font-bold text-2xl">Dahboard</h1>

      <div className="flex flex-wrap gap-5  ml-5 mt-5  ">
        <Card className="mt-6  w-96 h-52">
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 text-left"
            >
              Earning
            </Typography>
            <Typography className="flex items-center gap-8">
              <div className=" rounded-full w-20 h-20 bg-light-green-100 mt-5">
                <CurrencyPoundIcon />
              </div>

              <p className="text-2xl font-semibold">0.00</p>
            </Typography>
          </CardBody>
        </Card>

        <Card className="mt-6  w-96 h-52">
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 text-left"
            >
              Project details
            </Typography>
            <Typography className="flex items-center gap-8">
              <div className=" rounded-full w-20 h-20 bg-light-green-100 mt-5">
                <ShoppingCartIcon className="p-3" />
              </div>

              <p className="text-2xl font-semibold">Silver</p>
            </Typography>
          </CardBody>
        </Card>

        <Card className="mt-6  w-96 h-52">
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 text-left"
            >
              Vality left
            </Typography>
            <Typography className="flex items-center gap-8">
              <div className=" rounded-full w-20 h-20 bg-light-green-100 mt-5">
                <CalendarDaysIcon className="p-3" />
              </div>

              <div className="flex flex-col">
                <p className="text-2xl font-semibold">151</p>
                <p>Days</p>
              </div>
            </Typography>
          </CardBody>
        </Card>

        <Card className="mt-6  w-96 h-52">
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 text-left"
            >
              Results
            </Typography>
            <Typography className="flex items-center gap-8">
              <div className=" rounded-full w-20 h-20 bg-light-green-100 mt-5">
                <UsersIcon className="p-3" />
              </div>

              <p className="text-2xl font-semibold">0</p>
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
