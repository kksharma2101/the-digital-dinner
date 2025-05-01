import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const CreateMenuItem = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [available, setAvailable] = useState("");

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // handle Create
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("availbale", available);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/menu-product/create-menu-item`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin");
      } else {
        toast.error("Error in product created");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="flex justify-center items-center flex-col gap-10 p-5">
        <h2 className="text-center font-bold text-lg">Create Product</h2>
        {photo && (
          <div className="text-center">
            <img
              src={URL.createObjectURL(photo)}
              alt="product"
              height={"200px"}
              className="img img-responsive"
            />
          </div>
        )}

        <div className="flex justify-center flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={name}
              placeholder="Write a name"
              className="border p-2 rounded-md min-w-36 max-w-xs"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="number"
              value={price}
              placeholder="Price"
              className="border p-2 rounded-md min-w-36 max-w-xs"
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="text"
              value={available}
              placeholder="Available Product"
              className="border p-2 rounded-md min-w-36 max-w-xs"
              onChange={(e) => setAvailable(e.target.value)}
            />
            <Select
              className="min-w-36 max-w-xs"
              placeholder="Select a category"
              size="large"
              showSearch
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className="block w-full">
            <textarea
              type="text"
              value={description}
              placeholder="Description"
              className="border p-2 rounded-md w-full mb-4"
              onChange={(e) => setDescription(e.target.value)}
            />

            <label className="text-center text-sm font-serif">
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => {
                  setPhoto(e.target.files[0]);
                }}
                className="border p-2 rounded-md w-full"
              />
              {photo ? photo.name : "pload photo"}
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 font-bold py-1 hover:bg-blue-400 min-w-52 rounded-md"
          onClick={handleCreate}
        >
          Create Product
        </button>
        <AdminMenu />
      </div>
    </Layout>
  );
};

export default CreateMenuItem;
