import React from "react";
import { Toaster } from "react-hot-toast";

const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          fontSize: "2.4rem",
        },
        success: {
          style: {
            color: "var(--main-color)",
          },
          iconTheme: {
            primary: "var(--main-color)",
            secondary: "white",
          },
        },
        error: {
          style: {
            color: "var(--main-color)",
          },
        },
      }}
    />
  );
};

export default CustomToaster;
