import { useState } from "react";
import { Button } from "@material-tailwind/react";
import HotelInfoOptions from "./HotelInfoOptions";
import { useHotelDataStore } from "../utils/zustand";

const LocationOption = ({
  name,
  location,
  place,
  setPlace,
  setSelectedPlace,
}) => {
  return (
    <div>
      <input
        type="radio"
        name="whereIndia"
        value={location}
        id={location}
        className="hidden"
        checked={place}
        onChange={(e) => {
          setPlace({
            delhi: true,
            mumbai: false,
            bangalore: false,
          });
          setSelectedPlace(location);
        }}
      />
      <label
        className={`${
          place
            ? "bg-pink-500 text-white"
            : "bg-transparent text-black border-pink-500 hover:bg-pink-500"
        } rounded-full py-2 px-3 border cursor-pointer hover:text-white`}
        htmlFor={location}
      >
        {name}
      </label>
    </div>
  );
};

const SearchComponent = ({
  isInternational,
  setIsInternational,
  isIndia,
  setIsIndia,
  setSelectedPlace,
  selectedPlace,
  adultCount,
  setAdultCount,
  childrenCount,
  setChildrenCount,
  roomCount,
  setRoomCount,
  setDataMessage,
  setIsEmpty,
}) => {
  const [addGuestAndRoom, setAddGuestAndRoom] = useState(false);

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

  const { getHotel } = useHotelDataStore();

  const handleSearch = async () => {
    console.log("search");
    console.log(selectedPlace);
    getHotel(isIndia, selectedPlace, adultCount, roomCount, childrenCount, {
      setDataMessage,
      setIsEmpty,
    });
  };
  const handleInfo = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAddGuestAndRoom(!addGuestAndRoom);
  };

  const handleIndiaSelect = () => {
    setIsIndia(true);
    setIsInternational(false);
    setSelectedPlace("");
    setIndianPlaces({ delhi: false, mumbai: false, bangalore: false });
    setAdultCount(1);
    setChildrenCount(0);
    setRoomCount(1);
  };

  const handleInternationalSelect = () => {
    setIsIndia(false);
    setIsInternational(true);
    setSelectedPlace("");
    setInternationalPlaces({ spain: false, maldives: false, chicago: false });
    setAdultCount(1);
    setChildrenCount(0);
    setRoomCount(1);
  };

  return (
    <section className="px-4 py-4 rounded-3xl space-y-8 w-2/5 shadow-xl">
      <div className="flex gap-6">
        <div className="cursor-pointer">
          <input
            type="radio"
            name="place"
            id="india"
            checked={isIndia}
            onChange={handleIndiaSelect}
          />
          <label htmlFor="india" className="text-xl cursor-pointer">
            India
          </label>
        </div>
        <div className="cursor-pointer">
          <input
            checked={isInternational}
            type="radio"
            name="place"
            id="international"
            onChange={handleInternationalSelect}
          />
          <label htmlFor="international" className="text-xl cursor-pointer">
            International
          </label>
        </div>
      </div>
      <div>
        <div className="mb-3">
          <label htmlFor="searchHotels">Where</label>
        </div>
        {isIndia && !isInternational ? (
          <div className="flex gap-2">
            <LocationOption
              name={"Delhi"}
              location={"delhi"}
              place={indianPlaces.delhi}
              setPlace={() =>
                setIndianPlaces({
                  delhi: true,
                  mumbai: false,
                  bangalore: false,
                })
              }
              setSelectedPlace={(location) => setSelectedPlace(location)}
            />
            <LocationOption
              name={"Mumbai"}
              location={"mumbai"}
              place={indianPlaces.mumbai}
              setPlace={() =>
                setIndianPlaces({
                  delhi: false,
                  mumbai: true,
                  bangalore: false,
                })
              }
              setSelectedPlace={(location) => setSelectedPlace(location)}
            />
            <LocationOption
              name={"Bangalore"}
              location={"bangalore"}
              place={indianPlaces.bangalore}
              setPlace={() =>
                setIndianPlaces({
                  delhi: false,
                  mumbai: false,
                  bangalore: true,
                })
              }
              setSelectedPlace={(location) => setSelectedPlace(location)}
            />
          </div>
        ) : (
          <div className="flex gap-2">
            <LocationOption
              name={"Spain"}
              location={"spain"}
              place={internationalPlaces.spain}
              setPlace={() =>
                setInternationalPlaces({
                  spain: true,
                  maldives: false,
                  chicago: false,
                })
              }
              setSelectedPlace={(location) => setSelectedPlace(location)}
            />
            <LocationOption
              name={"Maldives"}
              location={"maldives"}
              place={internationalPlaces.maldives}
              setPlace={() =>
                setInternationalPlaces({
                  spain: false,
                  maldives: true,
                  chicago: false,
                })
              }
              setSelectedPlace={(location) => setSelectedPlace(location)}
            />
            <LocationOption
              name={"Chicago"}
              location={"chicago"}
              place={internationalPlaces.chicago}
              setPlace={() =>
                setInternationalPlaces({
                  spain: false,
                  maldives: false,
                  chicago: true,
                })
              }
              setSelectedPlace={(location) => setSelectedPlace(location)}
            />
          </div>
        )}
      </div>
      <div className="relative">
        <label htmlFor="guestAndRoom">Guests & roomCount</label>
        <div id="guestAndRoom" onClick={(e) => handleInfo(e)}>
          {adultCount} {adultCount !== 1 ? "Adult" : "Adults"} | {roomCount}{" "}
          {roomCount !== 1 ? "Room" : "Rooms"}{" "}
          {childrenCount !== 0 && " | " + childrenCount + " Children"}
        </div>
        {addGuestAndRoom && (
          <div className="absolute z-50 px-4 py-6 drop-shadow-md bg-white rounded-lg">
            <div>
              <div className="flex gap-12 py-4">
                <HotelInfoOptions
                  category={"Adult"}
                  categoryMeta={"(12+ yr)"}
                  value={adultCount}
                  minValue={1}
                  maxValue={4}
                  increment={() => setAdultCount((prev) => prev + 1)}
                  decrement={() => setAdultCount((prev) => prev - 1)}
                />
                <HotelInfoOptions
                  category={"Room"}
                  categoryMeta={"(Max 2)"}
                  value={roomCount}
                  minValue={1}
                  maxValue={2}
                  increment={() => setRoomCount((prev) => prev + 1)}
                  decrement={() => setRoomCount((prev) => prev - 1)}
                />
                <HotelInfoOptions
                  category={"Children"}
                  categoryMeta={"(0-12 yr)"}
                  value={childrenCount}
                  minValue={0}
                  maxValue={4}
                  increment={() => setChildrenCount((prev) => prev + 1)}
                  decrement={() => setChildrenCount((prev) => prev - 1)}
                />
              </div>
              <div>
                <Button
                  onClick={() => setAddGuestAndRoom(false)}
                  className="bg-pink-500 rounded-full"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Button
        className="rounded-full px-4 py-2 bg-pink-500"
        disabled={!selectedPlace}
        onClick={handleSearch}
      >
        Search
      </Button>
    </section>
  );
};

export default SearchComponent;
