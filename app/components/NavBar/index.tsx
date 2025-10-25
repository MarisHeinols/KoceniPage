import React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: "Jauns raidījums", link: "/jauns" },
    { label: "Visi raidījumi", link: "/visi" },
  ];

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src="/khs_logo.png"
              alt="Logo"
              sx={{ height: 40, width: "auto", mr: 2 }}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop menu */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            <Button
              color="inherit"
              variant="nav"
              component={Link}
              to="/utility-meter"
            >
              Jauns Rādījums
            </Button>
            <Button
              color="inherit"
              variant="nav"
              component={Link}
              to="/all-readings"
            >
              Visi Rādījumi
            </Button>
          </Box>

          {/* Mobile burger */}
          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton size="large" color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              keepMounted
            >
              {menuItems.map((item) => (
                <MenuItem key={item.label} onClick={handleMenuClose}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
