import { useState, useContext } from "react";
import { DataContext } from "../../App";
import DatePicker from "react-datepicker";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { Link } from "react-router-dom";
import type { DataType } from "../../App";

export default function BookingForm() {
  const today = new Date();
  const { data, setData } = useContext<{
    data: DataType;
    setData: React.Dispatch<React.SetStateAction<DataType>>;
  } | null>(DataContext);
  const [startDate, setStartDate] = useState<Date | null>(today);
  const [endDate, setEndDate] = useState<Date | null>(today);
 

  return (
    <div className="flex flex-row flex-wrap justify-between w-11/12 mt-12 md:mt-24 m-auto pr-2 md:p-0 rounded-lg bg-[#e5e7eb]">
      {/* CHECK IN */}
      <div className="flex flex-col justify-between w-full sm:w-[45%] md:w-[17%] ml-2 mt-2">
        <p className="text-sm font-philosop font-semibold">CHECK IN</p>
        <DatePicker
          className="border-b-[1px] border-[gray] w-full font-philosop text-xl text-[#34393580] my-2 bg-transparent"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date); 
            setData((prevState: Date) => ({
              ...prevState,
              checkIn: date,
            }));
          }}
          selectsStart
          startDate={startDate || new Date()}
          endDate={endDate || new Date()}
          minDate={new Date()}
        />
      </div>

      {/* CHECK OUT */}
      <div className="flex flex-col justify-between w-full sm:w-[45%] md:w-[17%] ml-2 mt-2">
        <p className="text-sm font-philosop font-semibold">CHECK OUT</p>
        <DatePicker
          className="border-b-[1px] border-[gray] w-full font-philosop text-xl text-[#34393580] my-2 bg-transparent"
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
            setData((prevState: Date) => ({
              ...prevState,
              checkOut: date,
            }));
          }}
          selectsEnd
          startDate={startDate || new Date()}
          endDate={endDate || new Date()}
          minDate={startDate || new Date()}
        />
      </div>

      {/* DROPDOWN MENU */}
      <div className="flex flex-col items-start justify-between w-full sm:w-[45%] md:w-[17%] ml-2 mt-2">
        <p className="text-sm font-philosop font-semibold">GUEST</p>
        <FormControl fullWidth>
          <NativeSelect
            onChange={(e) => {
              setData((prevState: Date) => ({
                ...prevState,
                guest: Number(e.target.value),
              }));
            }}
            style={{
              color: "#34393580",
              fontFamily: "Philosoph",
              fontSize: "1.25rem",
              outline: "none",
              boxShadow: "none",
            }}
            className="w-full font-philosop text-xl  my-2 bg-transparent"
          >
            <option value={2} className="text-[#34393580] font-philosop">
              2 Adults
            </option>
            <option value={3} className="text-[#34393580] font-philosop">
              3 Adults
            </option>
            <option value={4} className="text-[#34393580] font-philosop">
              4 Adults
            </option>
          </NativeSelect>
        </FormControl>
      </div>

      {/* ROOM STYLE */}
      <div className="flex flex-col items-start justify-between w-full sm:w-[45%] md:w-[17%] ml-2 mt-2">
        <p className="text-sm font-philosop font-semibold">ROOM</p>
        <FormControl fullWidth>
          <NativeSelect
            onChange={(e) => {
              setData((prevState: Date) => ({
                ...prevState,
                room: e.target.value,
              }));
            }}
            style={{
              color: "#34393580",
              fontFamily: "Philosoph",
              fontSize: "1.25rem",
              outline: "none",
              boxShadow: "none",
            }}
            className="w-full font-philosop text-xl  my-2 bg-transparent"
          >
            <option value="standart" className="text-[#34393580] font-philosop">
              Standart Room
            </option>
            <option value="deluxe" className="text-[#34393580] font-philosop">
              Deluxe Room
            </option>
            <option value="suit" className="text-[#34393580] font-philosop">
              Suit Room
            </option>
          </NativeSelect>
        </FormControl>
      </div>

      {/* BUTTON */}
      <button className="bg-[#c5a56f] md:rounded-r-lg h-[50px] md:h-auto my-2 md:m-0 w-full md:w-[20%] ml-2 text-white text-xl font-philosop ">
        <Link to="/rooms">BOOK NOW</Link>
      </button>
    </div>
  );
}
