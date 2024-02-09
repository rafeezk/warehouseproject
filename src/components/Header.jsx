import React, { useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
  }, []);

  return (
    <header className="navbar px-10 py-5 absolute" id="header">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">rarehouse</a>
      </div>
      <div className="flex-none">
        {user ? (
          <>
            <h2 className="">hola {user.email}</h2>
            {/* <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className="px-1 text-black text-[25px]" /> */}
            <div className="dropdown dropdown-end">
              <div className="dropdown dropdown-end mx-3">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="/images/profile.png"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      {/* <span className="badge">New</span> */}
                    </a>
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
          </>
        ) : (
          <>
            {/* <button className="bg-[#DEDFDA] text-black text-base px-5 py-1 rounded transition duration-300 hover:bg-black hover:text-white">
              register
            </button> */}

            <Link to={"/login"}>
              <button className="bg-white mx-1 text-black text-base px-7 py-1 rounded-3xl border-2 border-black transition duration-300 hover:bg-black hover:text-white">
                login
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
