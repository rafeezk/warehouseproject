import React, { useEffect, useState } from "react";
import { supabase } from "../createClient";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const DetailPage = () => {
  const [getDetail, setGetDetail] = useState([]);
  const {user} = useAuth()
  const { id } = useParams();
  const getImage = (filename) => {
    const publicUrl = supabase.storage
      .from("warehouse_images")
      .getPublicUrl("images/" + filename).data.publicUrl;
    return publicUrl;
  };

  async function fetchDetail(productId) {
    const { data } = await supabase
      .from("warehouses")
      .select("*")
      .eq("id", productId);
    setGetDetail(data[0]);
  }

  async function dataCart() {
    try {
      const { data, error } = await supabase
        .from("cart")
        .insert([
          {
            id_user: user.id,
            cart_name: getDetail.product_name,
            cart_desc: getDetail.product_desc,
            cart_type: getDetail.product_type,
            cart_price: getDetail.product_price,
            cart_total: 1

          }
        ]);
      if (error) {
        throw error;
      }
      console.log(data);
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  }

  const handleCart = async => {
    if (user === null) {
      window.location.href("/login")
    } else {
      dataCart()
    }
}
  // console.log(getDetail);

  useEffect(() => {
    fetchDetail(id);
  }, [id]);

  return (
    <>
      <section className="h-screen flex justify-center items-center bg-[#282726]">
        <div
          className="card lg:card-side h-[550px] w-[1250px] shadow-xl shadow-[#363636] glass bg-black "
          key={getDetail.id}
        >
          <figure className="w-[1500px]">
            <img
              src={getImage(getDetail.images)}
              className="object-cover h-full"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl text-white">
              {getDetail.product_name}
            </h2>
            <p className="text-balance py-5 font-medium text-gray-300">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci
              non voluptates repellendus aliquam quo tenetur beatae assumenda
              eius error praesentium quas, minus eveniet necessitatibus eaque
              suscipit harum. Tenetur hic adipisci quia impedit aliquid facilis
              cupiditate quo quis. Officiis, repellat vel.
            </p>
            <div className="flex w-full">
            <div className="flex-col w-40">
              <h2 className="text-lg text-white">price</h2>
              <h1 className="text-2xl text-white font-bold mt-1">
                Rp {getDetail.product_price}
              </h1>
              </div>
              <h2 className="w-fit">stock: {getDetail.product_total}</h2>
            
            </div>
            <div className="flex w-full">
              <button className="btn bg-white hover:bg-black hover:text-white border-none rounded-none w-[570px]" onClick={handleCart}>
                checkout
              </button>
              <button className="btn rounded-none bg-black text-white">Cart</button>
              <button className="btn rounded-none bg-black text-white">Chat</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailPage;
