import React from "react";
import "./LoginPage.css";
import create from "../images/parrafo.png";
const LoginPage = () => {
  return (
    <>
      <body class="contenido">
        <div class="cuadrito">
          <div class="createAccount">
            <div class="texto">
              <h1>Create An Account</h1>
              <img src={create} alt="" />
            </div>
            <div class="boton">
              <input type="text" placeholder="Name" class="name"></input>
            </div>
            <div class="boton">
              <input
                type="text"
                placeholder="Email Address"
                class="email"
              ></input>
            </div>
            <div class="boton">
              <input
                type="text"
                placeholder="Password"
                class="password"
              ></input>
            </div>
            <div class="boton">
              <button class="button" type="button">
                Create Account
              </button>
            </div>
            <div class="final">
              Already Have An Account? <button>Sign In</button>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default LoginPage;
