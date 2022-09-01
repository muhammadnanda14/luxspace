import React from "react";
import Header from "parts/Header";
import Breadcrumb from "components/Breadcrumb";
import ProductDetails from "parts/Details/ProductDetails";
import Suggestion from "parts/Details/Suggestion";
import Sitemap from "parts/Sitemap";
import Footer from "parts/Footer";

export default function HomePage() {
  return (
    <>
      <Header theme="black" />
      <Breadcrumb
        List={[
          { url: "/", name: "Home" },
          { url: "/categories/12388", name: "Office Room" },
          { url: "/categories/12388/products/8123", name: "Details" },
        ]}
      />
      <ProductDetails />
      <Suggestion />
      <Sitemap />
      <Footer />
    </>
  );
}
