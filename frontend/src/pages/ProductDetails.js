import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});

  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/menu-product/single-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="flex justify-center flex-col mt-5">
        <div className="max-w-96 mx-auto">
          <div className="bg-white flex justify-center items-center">
            <img
              src={`${process.env.REACT_APP_API_URL}/menu-product/product-photo/${product._id}`}
              class="card-img-top"
              alt={product.name}
              //   height={100}
              width={100}
            />
          </div>
          <div className="flex justify-center flex-col gap-2 p-4">
            <h1>{product?.name}</h1>
            <h2>$ {product?.price}</h2>
            <h4>{product?.category?.name}</h4>
            <h6>{product?.description}</h6>
            <button
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item add to cart successfully");
              }}
              href="#"
              className="bg-gray-400 cursor-pointer py-1 px-2 rounded-md text-sm hover:bg-gray-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
