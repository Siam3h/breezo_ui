import { TypeAnimation } from "react-type-animation";

const AlternatingTagline = () => {
  return (
    <p className="text-center text-base sm:text-lg md:text-xl font-medium whitespace-nowrap inline-block">
      Rent{" "}
      <span className="font-bold text-breezo-green">
        <TypeAnimation
          sequence={["Fast", 2000, "Clean", 2000, "Affordable", 2000]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          speed={20}
          deletionSpeed={20}
        />
      </span>{" "}
      E-bikes and Scooters.
    </p>
  );
};

export default AlternatingTagline;
