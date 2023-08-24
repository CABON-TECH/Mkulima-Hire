import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import About from "./About";
import Hero from "./Hero";
import Box from "@mui/material/Box";

const Home = () => {
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
