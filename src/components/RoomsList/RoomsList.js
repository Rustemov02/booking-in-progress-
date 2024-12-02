import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../App";
import { collection, getDocs } from "firebase/firestore";
import {db} from '../../Firebase/firebase-config'


function RoomsList() {
  const [items, setItems] = useState([]);
  const { data, setData } = useContext(DataContext);

  useEffect(() => {
    
    // get Firebase Data
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      const itemsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsList);
    };

    fetchItems();
  }, []);

  return (
    <div>
      <button onClick={() => console.log(data)}>Check data</button> <br />
      <br />
      <button onClick={() => console.log(items)}>Check items</button>
    </div>
  );
}

export default RoomsList;
