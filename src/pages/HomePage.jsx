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
        className="flex flex-col h-screen items-center justify-center px-4 sm:px-0" // Added padding for mobile view
        id="home"
      >
        <p className="text-5xl sm:text-9xl text-center font-bold text-white uppercase">
          {" "}
          {/* Adjusted font size for small screens and above */}
          make <br />
          new <br />
          revolution
        </p>
      </div>
      <CardPage />
      <Footer />
    </>
  );
};

export default HomePage;
