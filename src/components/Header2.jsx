import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { supabase } from "../createClient";

const Header2 = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [getTotalCart, setGetTotalCart] = useState("");
  
  const totalCart = async () => {
    const { data } = await supabase.from("cart").select("*");
    setGetTotalCart(data.length);
  };
  
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await logout();
      if (!error) {
        alert("Logout Success!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const scroll = () => {
    window.addEventListener("scroll", function () {
      const header = document.querySelector("header");
      header.classList.toggle("sticky", window.scrollY > 0);
    });
  };

  useEffect(() => {
    scroll();
    totalCart();

    supabase
      .channel("cart")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "cart",
        },
        () => {
          totalCart();
        }
      )
      .subscribe();
  }, []);

  return (
    <header className="header absolute w-full px-4 lg:px-10 py-2 z-10 bg-white border border-[#c3c3c3]">
      <div className="flex items-center justify-between">
        <h2 className="hidden sm:block text-xs lg:text-base">hola {user.email}</h2>
        <div className="flex-grow text-left lg:text-center">
          <h2 className="text-lg lg:text-xl text-black cursor-pointer font-bold">
            rarehouse
          </h2>
        </div>
        {user ? (
          <div className="flex">
            <Link to={`/cart`}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {getTotalCart}
                  </span>
                </div>
              </div>
            </Link>

            <div className="dropdown dropdown-end">
              <div className="dropdown dropdown-end lg:mx-3 ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-8 lg:w-10 rounded-full">
                    <img
                      alt="Profile"
                      src="../images/profile.png"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box lg:w-52"
                >
                  <li>
                  <Link to={`/profile`}>
                    <a className="justify-between">
                      Profile
                    </a>
                    </Link>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <Link to={"/login"}>
            <button className="bg-white mx-1 text-black text-xs lg:text-base px-3 lg:px-7 py-1 lg:py-1.5 rounded-3xl border-2 border-black transition duration-300 hover:bg-black hover:text-white">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header2;
