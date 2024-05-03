import React, { useContext, useState } from "react";
import { useEffect } from "react";
import ShimmerEffect from "./ShimmerEffect";
import CardDefault from "./Card";
import SearchComponent from "./SearchComponent";
import DataContext from "../utils/getDataContext";

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
    if (!isIndian && place) {
      console.log("running fourth one");
      return jsonResponse?.filter(
        (filteredData) =>
          !filteredData.indian && filteredData.location.toLowerCase() === place
      );
    }
    if (
      (isIndian && place && adultsCount > 3) ||
      (isIndian && place && roomCount > 1) ||
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
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
};

const RoomsPage = () => {
  const { data, setData } = useContext(DataContext);
  const [isInternational, setIsInternational] = useState(false);
  const [isIndia, setIsIndia] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [roomCount, setRoomCount] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(
        isIndia,
        selectedPlace,
        adultCount,
        childrenCount,
        roomCount
      );
      setData(result);
    };
    fetchData();
  }, [
    selectedPlace,
    isIndia,
    isInternational,
    adultCount,
    childrenCount,
    roomCount,
  ]);

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
      />
      <section className="my-8 flex flex-wrap gap-9">
        {data.length !== 0 ? (
          data.map((hotelData) => {
            return <CardDefault data={hotelData} key={hotelData.id} />;
          })
        ) : (
          <ShimmerEffect />
        )}
      </section>
    </>
  );
};

export default RoomsPage;
