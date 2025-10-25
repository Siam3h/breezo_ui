import { TypeAnimation } from "react-type-animation";

const AlternatingTagline = () => {
  return (
    <p className="w-[60%] sm:w-[60%] md:w-[60%] lg:w-[60%] xl:w-[60%] max-w-md mx-auto">
      Rent{" "}
      <span className="font-bold text-breezo-green">
        <TypeAnimation
          sequence={["Fast", 2000, "Clean", 2000, "Affordable", 2000]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          speed={20} // typing speed (lower = slower)
          deletionSpeed={20} // speed when deleting
        />
      </span>{" "} 
      electric assisted bikes and scooters for your daily city commute.
    </p>
  );
};

export default AlternatingTagline;
