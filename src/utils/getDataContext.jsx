import { createContext, useState } from "react";

const DataContext = createContext([]);

export const Reducer = ({ children }) => {
  const [data, setData] = useState([]);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
