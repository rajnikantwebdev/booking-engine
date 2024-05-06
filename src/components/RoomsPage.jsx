import React, { useContext, useState } from "react";
import { useEffect } from "react";
import ShimmerEffect from "./ShimmerEffect";
import CardDefault from "./Card";
import SearchComponent from "./SearchComponent";
import DataContext from "../utils/getDataContext";
import { useHotelDataStore } from "../utils/zustand";
import { FaRocket } from "react-icons/fa6";

export const getData = async (
  isIndian,
  place,
  adultsCount,
  childrenCount,
  roomCount
) => {
  try {
    const response = await fetch(
      "https://mocki.io/v1/87bc5ee6-62ed-45d2-9e97-e1c667909ee3",
      {
        method: "GET",
      }
    );
    const jsonResponse = await response.json();

    if (isIndian && !place) {
      console.log("running first one");
      return jsonResponse?.filter((filteredData) => filteredData.indian);
    }
    if (!isIndian && !place) {
      console.log("running second one");
      return jsonResponse?.filter((filteredData) => !filteredData.indian);
    }
    if (
      isIndian &&
      place &&
      adultsCount < 2 &&
      childrenCount < 1 &&
      roomCount < 2
    ) {
      console.log("running third one");
      return jsonResponse?.filter(
        (filteredData) =>
          filteredData.indian && filteredData.location.toLowerCase() === place
      );
    }

    if (
      !isIndian &&
      place &&
      adultsCount < 2 &&
      childrenCount < 1 &&
      roomCount < 2
    ) {
      console.log("running fourth one");
      return jsonResponse?.filter(
        (filteredData) =>
          !filteredData.indian && filteredData.location.toLowerCase() === place
      );
    }

    if (
      (isIndian && place && adultsCount > 2) ||
      (isIndian && place && roomCount >= 1) ||
      (isIndian && place && childrenCount > 0)
    ) {
      console.log("running last one");
      return jsonResponse?.filter(
        (filteredData) =>
          filteredData.indian &&
          filteredData.location.toLowerCase() === place &&
          (filteredData.spacious || filteredData.children)
      );
    }

    if (
      (!isIndian && place && adultsCount > 2) ||
      (!isIndian && place && roomCount >= 1) ||
      (!isIndian && place && childrenCount > 0)
    ) {
      console.log("running last one");
      return jsonResponse?.filter(
        (filteredData) =>
          !filteredData.indian &&
          filteredData.location.toLowerCase() === place &&
          (filteredData.spacious || filteredData.children)
      );
    }
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
};

const RoomsPage = () => {
  const [isInternational, setIsInternational] = useState(false);
  const [isIndia, setIsIndia] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [roomCount, setRoomCount] = useState(1);
  const { getHotel, hotels } = useHotelDataStore();
  const [dataMessage, setDataMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    getHotel(isIndia, selectedPlace, adultCount, roomCount, childrenCount, {
      setDataMessage,
      setIsEmpty,
    });
  }, [isIndia]);

  useEffect(() => {
    let delay;
    if (dataMessage === 0) {
      delay = setTimeout(() => {
        setShowMessage(true);
      }, 2000);
    } else {
      setShowMessage(false);
    }
    return () => clearInterval(delay);
  }, [isEmpty]);

  return (
    <>
      <SearchComponent
        setIsInternational={setIsInternational}
        isInternational={isInternational}
        isIndia={isIndia}
        setIsIndia={setIsIndia}
        setSelectedPlace={setSelectedPlace}
        selectedPlace={selectedPlace}
        adultCount={adultCount}
        setAdultCount={setAdultCount}
        childrenCount={childrenCount}
        setChildrenCount={setChildrenCount}
        roomCount={roomCount}
        setRoomCount={setRoomCount}
        setDataMessage={setDataMessage}
        setIsEmpty={setIsEmpty}
      />
      <section className="my-8 flex flex-wrap gap-9 w-full">
        {hotels?.length !== 0 ? (
          hotels?.map((hotelData) => {
            return <CardDefault data={hotelData} key={hotelData.id} />;
          })
        ) : dataMessage === 0 ? (
          showMessage ? (
            <div className="flex flex-col w-full justify-center my-12 items-center">
              <div className="flex items-center text-4xl font-bold gap-2 mb-4">
                <span>No Data Found</span>
                <span className="text-cyan">
                  <FaRocket />
                </span>
              </div>
              <button className="bg-blue-400 text-white rounded-3xl px-3 py-2">
                Go back to Home page
              </button>
            </div>
          ) : (
            <ShimmerEffect />
          )
        ) : (
          <ShimmerEffect />
        )}
      </section>
    </>
  );
};

export default RoomsPage;
