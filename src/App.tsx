import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import RoomList from "./components/RoomList/RoomList";

import "react-datepicker/dist/react-datepicker.css"; // for DatePicker calendar style

export const DataContext = createContext<{
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
} | null>(null);

export type DataType = {
  checkIn: Date;
  checkOut: Date;
  guest: number;
  room: string;
};

// .toLocaleDateString("en-CA")
function App() {
  const today = new Date();
  const [data, setData] = useState<DataType>({
    checkIn: today,
    checkOut: today,
    guest: 2,
    room: "standart",
  });

  return (
    <BrowserRouter>
      <DataContext.Provider value={{ data, setData }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<RoomList />} />
        </Routes>
      </DataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
