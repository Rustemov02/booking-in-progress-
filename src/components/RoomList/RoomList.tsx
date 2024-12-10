import { useContext, useEffect, useState } from "react";
import type { DataType } from "../../App";
import { DataContext } from "../../App";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebase-config";
import DatePicker from "react-datepicker";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Skeleton from "@mui/material/Skeleton";

type FirebaseDataType = {
  availability: boolean;
  id: string;
  capacity: number;
  image: string;
  type: string;
  name: string;
  checkIn: string;
  checkOut: string;
  price: number;
};

export default function RoomList() {
  const today = new Date();
  const { data, setData } = useContext<{
    data: DataType;
    setData: React.Dispatch<React.SetStateAction<DataType>>;
  } | null>(DataContext);
  const [startDate, setStartDate] = useState<Date | null>(today);
  const [endDate, setEndDate] = useState<Date | null>(today);

  const orderData = useContext<{
    data: DataType;
    setData: React.Dispatch<React.SetStateAction<DataType>>;
  } | null>(DataContext);

  const [fireData, setFireData] = useState<FirebaseDataType[] | null>(null);

  const [suitableRooms, setSuitableRooms] = useState<
    FirebaseDataType[] | undefined
  >();

  const compareDates = () => {
    const orderDate = orderData?.data.checkIn.toLocaleDateString("en-CA");
    const newFormat = orderDate
      ?.split("/")
      .reverse()
      .join("")
      .replace(/-/g, "");

    const filteredData = fireData?.filter(
      (item) =>
        item.checkIn === newFormat || Number(item.checkIn) <= Number(newFormat)
    );

    setSuitableRooms(filteredData);
  };

  useEffect(() => {
    if (fireData) {
      compareDates();
    }
  }, [fireData]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "rooms"));

      const itemsList = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          id: doc.id,
          name: data.name,
          availability: data.availability,
          type: data.type,
          capacity: data.capacity,
          image: data.image,
          price: data.price,
        };
      });

      setFireData(itemsList);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="h-[150px] w-full bg-[blue]"></div>
      <div className="w-11/12 m-auto h-screen flex flex-col md:flex-row justify-center items-start my-5 relative">
        {/* ORDER CART */}
        <div className=" w-11/12 md:w-[20%] min-w-[150px] px-3 py-4 mx-4 border bg-[#EC8305] rounded-lg flex flex-col justify-between items-center">
         
         
          <div className="flex flex-row xs:flex-col flex-wrap sm:flex-row md:flex-col items-center justify-between border w-11/12">
            {/* Check IN */}
            <div className="py-1 w-fit min-w-[100px] mx-1 flex-shrink-0">
              <p className="text-sm font-philosop font-semibold">CHECK IN</p>
              <DatePicker
                className="border-b-[1px] border-[gray] w-full border-2 font-philosop text-xl text-black px-1 rounded-sm my-2 bg-white"
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

            {/* Check Out */}
            <div className="py-1 w-fit mx-1 min-w-[100px] flex-shrink-0">
              <p className="text-sm font-philosop font-semibold">CHECK OUT</p>
              <DatePicker
                className="border-b-[1px] border-[gray] w-full font-philosop text-xl my-2 px-1 rounded-sm bg-white"
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
          </div>

          {/* Guest */}
          <div className="py-1 w-11/12">
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
                  fontFamily: "Philosoph",
                  fontSize: "1.25rem",
                  outline: "none",
                  padding: "0 3px",
                  borderRadius: "3px",
                  boxShadow: "none",
                }}
                className="w-full font-philosop text-black text-xl my-2 bg-white"
              >
                <option value={2} className="font-philosop">
                  2 Adults
                </option>
                <option value={3} className=" font-philosop">
                  3 Adults
                </option>
                <option value={4} className=" font-philosop">
                  4 Adults
                </option>
              </NativeSelect>
            </FormControl>
          </div>

          {/* Room style */}
          <div className="py-1 w-11/12">
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
                  fontFamily: "Philosoph",
                  fontSize: "1.25rem",
                  outline: "none",
                  borderRadius: "3px",
                  boxShadow: "none",
                }}
                className="w-full font-philosop text-xl  my-2 bg-white px-1"
              >
                <option value="standart" className="font-philosop">
                  Standart Room
                </option>
                <option value="deluxe" className=" font-philosop">
                  Deluxe Room
                </option>
                <option value="suit" className=" font-philosop">
                  Suit Room
                </option>
              </NativeSelect>
            </FormControl>
          </div>

          {/* Search */}
          <button
            onClick={() => compareDates()}
            className="w-11/12 py-2 bg-[blue] text-white"
          >
            Search
          </button>
        </div>

        {/* ROOM LIST */}
        <div className="w-70% ">
          {fireData?.length !== 0 ? (
            suitableRooms?.map((item, index) => (
              <div
                key={index}
                className="flex flex-row justify-between items-center *:h-[220px] my-1 border-2 border-[blue] rounded-lg"
              >
                <img
                  src={item.image}
                  className="w-8/5 max-w-full min-w-[200px] m-2"
                />

                <div className="flex flex-col justify-between  w-[50%] px-1 min-w-[160px]">
                  <p className="text-[#133E87] font-medium text-2xl max-w-[150px]">
                    {item.name}
                  </p>
                  <p className="text-sm">500m from center</p>
                  <p className="bg-[green] rounded-lg w-fit text-white p-1 text-sm">
                    Free airport taxi
                  </p>
                  <p className="font-semibold">
                    Type {item.type} • capacity {item.capacity}
                  </p>
                  <p className="font-medium text-sm">
                    Studio apartment with Air conditioning
                  </p>
                </div>

                <div className=" w-[30%] flex flex-col justify-between items-end px-2 min-w-[170px]">
                  <div className="flex flex-row justify-end w-full items-center mx-1">
                    <p className="font-semibold text-xl pr-1">Excellent</p>
                    <p className="bg-[#074799] p-1 text-white font-semibold">
                      8.9
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-3xl">${item.price}</p>
                    <p>Includes taxes and fees</p>
                    <button className="border p-2 text-white bg-[blue] rounded-lg text-xl">
                      See Availability
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Skeleton variant="rectangular" width={300} height={220} />
          )}
        </div>
      </div>
    </div>
  );
}
