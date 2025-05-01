import React from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();

  // handle totalPrice
  const totalPrice = () => {
    try {
      let total = 0;
      cart.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // handle  RemoveItem
  const handleRemoveItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="p-2">
        <div>
          <div className="row">
            <h1 className="text-center font-bold text-lg">
              {`Hello Mr/Mis ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center mt-1 text-secondary">
              {cart?.length
                ? `You have ${cart?.length} item in your cart ${
                    !auth?.user ? "Please checkout login" : ""
                  } `
                : "Your cart is empty"}
            </h4>
          </div>

          <div className="row">
            <div className="flex justify-center items-center gap-5 mt-5">
              {cart?.map((pro) => (
                <div className="max-w-52 m-2" key={pro._id}>
                  <div className="col-md-5">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/menu-product/product-photo/${pro._id}`}
                      className="card-img-top"
                      alt={pro.name}
                      width={"100%"}
                      height={"90%"}
                    />
                  </div>
                  <div className="flex justify-between flex-col my-3">
                    <p className="font-mono">{pro?.name}</p>
                    <p className="font-mono">
                      {pro?.description.substring(0, 50)}
                    </p>
                    <p className="font-mono">
                      {pro.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                    <button
                      className="bg-red-600 py-1 rounded-md my-3"
                      onClick={() => handleRemoveItem(pro._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-5 text-center">
              <h2>Cart Summary</h2>
              <h4 className="text-secondary">Total | Checkout | Payment</h4>
              <hr />
              <h4>Total: {totalPrice()}</h4>
              {/* <div className="mt-2 mb-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        // paypal: {
                        //   flow: "vault",
                        // },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading
                        ? ("Processing ....", console.log(loading))
                        : "Make Payment"}
                    </button>
                  </>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
