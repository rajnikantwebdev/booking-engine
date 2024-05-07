import React from "react";
import { useHotelDataStore, useId } from "../utils/zustand";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ImManWoman } from "react-icons/im";
import { FaHotel } from "react-icons/fa";
import { FaChildren } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BookNowDialogBox = ({
  adultCount,
  roomCount,
  childrenCount,
  setIsCardClicked,
}) => {
  const { objectId } = useId();
  const { hotels } = useHotelDataStore();
  const filteredHotel = hotels?.filter((hotel) => hotel._id === objectId);

  return (
    <>
      <div
        onClick={() => setIsCardClicked(false)}
        className="fixed top-0 left-0 bottom-0 right-0 bg-gray-800 bg-opacity-50 z-30"
      />
      <Card className="w-96 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 min-h-96 rounded-2xl py-4 px-4 drop-shadow-xl">
        <CardBody className="p-0 w-full">
          <img
            src={filteredHotel[0]?.img}
            alt={filteredHotel[0]?.name}
            className="w-full h-full object-cover rounded-2xl mb-4 shadow-xl"
          />
          <div>
            <Typography variant="h4" className="m-0">
              {filteredHotel[0]?.name}
            </Typography>
            <span className="text-normal">{filteredHotel[0]?.location}</span>
          </div>
          <div className="flex items-center gap-3 text-pink-500 mt-2">
            <span className="flex gap-2 items-center border border-pink-500 rounded-full px-2">
              <ImManWoman className="w-5 h-5" />{" "}
              <span className="text-lg">{adultCount}</span>
            </span>
            <span className="flex gap-2 items-center border border-pink-500 rounded-full px-2">
              <FaHotel className="w-5 h-5" />{" "}
              <span className="text-lg">{roomCount}</span>
            </span>
            <span className="flex gap-2 items-center border border-pink-500 rounded-full px-2">
              <FaChildren className="w-5 h-5" />{" "}
              <span className="text-lg">{childrenCount}</span>
            </span>
          </div>
        </CardBody>
        <CardFooter className="p-0 my-4">
          <div className="flex gap-2">
            <Link to={`/booking/done`}>
              <Button className="px-4 py-2 rounded-full bg-pink-500">
                Pay ₹{filteredHotel[0]?.discounted_price}
              </Button>
            </Link>
            <Button
              onClick={() => setIsCardClicked(false)}
              className="className=px-4 py-2 rounded-full text-black bg-transparent shadow-none hover:border hover:border-pink-500 transition-all ease-out"
            >
              Cancel
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default BookNowDialogBox;
