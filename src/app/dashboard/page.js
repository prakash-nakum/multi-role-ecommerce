import PrivateRoute from "@/components/shared/PrivateRoute";
import Dashboard from "@/components/shared/layouts/Dashboard";
import Image from "next/image";
import React from "react";
import banner from '../../../assets/ciseco-ecommerce.png'

const ControlPanel = () => {
  return (
    <Dashboard>
      <PrivateRoute>
        <div className="w-full flex justify-center items-center">
          <Image className="h-auto w-full" src={banner} alt="benner" ></Image>
        </div>
      </PrivateRoute>
    </Dashboard>
  );
};

export default ControlPanel;
