import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import RoomsList from './components/RoomsList/RoomsList'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<RoomsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
