import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import BookingForm from "../../BookingForm/BookingForm";

function Header() {
  return (
    <div
      className="h-auto relative pb-14"
      style={{
        backgroundImage: "url('/images/homeImg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="flex flex-row items-center justify-between md:justify-evenly h-[90px] border-b-[0.5px] px-2">
        <div className="hidden md:flex flex-row items-center gap-1 text-white text-lg font-philosop">
          <LocationOnOutlinedIcon />
          GXF4+8HQ Baku , Azerbaijan
        </div>

        <img src={"/images/logo.svg"} className="w-[190px] h-[50px]" />


        <div className="hidden md:flex flex-row items-center">
          <SearchIcon
            style={{ fontSize: "35px", margin: "0 5px", color: "white" }}
          />
          <ShoppingCartOutlinedIcon
            style={{ fontSize: "35px", margin: "0 5px", color: "white" }}
          />
          <AccountCircleOutlinedIcon
            style={{ fontSize: "35px", margin: "0 5px", color: "white" }}
          />
        </div>

        <div className="block md:hidden" >
            <MenuIcon  style={{fontSize: '40px' , color : 'white'}}/>
        </div>
      </div>

 
      <div className="border-b-[0.5px] hidden md:flex flex-row  justify-center gap-10 items-center py-5 m-auto">
        {["Home", "About", "Rooms", "Dining", "Blog", "Contact"].map(
          (item, index) => (
            <p
              key={index}
              className="text-lg text-white font-philosop cursor-pointer"
            >
              {item}
            </p>
          )
        )}
      </div>


      {/* CENTER */}
      <div className="w-full flex flex-col justify-center items-center gap-4 mt-8">
        <p className="text-2xl text-[#c5a56f] font-philosop ">Welcome to Hotel TNC</p>
        <p className="text-5xl sm:text-6xl md:text-7xl font-philosop text-white w-4/5 md:w-[750px] text-center">Where Every Moment Feels Like Home</p>
        <p className="text-sm md:text-lg text-white text-center font-philosop w-4/5 md:w-[47%] ">At Hotel TNC, we invite you to experience a haven of serenity amidst the bustling cityscape</p>
      </div>




        <BookingForm/>
    </div>
  );
}

export default Header;
