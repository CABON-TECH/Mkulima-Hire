import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const drawerWidth = 240;
const navItems = [
  { name: "Home", route: "/" },
  { name: "About", route: "/about" },
  { name: "Contact", route: "/contact" },
];

export default function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const user = useSelector((state) => state?.auth.user);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link key={item.name} to={item.route} className="mx-auto">
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        {!user ? (
          <Box>
            <Link to="/login" className="mx-auto">
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText sx={{ color: "#2b2b2b" }} primary="Log In" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/register" className="mx-auto">
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <ListItemText
                    sx={{
                      borderRadius: "4px",
                      color: "#ffff",
                      background: "#74c116",
                      px: 2,
                      py: 1,
                    }}
                    primary="Get Started"
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </Box>
        ) : (
          <Link to="/dashboard" className="mx-auto">
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  textAlign: "center",
                }}
              >
                <ListItemText
                  sx={{
                    borderRadius: "4px",
                    color: "#ffff",
                    background: "#74c116",
                    px: 2,
                    py: 1,
                  }}
                  primary="Dashboard"
                />
              </ListItemButton>
            </ListItem>
          </Link>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" elevation={0} sx={{ background: "#fff" }}>
        <Toolbar
          sx={{
            marginInline: { sm: 2, md: 8 },
            color: "#2b2b2b",
            display: { sm: "flex" },
            justifyContent: { sm: "space-between" },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Mkulima-Hire
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                className={({ isActive }) =>
                  isActive
                    ? " text-[#74c116] px-5 no-underline"
                    : "text-[#2b2b2b] px-5 no-underline"
                }
                to={item.route}
              >
                {item.name}
              </NavLink>
            ))}
          </Box>
          {location.pathname !== "/login" &&
            location.pathname !== "/register" && (
              <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "1rem" }}>
                {user ? (
                  <Link to="/dashboard">
                    <Button
                      sx={{
                        color: "#ffff",
                        background: "#74c116",
                        px: 2,
                        py: 1,
                        "&:hover": {
                          backgroundColor: "#74c116",
                        },
                      }}
                    >
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    {location.pathname !== "/login" &&
                      location.pathname !== "/register" && (
                        <>
                          <Link to="/login">
                            <Button
                              sx={{
                                color: "#2b2b2b",
                                "&:hover": {
                                  backgroundColor: "#ffffff",
                                },
                              }}
                            >
                              Log In
                            </Button>
                          </Link>
                          <Link to="/register">
                            <Button
                              sx={{
                                color: "#ffff",
                                background: "#74c116",
                                px: 2,
                                py: 1,
                                "&:hover": {
                                  backgroundColor: "#74c116",
                                },
                              }}
                            >
                              Get Started
                            </Button>
                          </Link>
                        </>
                      )}
                  </>
                )}
              </Box>
            )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
