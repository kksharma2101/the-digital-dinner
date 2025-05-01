import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Homepage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(false);

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/category/get-category`
      );
      if (data?.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    // getAllProducts()
  }, []);

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/menu-product/get-menu-product`
      );
      setLoading(false);
      // if (data?.success) {
      setProducts(data?.product);
      // }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((cate) => cate !== id);
    }
    setChecked(all);
  };

  // filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/menu-product/filter-product`,
        {
          checked,
          radio,
        }
      );
      if (data?.success) {
        setProducts(data?.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="w-full">
        {/* price and category filter */}
        <div className="flex justify-start items-start gap-4 flex-col px-2">
          <div className="">
            <h5 className="font-bold font-serif">Category</h5>
            <div className="flex gap-2 items-start">
              {category?.map((cat) => (
                <Checkbox
                  key={cat._id}
                  onChange={(e) => {
                    handleFilter(e.target.checked, cat._id);
                  }}
                  className="color"
                >
                  {cat.name}
                </Checkbox>
              ))}
            </div>
          </div>
          <div className="">
            <h5 className="font-bold font-serif">Prices</h5>
            <Radio.Group
              onChange={(e) => setRadio(e.target.value)}
              className="flex"
            >
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array} className="color">
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>

        <div className="flex justify-center items-center gap-5 mt-5">
          {products?.map((pro) => (
            <div className="max-w-52 m-2" key={pro._id}>
              <img
                src={`${process.env.REACT_APP_API_URL}/menu-product/product-photo/${pro._id}`}
                className="w-fit h-fit rounded-md"
                alt={pro.name}
              />
              <div className="">
                <div className="flex justify-between my-3">
                  <h5 className="font-mono">{pro.name}</h5>
                  <h5 className="font-mono">
                    {pro.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="my-2">{pro.description.substring(0, 40)}...</p>
                <div className="flex justify-between">
                  <button
                    href="#"
                    className="bg-blue-500 cursor-pointer py-1 px-2 rounded-md text-sm hover:bg-blue-400"
                    onClick={() => navigate(`/product/${pro.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    href="#"
                    className="bg-gray-400 cursor-pointer py-1 px-2 rounded-md text-sm hover:bg-gray-300"
                    onClick={() => {
                      setCart([...cart, pro]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, pro])
                      );
                      toast.success("Item add to cart successfully");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
