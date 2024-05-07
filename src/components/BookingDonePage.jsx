import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const BookingDonePage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Typography variant="h1">Thank you for booking!</Typography>
      <Link to={"/"}>
        <Button className="bg-pink-500 rounded-full mt-4">
          Go back to home page
        </Button>
      </Link>
    </div>
  );
};

export default BookingDonePage;
