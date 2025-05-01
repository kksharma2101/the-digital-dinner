import React from "react";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "75vh" }}>
        <Toaster />
        {children}
      </main>
    </>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app Shop Now",
  description: "MERN Stack Project",
  keywords: "MERN React Nodejs Mongoose Express",
  author: "kamal sharma",
};

export default Layout;
