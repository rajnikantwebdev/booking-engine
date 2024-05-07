import React, { useContext, useState } from "react";
import { useEffect } from "react";
import ShimmerEffect from "./ShimmerEffect";
import CardDefault from "./Card";
import SearchComponent from "./SearchComponent";
import { useHotelDataStore } from "../utils/zustand";
import { FaRocket } from "react-icons/fa6";
import { Link } from "react-router-dom";
import BookNowDialogBox from "./BookNowDialogBox";

const RoomsPage = () => {
  const [isInternational, setIsInternational] = useState(false);
  const [isIndia, setIsIndia] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [roomCount, setRoomCount] = useState(1);
  const { getHotel, hotels, emptyHotels } = useHotelDataStore();
  const [dataMessage, setDataMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [indianPlaces, setIndianPlaces] = useState({
    delhi: false,
    mumbai: false,
    bangalore: false,
  });

  const [internationalPlaces, setInternationalPlaces] = useState({
    spain: false,
    maldives: false,
    chicago: false,
  });
  const [isCardClicked, setIsCardClicked] = useState(false);

  useEffect(() => {
    emptyHotels({ setIsEmpty });
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

  const fetchHotels = () => {
    setAdultCount(1);
    setRoomCount(1);
    setChildrenCount(0);
    setSelectedPlace("");
    setIndianPlaces({ delhi: false, mumbai: false, bangalore: false });
    setInternationalPlaces({ spain: false, maldives: false, chicago: false });
    emptyHotels({ setIsEmpty });

    getHotel(isIndia, "", 1, 1, 0, {
      setDataMessage,
      setIsEmpty,
    });
  };

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
        indianPlaces={indianPlaces}
        setIndianPlaces={setIndianPlaces}
        internationalPlaces={internationalPlaces}
        setInternationalPlaces={setInternationalPlaces}
      />
      {isCardClicked && (
        <BookNowDialogBox
          adultCount={adultCount}
          roomCount={roomCount}
          childrenCount={childrenCount}
          setIsCardClicked={setIsCardClicked}
        />
      )}
      <section className="my-8 flex flex-wrap gap-9 w-full">
        {hotels?.length !== 0 ? (
          hotels?.map((hotelData) => {
            return (
              <CardDefault
                data={hotelData}
                key={hotelData.id}
                setIsCardClicked={setIsCardClicked}
              />
            );
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
              <button
                onClick={fetchHotels}
                className="bg-pink-500 text-white rounded-3xl px-3 py-2"
              >
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
