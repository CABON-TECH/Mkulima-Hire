import { Typography, Button, Box } from '@mui/material';
import farm_one from '../../assets/farm-one.jpg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../features/auth/AuthState';

const Hero = () => {
  const user = useSelector((state: RootState) => state?.auth.user);

  return (
    <Box
      sx={{
        paddingInline: { sm: 2, md: 8 },
        paddingBlock: 2,
        display: { md: 'flex' },
        justifyContent: { md: 'space-around' },
      }}
    >
      <Box
        sx={{
          my: 'auto',
          paddingInline: 2,
        }}
      >
        <Typography fontSize="3.75rem" lineHeight="4.0rem" maxWidth={550}>
          We connect{' '}
          <Box
            component="span"
            className=""
            sx={{
              background: 'linear-gradient(to left, #74c116, #3434FF 100%)',
              backgroundPosition: '0 100%',
              backgroundSize: ' 100% 2px',
              backgroundRepeat: 'repeat-x',
            }}
          >
            farmers and workers
          </Box>
        </Typography>
        <Typography fontSize="1.4rem" paddingY="1.5rem">
          This is a platform for farmers in Kenya to hire
          <br />
          workers for their farms
        </Typography>
        {user ? (
          <Link
            to={`${
              user.role === 'farmer' ? '/farmer-dashboard' : '/worker-dashboard'
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
        ) : (
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
        )}
      </Box>

      <Box className="my-auto flex justify-center md:mt-0 mt-4">
        <Box className="relative">
          <img
            src={farm_one}
            alt="farm"
            className="w-96 rounded-lg shadow-lg"
          />

          <Box className="absolute font-semibold text-center left-16 top-[95%] px-3 bg-[#fff] rounded-lg shadow-lg">
            We link farmers with workers
            <br />
            To simplify collaboration
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
