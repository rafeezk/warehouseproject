import React, { useEffect, useState } from "react";
import { supabase } from "../createClient";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Header2 from "../components/Header2";

const DetailPage = () => {
  const [getDetail, setGetDetail] = useState([]);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

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

  async function addCart(id) {
    const { data } = await supabase.from("warehouses").select("*").eq("id", id);
    try {
      if (data) {
        const { error } = await supabase
          .from("cart")
          .insert([
            {
              id_user: user.id,
              id_product: data[0].id,
              cart_name: getDetail.product_name,
              cart_desc: getDetail.product_desc,
              cart_type: getDetail.product_type,
              cart_price: getDetail.product_price,
              cart_total: 1,
              cart_image: getDetail.images,
            },
          ])
          .select();
        if (!error) {
          alert("add cart successfull!");
        }
      }
      console.log(data);
    } catch (error) {
      console.error("login", error.message);
      navigate("/login");
    }
  };

  const toRupiah = (price, options = {}) => {
    const dot = options.dot || '.';
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
    return formatter.format(price).replace(',', dot);
  };

  function truncate(str, length) {
    if (!str) {
      return ""
    }
    return str.length > length ? str.substring(0, length) + "..." : str;
  }

  

  useEffect(() => {
    fetchDetail(id);
  }, [id]);

  return (
    <>
      <Header2 />
      <section className="h-screen flex justify-center items-center bg-[#F3F4F6]">
        <div className="pt-10">
          <div
            className="card lg:card-side h-auto lg:h-[550px] w-full lg:w-[1250px] lg:rounded-2xl rounded-none shadow-xl shadow-[#363636] glass bg-black"
            key={getDetail.id}
          >
            <figure className="w-full lg:w-[490px]">
              <img
                src={getImage(getDetail.images)}
                className="object-cover h-full w-full"
                alt={getDetail.product_name}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-3xl text-white">
                {getDetail.product_name}
              </h2>
              <p className="text-balance py-5 font-medium text-gray-300 lg:w-[500px] lg:h-44">
              {showFullDesc ? getDetail.product_desc : truncate(getDetail.product_desc, 150)}
                {!showFullDesc && getDetail.product_desc && getDetail.product_desc.length > 150 && (
                  <button className="text-blue-500 text-balance text-center" onClick={() => setShowFullDesc(true)}>read more</button>
                )}
                
              </p>
              <div className="flex w-full justify-between">
                <div className="flex-col w-40">
                  <h2 className="text-lg text-white">price</h2>
                  <h1 className="text-2xl text-white font-bold mt-1">
                    {toRupiah(getDetail.product_price)}
                  </h1>
                </div>
                <h2 className="flex items-center text-white">stock: {getDetail.product_total}</h2>
              </div>
              <div className="flex w-full">
                <button className="btn bg-white hover:bg-white border-none rounded-s-md rounded-e-none w-1/2">
                  Buy
                </button>
                <button
                  className="btn bg-black text-white hover:bg-black rounded-e-md rounded-s-none w-1/2"
                  onClick={() => addCart(getDetail.id)}
                >
                  Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailPage;
