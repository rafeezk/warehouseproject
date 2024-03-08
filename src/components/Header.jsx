import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../createClient";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [getTotalCart, setGetTotalCart] = useState("");
  const [profileName, setProfileName] = useState("");
  const [greetingMessage, setGreetingMessage] = useState("");

  const totalCart = async () => {
    const { data } = await supabase.from("cart").select("*");

    setGetTotalCart(data.length);
  };

  const greetingTime = () => {
    const currentTime = new Date().getHours();
    if (currentTime >= 4 && currentTime < 10) {
      setGreetingMessage("Selamat Pagi");
    } else if (currentTime >= 10 && currentTime < 15) {
      setGreetingMessage("Selamat Siang");
    } else if (currentTime >= 15 && currentTime < 18) {
      setGreetingMessage("Selamat Bersenja");
    } else {
      setGreetingMessage("Selamat Malam");
    }
  };

  const fetchProfileName = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();
      if (error) {
        throw error;
      }
      setProfileName(data.username);
    } catch (error) {
      console.error("Error fetching profile name:", error.message);
    }
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
    if (user) {
      fetchProfileName();
    }
    scroll();
    totalCart();
    greetingTime();

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
    <header className="navbar px-4 sm:px-10 py-4 absolute" id="header">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">rarehouse</a>
      </div>
      <div className="flex-none">
        {user ? (
          <>
            <h2 className="hidden me-2 text-[#f4f4f4] tracking-wider sm:block">
              {greetingMessage}, {profileName}!
            </h2>
            <Link to={`/cart`}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
              <div className="dropdown dropdown-end mx-3">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="public/images/profile.png"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to={`/profile`}>
                      <a className="justify-between">Profile</a>
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
