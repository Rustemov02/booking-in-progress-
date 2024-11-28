import React , {useContext} from 'react'
import { DataContext } from '../BookingForm/BookingForm'


function RoomsList(){
    
    const data = useContext(DataContext)

    return(
        <>
        deneme
         <p> {data}</p>
        </>
    )
}


export default RoomsList