import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import RoomsList from "./components/RoomsList/RoomsList";
export const DataContext = createContext();

function App() {
  const today = new Date();
  const [data, setData] = useState({
    checkIn: today.toLocaleDateString("az-AZ"),
    checkOut: today.toLocaleDateString("az-AZ"),
    guest: 2,
    room: "",
  });

  return (
    <BrowserRouter>
      <DataContext.Provider value={{ data, setData }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<RoomsList />} />
        </Routes>
      </DataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
