"use client";

import React, { useState, useEffect } from "react";
import { TopBar } from "./components/TopBar";
import { DrawerMenu } from "./components/DrawerMenu";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <TopBar scrolled={scrolled} setMobileMenuOpen={setMobileMenuOpen} />
      <DrawerMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
    </>
  );
};

export default Header;
