import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 2,
      }}
      component="footer"
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://github.com/CABON-TECH">
            Boniface Mbogho
          </Link>
          {" and "}
          <Link color="inherit" href="https://segunlawal.dev">
            Segun Lawal
          </Link>
          {" 2023"}
        </Typography>
      </Container>
    </Box>
  );
}
