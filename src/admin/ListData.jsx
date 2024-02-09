import React, { useState, useEffect } from "react";
import { supabase } from "../createClient";
import { v4 as uuidv4 } from "uuid";

const ListData = () => {
  const [warehouses, setWarehouses] = useState([]);

  const [imageUpload, setImageUpload] = useState([]);

  const [warehouse, setWarehouse] = useState({
    product_name: "",
    product_desc: "",
    product_type: "",
    product_price: "",
    product_total: "",
  });

  const [warehouse2, setWarehouse2] = useState({
    id: "",
    product_name: "",
    product_desc: "",
    product_type: "",
    product_price: "",
    product_total: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await supabase.from("warehouses").select("*");
    setWarehouses(data);
    // console.log(data);
  }

  const createData = async (e) => {
    e.preventDefault();

    const filename = `${uuidv4(imageUpload.name)}`;

    try {
      const { data } = await supabase.storage
        .from("warehouse_images")
        .upload(`images/${filename}`, imageUpload, {
          cacheControl: "3600",
          upsert: true,
        });
      if (data) {
        console.log("upload image success");
      }
    } catch (error) {
      console.error(error);
    }

    const { error } = await supabase.from("warehouses").insert({
      product_name: warehouse.product_name,
      product_desc: warehouse.product_desc,
      product_type: warehouse.product_type,
      product_price: warehouse.product_price,
      product_total: warehouse.product_total,
      images: filename,
    });

    if (error) {
      console.error("Error creating data:", error);
    } else {
      window.location.reload();
    }
  };

  async function deleteData(warehouseId) {
    await supabase.from("warehouses").delete().eq("id", warehouseId);
    fetchData();
  }

  async function updateData(userId) {
    // e.preventDefault()
    const { error } = await supabase
      .from("warehouses")
      .update({
        product_name: warehouse2.product_name,
        product_desc: warehouse2.product_desc,
        product_type: warehouse2.product_type,
        product_price: warehouse2.product_price,
        product_total: warehouse2.product_total,
      })
      .eq("id", userId);

    fetchData();

    if (error) {
      console.error("Error update data:", error);
    } else {
      window.location.reload();
    }
  }

  function handleChange(event) {
    setWarehouse((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleChange2(event) {
    setWarehouse2((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function displayWarehouse(userId) {
    warehouses.map((warehouse) => {
      if (warehouse.id == userId) {
        setWarehouse2({
          id: warehouse.id,
          product_name: warehouse.product_name,
          product_desc: warehouse.product_desc,
          product_type: warehouse.product_type,
          product_price: warehouse.product_price,
          product_total: warehouse.product_total,
        });
      }
    });
  }

  const handleImage = (e) => {
    setImageUpload(e.target.files[0]);
    // console.log(e.target.files[0]);
  };

  return (
    <section className="">
      {/* form 1 */}
      <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action flex items-center justify-center">
            <form
              method="dialog"
              className="flex flex-col gap-3 w-full"
              onSubmit={createData}
            >
              <label className="text-base font-medium">Product Name</label>
              <input
                className="input input-bordered border-black input-md"
                name="product_name"
                type="text"
                placeholder="type here..."
                onChange={handleChange}
              />
              <label className="text-base font-medium">
                Product Description
              </label>
              <input
                className="input input-bordered border-black input-md"
                name="product_desc"
                type="text"
                placeholder="type here..."
                onChange={handleChange}
              />
              <label className="text-base font-medium">Product Type</label>
              <input
                className="input input-bordered border-black input-md"
                name="product_type"
                type="text"
                placeholder="type here..."
                onChange={handleChange}
              />
              <label className="text-base font-medium">Product Price</label>
              <input
                className="input input-bordered border-black input-md"
                name="product_price"
                type="text"
                placeholder="type here..."
                onChange={handleChange}
              />
              <label className="text-base font-medium">Product Total</label>
              <input
                className="input input-bordered border-black input-md"
                name="product_total"
                type="number"
                placeholder="type here..."
                onChange={handleChange}
              />
              <label className="text-base font-medium">Product Image</label>
              <input
                className="file-input file-input-bordered w-full"
                name="product_image"
                type="file"
                placeholder="type here..."
                onChange={handleImage}
              />

              <button type="submit" className="btn btn-success mt-5">
                Add
              </button>
              <button className="btn btn-outline btn-error">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* form 2 */}

      <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action flex items-center justify-center">
            <form
              method="dialog"
              className="flex flex-col gap-3 w-full"
              onSubmit={() => updateData(warehouse2.id)}
            >
              <label className="text-base font-medium">Product Name</label>
              <input
                className="input input-bordered border-black input-md"
                name="product_name"
                type="text"
                placeholder="type here..."
                onChange={handleChange2}
                defaultValue={warehouse2.product_name}
              />
              <label className="text-base font-medium">
                Product Description
              </label>
              <input
                className="input input-bordered border-black input-md"
                name="product_desc"
                type="text"
                placeholder="type here..."
                onChange={handleChange2}
                defaultValue={warehouse2.product_desc}
              />
              <label className="text-base font-medium">Product Type</label>
              <input
                className="input input-bordered border-black input-md"
                name="product_type"
                type="text"
                placeholder="type here..."
                onChange={handleChange2}
                defaultValue={warehouse2.product_type}
              />
              <label className="text-base font-medium">Product Price</label>
              <input
                className="input input-bordered border-black input-md"
                name="product_price"
                type="text"
                placeholder="type here..."
                onChange={handleChange2}
                defaultValue={warehouse2.product_price}
              />
              <label className="text-base font-medium">Product Total</label>
              <input
                className="input input-bordered border-black input-md"
                name="product_total"
                type="number"
                placeholder="type here..."
                onChange={handleChange2}
                defaultValue={warehouse2.product_total}
              />
              <label className="text-base font-medium">Product Image</label>
              <input
                className="input input-bordered border-black input-md"
                name="product_image"
                type="file"
                placeholder="type here..."
                onChange={handleChange2}
                defaultValue={warehouse2.product_image}
              />

              <button type="submit" className="btn btn-success mt-5">
                Save Changes
              </button>
              <button className="btn btn-outline btn-error">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <h2 className="py-5 text-2xl text-center font-medium">Product Data</h2>
      <div className="overflow-x-auto px-5">
        <div className="py-3">
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            + create data
          </button>
        </div>
        <table className="table table-zebra border-2 border-black">
          {/* head */}
          <thead className="text-center">
            <tr className="border-2 border-black">
              <th>No</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Product Type</th>
              <th>Product Price</th>
              <th>Product Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {warehouses.map((i, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{i.product_image}</td>
                <td>{i.product_name}</td>
                <td>{i.product_desc}</td>
                <td>{i.product_type}</td>
                <td>{i.product_price}</td>
                <td>{i.product_total}</td>
                <td>
                  <button
                    className="btn btn-error text-white"
                    onClick={() => {
                      deleteData(i.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary text-white mx-1"
                    onClick={() => {
                      displayWarehouse(i.id);
                      document.getElementById("my_modal_2").showModal();
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ListData;
