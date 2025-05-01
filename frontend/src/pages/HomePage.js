import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "./homepage.css";

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
        `${process.env.REACT_APP_API_URL}/api/menu-product/filter-product`,
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
      {/* add craousel */}
      {/* <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/images/banner1.png"
              className="d-block w-100"
              alt="craousel"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/banner2.png"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/banner3.png"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
      </div> */}
      {/* end craousel */}
      <div className="container-fluid row mt-2 home-page">
        <div className="col-md-2 filters">
          <h5 className="mt-2">Prices</h5>
          <div className="d-flex flex-column ms-1">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array} className="color">
                    {p.name}
                  </Radio> 
                </div>
              ))}
            </Radio.Group>
          </div>
          <h5 className="">Category</h5>
          <div className="d-flex flex-column ms-1">
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
        <div className="col-md-10 ">
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((pro) => (
              <div className="card m-2" key={pro._id}>
                <img
                  src={`${process.env.REACT_APP_API_URL}/menu-product/product-photo/${pro._id}`}
                  className="card-img-top"
                  alt={pro.name}
                  width={"100%"}
                  height={"300px"}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{pro.name}</h5>
                    <h5 className="card-title card-price">
                      {pro.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {pro.description.substring(0, 40)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      href="#"
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${pro.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      href="#"
                      className="btn btn-secondary ms-1"
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
      </div>
    </Layout>
  );
};

export default Homepage;
