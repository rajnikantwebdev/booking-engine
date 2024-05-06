import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { IoStarSharp } from "react-icons/io5";

function CardDefault({ data }) {
  return (
    <Card className="mt-6 w-96 cursor-pointer">
      <CardHeader className="relative h-56">
        {data.spacious && (
          <i className="absolute bg-pink-500 px-2 py-1 rounded-full text-sm top-2 left-2 text-white">
            "Extra space"
          </i>
        )}
        {data.children && data.spacious && (
          <i className="absolute bg-pink-500 px-2 py-1 rounded-full text-sm top-2 left-2 text-white">
            "Extra Room for kids"
          </i>
        )}
        <img
          src={data?.img}
          alt={data?.name}
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardBody className="flex justify-between">
        <div>
          <Typography variant="h5" color="blue-gray">
            {data?.name?.length > 20
              ? data?.name.slice(0, 15) + "..."
              : data?.name}
          </Typography>
          <Typography variant="h6" className="text-sm">
            {data.location}
          </Typography>
          <small>
            <del>{data.price}</del>
          </small>
          <Typography variant="h5" className="flex items-center p-0">
            <span>₹</span>
            <span>{data.discounted_price}</span>
          </Typography>
        </div>
        <div>
          <Typography className="flex text-xl gap-1">
            {Array(data.stars)
              .fill()
              .map((_, i) => (
                <IoStarSharp className="text-yellow-700" key={i} />
              ))}
          </Typography>
          <Typography
            className={`${
              data.rating > 3 ? "bg-green-400" : "bg-orange-400"
            } w-fit px-2 py-0 rounded-xl text-white mt-2`}
          >
            {data.rating + "/" + "5"}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
}

export default CardDefault;
