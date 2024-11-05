import React, { useState, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha, useTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { IconButton, useMediaQuery } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useStore from "../../createStore";
import StarIcon from '@mui/icons-material/Star';
import debounce from "lodash.debounce";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const searchTerm = useStore((state) => state.searchTerm);
  const setSearch = useStore((state) => state.setSearchTerm);
  const gamesPlayed = useStore((state) => state.gamesPlayed);
  const pendingRatings = useStore((state) => state.pendingRatings);
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    debouncedSearch(event.target.value);
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearch(query);
    }, 300),
    []
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link className="link-styles-dropdown" to="/info" style={{ color: '#5fdca8' }}>
          Info
        </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(mobileMoreAnchorEl)}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show pending ratings" color="inherit">
          <Badge badgeContent={pendingRatings} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Pending Ratings</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "block", sm: "block" }, mb: { xs: 1, sm: 0 }, minWidth: '100px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#5fdca8' }}>
              Gamify
            </Link>
          </Typography>

          {location.pathname === "/" && (
            <Search sx={{ flexGrow: 1, maxWidth: "400px", mx: 2 }}>
              <SearchIconWrapper>
                <SearchIcon color="secondary" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{ width: "100%" }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Search>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', sm: 'flex' }, justifyContent: { xs: 'center', sm: 'flex-end' }, width: '100%', mt: { xs: 1, sm: 0 } }}>
            <IconButton size="large" aria-label="show pending ratings" color="inherit" onClick={() => navigate("/profile")}>
              <Badge badgeContent={pendingRatings} color="error">
                <StarIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;