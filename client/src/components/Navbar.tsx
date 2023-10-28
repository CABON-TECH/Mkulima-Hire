import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import { RootState } from '../features/auth/AuthState';
import { AppDispatch } from '../features/auth/store';

const drawerWidth = 240;
const navItems = [
  { name: 'Home', route: '/' },
  { name: 'About', route: '/about' },
  { name: 'Contact', route: '/contact' },
];

export default function DrawerAppBar(props: { window: any }) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = useSelector((state: RootState) => state?.auth.user);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MkulimaHire
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link key={item.name} to={item.route} className="mx-auto">
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        {!user ? (
          <Box>
            <Link to="/login" className="mx-auto">
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText sx={{ color: '#2b2b2b' }} primary="Log In" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/register" className="mx-auto">
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  <ListItemText
                    sx={{
                      borderRadius: '4px',
                      color: '#ffff',
                      background: '#74c116',
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
          <Box>
            <Link
              to={`${
                user.role === 'farmer'
                  ? '/farmer-dashboard'
                  : '/worker-dashboard'
              }`}
              className="mx-auto"
            >
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  <ListItemText
                    sx={{
                      borderRadius: '4px',
                      color: '#ffff',
                      background: '#74c116',
                      px: 2,
                      py: 1,
                    }}
                    primary="Dashboard"
                  />
                </ListItemButton>
              </ListItem>
            </Link>

            <Button
              sx={{
                color: '#282828',
                px: 2,
                py: 1,
                '&:hover': {
                  backgroundColor: '#ffffff',
                },
              }}
              onClick={() => handleLogOut()}
            >
              Logout
            </Button>
          </Box>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogOut = () => {
    dispatch(logout());
    toast.success('Log Out successful');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ToastContainer />
      <CssBaseline />
      <AppBar component="nav" elevation={0} sx={{ background: '#fff' }}>
        <Toolbar
          sx={{
            marginInline: { sm: 2, md: 8 },
            color: '#2b2b2b',
            display: { sm: 'flex' },
            justifyContent: { sm: 'space-between' },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Mkulima-Hire
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                className={({ isActive }) =>
                  isActive
                    ? ' text-[#74c116] px-5 no-underline'
                    : 'text-[#2b2b2b] px-5 no-underline'
                }
                to={item.route}
              >
                {item.name}
              </NavLink>
            ))}
          </Box>
          {location.pathname !== '/login' &&
            location.pathname !== '/register' && (
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '1rem' }}>
                {user ? (
                  <Box className="flex gap-x-5 items-center">
                    <Button
                      sx={{
                        color: '#282828',
                        px: 2,
                        py: 1,
                        '&:hover': {
                          backgroundColor: '#ffffff',
                        },
                      }}
                      onClick={() => handleLogOut()}
                    >
                      Logout
                    </Button>
                    <Link
                      to={`${
                        user.role === 'farmer'
                          ? '/farmer-dashboard'
                          : '/worker-dashboard'
                      }`}
                    >
                      <Button
                        sx={{
                          color: '#ffff',
                          background: '#74c116',
                          px: 2,
                          py: 1,
                          '&:hover': {
                            backgroundColor: '#74c116',
                          },
                        }}
                      >
                        Dashboard
                      </Button>
                    </Link>
                  </Box>
                ) : (
                  <>
                    {location.pathname !== '/login' &&
                      location.pathname !== '/register' && (
                        <>
                          <Link to="/login">
                            <Button
                              sx={{
                                color: '#2b2b2b',
                                '&:hover': {
                                  backgroundColor: '#ffffff',
                                },
                              }}
                            >
                              Log In
                            </Button>
                          </Link>
                          <Link to="/register">
                            <Button
                              sx={{
                                color: '#ffff',
                                background: '#74c116',
                                px: 2,
                                py: 1,
                                '&:hover': {
                                  backgroundColor: '#74c116',
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
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
