import React from "react";
import Header from "parts/Header";
import Hero from "parts/HomePages/Hero";
import JustArrived from "parts/HomePages/JustArrived";
import BrowseRoom from "parts/HomePages/BrowseRoom";
import Clients from "parts/Clients";
import Sitemap from "parts/Sitemap";
import Footer from "parts/Footer";
import useScrollAnchor from "helpers/hooks/useScrollAnchor";
import useModalDOM from "helpers/hooks/useModalDOM";

export default function HomePage() {
  useScrollAnchor();
  useModalDOM();
  return (
    <>
      <Header theme="white" position="absolute" />
      <Hero />
      <BrowseRoom />
      <JustArrived />
      <Clients />
      <Sitemap />
      <Footer />
    </>
  );
}
