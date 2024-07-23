"use client";

import React from "react";
import Container from "./Container";
import { IoAccessibilityOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();
  const year = new Date().getFullYear();

  const sitemaps = [
    {
      name: "Features",
      paths: [
        {
          name: "Cool stuff",
          path: "/",
        },
        {
          name: "Random feature",
          path: "/",
        },
        {
          name: "Team feature",
          path: "/",
        },
        {
          name: "Stuff for developers",
          path: "/",
        },
        {
          name: "Another one",
          path: "/",
        },
        {
          name: "Last time",
          path: "/",
        },
      ],
    },
    {
      name: "Resources",
      paths: [
        {
          name: "Resource",
          path: "/",
        },
        {
          name: "Resource name",
          path: "/",
        },
        {
          name: "Another resource",
          path: "/",
        },
        {
          name: "Final resource",
          path: "/",
        },
      ],
    },
    {
      name: "About",
      paths: [
        {
          name: "Team",
          path: "/",
        },
        {
          name: "Locations",
          path: "/",
        },
        {
          name: "Privacy",
          path: "/",
        },
        {
          name: "Terms",
          path: "/",
        },
      ],
    },
    {
      name: "Contact",
      paths: [
        {
          name: "Help",
          path: "/",
        },
        {
          name: "Sales",
          path: "/",
        },
        {
          name: "Advertise",
          path: "/",
        },
      ],
    },
  ];
  return (
    <footer className="footer-1 bg-gray-100 py-8 sm:py-12 m-4 p-4 rounded-xl">
      <div className="container mx-auto px-4">
        <div className="sm:flex sm:flex-wrap sm:-mx-4 md:py-4">
          {sitemaps.map((sitemap, index) => (
            <div key={index} className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6">
              <h5 className="text-xl font-bold mb-6">{sitemap.name}</h5>
              <ul className="list-none footer-links">
                {sitemap.paths.map((path, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      href={path.path}
                      className="border-b border-solid border-transparent hover:border-black hover:text-black"
                    >
                      {path.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="px-4 mt-4 sm:w-1/3 xl:w-1/6 sm:mx-auto xl:mt-0 xl:ml-auto">
            <h5 className="text-xl font-bold mb-6 sm:text-center xl:text-left">
              Stay connected
            </h5>
            <div className="flex flex-col sm:justify-center xl:justify-start">
              <Link
                href="/"
                className="border-b border-solid border-transparent hover:border-black hover:text-black w-fit mb-2"
              >
                GitHub
              </Link>
              <Link
                href="/"
                className="border-b border-solid border-transparent hover:border-black hover:text-black w-fit mb-2"
              >
                LinkedIn
              </Link>
              <Link
                href="/"
                className="border-b border-solid border-transparent hover:border-black hover:text-black w-fit mb-2"
              >
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
