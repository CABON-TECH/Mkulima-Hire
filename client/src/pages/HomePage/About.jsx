import { Box, Typography } from "@mui/material";
//
import farm1 from "../../assets/farm1.svg";
import farm2 from "../../assets/farm2.svg";
import farm3 from "../../assets/farm3.svg";

const About = () => {
  const aboutArr = [
    {
      title: "Unlocking Agricultural Talent",
      sub: "Discover Skilled Workers for Your Farm",
      pic: farm1,
    },
    {
      title: "Seamless Hiring and Connection",
      sub: "Effortlessly Connect with Experienced Farmhands",
      pic: farm3,
    },
    {
      title: "Optimized Operations",
      sub: "Save Time and Costs while Boosting Efficiency",
      pic: farm2,
    },
  ];

  return (
    <Box className="bg-[#f3f3f2] mt-10 rounded-lg text-center px-10 py-10">
      <Typography fontSize="2rem" fontWeight={600}>
        The community is growing.{" "}
        <span className="text-[#74c116]">Be a part</span>
      </Typography>
      <Box className="lg:flex justify-center gap-x-12 mt-5 mx-auto w-fit">
        {aboutArr.map((item) => (
          <Box key={item.title}>
            <Typography
              fontSize="1.2rem"
              textAlign={"left"}
              fontWeight={500}
              className="whitespace-nowrap"
            >
              {item.title}
            </Typography>
            <hr className="border-[#74c116] border-[1.5px] my-2 lg:w-full w-72" />
            <Typography className="pb-5" textAlign={"left"}>
              {item.sub}
            </Typography>
            <img
              src={item.pic}
              alt="farm"
              className="w-[250px] lg:mx-auto mt-5"
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default About;
