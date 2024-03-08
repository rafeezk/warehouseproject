import React, { useEffect, useState } from "react";
import { supabase } from "../createClient";
import Card from "../components/Card";

const CardPage = () => {
  const [getData, setGetData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  async function getProduct() {
    const { data } = await supabase.from("warehouses").select("*");
    setGetData(data);
  }

  const getImage = (filename) => {
    const publicUrl = supabase.storage
      .from("warehouse_images")
      .getPublicUrl("images/" + filename).data.publicUrl;
    return publicUrl;
  };

  const displayData = showMore ? getData : getData.slice(0, 5);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {/* bg-282726 */}
      <section className="bg-[#F3F4F6]">
        <h2 className="py-8 font-bold text-3xl text-center text-black italic underline">
          featured products
        </h2>
        {/* <h2 className="font-semibold text-xs text-white text-center pb-8 uppercase mt-1">products</h2> */}
        <div className="flex flex-wrap justify-center items-center py-5 gap-10">
          {displayData.map((i) => (
            <Card key={i.id} i={i} getImage={getImage} />
          ))}
        </div>

        <div className="flex justify-center items-center py-5">
          {showMore ? (
            <button
              className="border border-black text-black h-10 mt-5 hover:bg-black hover:text-white duration-500 rounded-full w-40"
              onClick={() => setShowMore(false)}
            >
              Show Less
            </button>
          ) : (
            <button
              className="border border-black text-black h-10 mt-5 hover:bg-black hover:text-white duration-500 rounded-full w-40"
              onClick={() => setShowMore(!showMore)}
            >
              Show More
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default CardPage;

/* <div className="card w-60 h-[340px] shadow-xl glass text-white">
            <figure>
              <img
                src="/images/cardimage.jpg"
                className="h-36 w-full object-cover"
              />
            </figure>
            <div className="card-body h-32">
              <h2 className="card-title text-balance">Rafeyproject T-shirt</h2>
              <div className="flex">
                <p>$ 22.000</p>
                <p className="text-end">⭐10K+</p>
              </div>
              <div className="card-actions justify-center">
                <button className="btn btn-outline w-full mt-2 border-white text-white hover:bg-white hover:text-black">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className="card w-60 h-[340px] shadow-xl glass text-white ">
            <figure>
              <img
                src="/images/cardimage.jpg"
                className="h-36 w-full object-cover"
              />
            </figure>
            <div className="card-body h-32">
              <h2 className="card-title text-balance">Rafeyproject T-shirt</h2>
              <div className="flex">
                <p>$ 22.000</p>
                <p className="text-end">⭐10K+</p>
              </div>
              <div className="card-actions justify-center">
                <button className="btn btn-outline w-full mt-2 border-white text-white hover:bg-white hover:text-black">
                  Buy Now
                </button>
              </div>
            </div>
          </div> */
