import React from "react";
import "./VMessages.css";
import VMDisplay from "./VMDisplay";
import { useState, useEffect } from "react";
//
import { db } from "../../../FireBase/Firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const VMessages = () => {
  //
  //get current user
  //get current user

  const [currentUserId, setcurrentUserID] = useState("");
  const auth = getAuth();
  useEffect(() => {
    const fetchID = async () => {
      //
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          console.log(uid);
          setcurrentUserID(uid);
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
      //
    };

    fetchID();
  }, []);
  //
  const [data, setData] = useState([]);
  const [State, setState] = useState("");

  //
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       //const db = firebase.firestore();
  //       //const snapshot = await db.collection("users").get();
  //       const snapshot = await getDocs(collection(db, "volunter"));
  //       const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //       setData(data);
  //       setID(data.documentid);
  //       //console.log(data);
  //       console.log(ID);
  //     };

  //     fetchData();
  //   }, []);

  //

  useEffect(() => {
    const fetchData = async () => {
      //const db = firebase.firestore();
      //const snapshot = await db.collection("users").get();

      //Mode 1 not for serarh
      // const snapshot = await getDocs(collection(db, "volunter"),where("Service", "==", Key));
      // const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // setData(data);
      // console.log(data);

      //Mode 2
      const q = query(
        collection(db, "volunter"),
        where("UserID", "==", currentUserId)
        //orderBy("date", "desc"), // Assuming "date" is the field containing the timestamp of the items
        //limit(3) // Limit the query to the three most recent items
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(data);
      //console.log(data);
    };

    fetchData();
  }, [currentUserId]);

  //
  //
  return (
    <div className="VMessages">
      
      <VMDisplay data={data} />
    </div>
  );
};

export default VMessages;
