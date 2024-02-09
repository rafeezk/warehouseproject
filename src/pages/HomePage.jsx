import React from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CardPage from "./CardPage";
import Footer from "../components/Footer";

const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div
        className="flex flex-col h-screen items-center justify-center"
        id="home"
      >
        <p className="text-9xl text-center font-bold text-white uppercase">
          make <br />
          new <br />
          revolution
        </p>
        {/* start with rafehouse */}
        {/* <h2 className="text-center font-bold text-5xl text-white">
          Solution Your Problem
        </h2>
        <p className="font-medium my-4 text-lg text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          laboriosam omnis debitis dolores, delectus error dicta. Esse velit
          aliquid ipsum.
        </p>
        <button className="">explore now</button> */}
      </div>
      <CardPage />
      <Footer />
    </>
  );
};

export default HomePage;
