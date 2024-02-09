import React from "react";
import { useAuth } from "../auth/AuthProvider";

const User = () => {
  const { user, logout, username, role } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await logout();
      if (!error) {
        alert("Logout Success");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {role === "admin" ? 
      <>
       <section className="h-screen bg-[#282726]">
        <div className="p-10 ">
        <figure>
            <img src="public/images/profilebg.jpg" className="w-full h-[300px] rounded-3xl object-center blur-[2px]" />
            <img src="public/images/profile.png" className="" width={140} height={140} alt="" />
        </figure>
       
        </div>

       </section>
    </> : 
    <>
    Profile User
    </>}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default User;
