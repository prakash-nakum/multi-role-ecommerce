"use client";

import React from "react";
import Sidebar from "../Sidebar";
import Container from "../Container";

const Dashboard = ({ children }) => {
  return (
    <Container className="p-4 md:h-screen min-h-screen ">
      <section className="grid grid-cols-12 gap-4 h-full overflow-y-auto">
        <Sidebar />
        <div className="md:col-span-9 col-span-12 overflow-y-auto rounded">
          {children}
        </div>
      </section>
    </Container>
  );
};

export default Dashboard;
