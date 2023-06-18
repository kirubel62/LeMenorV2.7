import React from "react";
import "./AdminAuth.css";
import { useState } from "react";
//
import { db } from "../../../FireBase/Firebase";
import { auth } from "../../../FireBase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//

const AdminAuth = () => {
  //
  //
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  //
  const navigate = useNavigate();
  //
  const handlogin = (e) => {
    e.preventDefault(); // when the form is submited it is not gating reloded
    signInWithEmailAndPassword(auth, email, password) //this function return a promise
      .then((userCredential) => {
        console.log(userCredential);
        // Signed in
        const user = userCredential.user;
        const uid = user.displayName;
        console.log(uid);
        navigate("/Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(error);
      });
  };
  //

  return (
    <div className="body">
      <section>
        <div className="signin">
          <div className="content">
            <h2>Sign In</h2>
            <div className="form">
              <form onSubmit={handlogin}>
                <div className="inputBox">
                  <input type="text" required />
                  <i>Username</i>
                </div>
                <div className="inputBox">
                  <input type="password" required />
                  <i>Password</i>
                </div>
                <div className="inputBox">
                  <input type="submit" value="Login" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminAuth;
