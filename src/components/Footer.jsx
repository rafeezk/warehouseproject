import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer footer-center p-10 bg-black text-primary-content">
        <aside>
          <svg
            width={66}
            height={95}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.674 106.201l11.068-.365 11.401-21.565c6.304-11.98 11.802-21.696 12.335-21.694.667.002 1.036 9.87.998 22.003l-.07 22 10 .031 10 .032.166-52.8L67.74.91l-19.736.604C32.135 1.998 27.2 2.65 22.393 4.767 11.31 9.666 6.083 18.717 6.038 32.717 5.872 43.381 10.38 51.53 18.897 56.622c6.122 3.62 6.786 4.422 4.78 6.549-.537.798-6.035 10.78-12.071 22.362L.473 106.566l11.201-.365zm15.855-81.15c2.008-2.528 4.01-3.188 11.345-3.565l8.801-.506-.034 10.933-.034 10.934-8.798-.561c-9.998-.698-13.856-3.644-13.834-10.444.006-2 1.082-5.063 2.554-6.792z"
              fill="#fff"
            />
          </svg>
          <p className="font-bold">
            RareHouse Industries Ltd. <br />
            {/* Providing reliable tech since 1992 */}
          </p>
          <p>Copyright © 2024 - All right reserved</p>
        </aside>
        <nav>
          <p className="mb-1">keep in touch with us!</p>
          <div className="grid grid-flow-col gap-4">
            <FontAwesomeIcon
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-white cursor-pointer text-3xl"
              icon="fa-brands fa-instagram"
            />
            <FontAwesomeIcon
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-white cursor-pointer text-3xl"
              icon="fa-brands fa-github"
            />
            <FontAwesomeIcon
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-white cursor-pointer text-3xl"
              icon="fa-brands fa-dribbble"
            />
          </div>
        </nav>
      </footer>
    </>
  );
};

export default Footer;

// <footer className="footer p-5 bg-[#282726] text-center items-center justify-center border-t border-black text-white">
//   <div>
//     <p>rafeyproject | Copyright &copy; 2023</p>
//   </div>
// </footer>
