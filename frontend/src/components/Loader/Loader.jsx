import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <ThreeCircles
      color="var(--main-color)"
      wrapperStyle={{
        width: "100%",
        height: "50rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};

export default Loader;
