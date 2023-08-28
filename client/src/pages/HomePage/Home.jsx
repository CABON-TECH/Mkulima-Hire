import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import About from "./About";
import Hero from "./Hero";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <Box>
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </Box>
  );
};

export default Home;
