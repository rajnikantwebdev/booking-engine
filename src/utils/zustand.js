import { create } from "zustand";

const getAllData = async (
  isIndia,
  selectedPlace,
  adultCount,
  roomCount,
  childrenCount,
  { setDataMessage, setIsEmpty }
) => {
  try {
    let url = "http://localhost:8000/api/data";

    if (isIndia && selectedPlace === "") {
      console.log("not using location");
      url += `?indian=true&adult=${adultCount}&room=${roomCount}&children=${childrenCount}`;
    } else if (!isIndia && selectedPlace === "") {
      console.log("international");
      url += `?indian=false&adult=${adultCount}&room=${roomCount}&children=${childrenCount}`;
    } else if (
      isIndia &&
      selectedPlace &&
      adultCount < 2 &&
      roomCount < 2 &&
      childrenCount === 0
    ) {
      console.log("using location");
      url += `?indian=true&adult=${adultCount}&room=${roomCount}&children=${childrenCount}&location=${selectedPlace}`;
    } else if (
      !isIndia &&
      selectedPlace &&
      (adultCount < 2 || roomCount < 2 || childrenCount === 0)
    ) {
      url += `?indian=false&adult=${adultCount}&room=${roomCount}&children=${childrenCount}&location=${selectedPlace}`;
    } else if (
      isIndia &&
      selectedPlace &&
      (adultCount >= 2 || roomCount > 1 || childrenCount > 0)
    ) {
      console.log("using extra space");
      url += `?indian=true&adult=${adultCount}&room=${roomCount}&children=${childrenCount}&location=${selectedPlace}`;
    }

    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const result = await response.json();
    if (result.data.length === 0 && result.dataMessage === 0) {
      setIsEmpty(true);
    }
    setDataMessage(result.dataMessage);
    return result.data;
  } catch (error) {
    console.log("Error while fetching data:", error);
    throw error; // Propagate the error
  }
};

export const useHotelDataStore = create((set) => ({
  hotels: [],
  getHotel: async (
    isIndia,
    selectedPlace,
    adultCount,
    roomCount,
    childrenCount,
    { setDataMessage, setIsEmpty }
  ) => {
    try {
      const response = await getAllData(
        isIndia,
        selectedPlace,
        adultCount,
        roomCount,
        childrenCount,
        { setDataMessage, setIsEmpty }
      );
      set({ hotels: response });
    } catch (error) {
      // Handle error or log it
      console.log("Error while getting hotel data:", error);
    }
  },
}));
