import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
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
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStore from "../../createStore";
import StarIcon from '@mui/icons-material/Star';

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

// Styled RouterLink component
const StyledRouterLink = styled(RouterLink)({
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    textDecoration: 'none',
  },
});

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const gamesPlayed = useStore((state) => state.gamesPlayed);
  const setSearchTerm = useStore((state) => state.setSearchTerm);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: { currentTarget: React.SetStateAction<HTMLElement | null>; }) => {
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
    setSearchTerm(event.target.value); // Update the search term in the store
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ marginTop: 6 }}
    >
      <MenuItem onClick={handleMenuClose}>
        <MuiLink
          component={RouterLink}
          to="/login"
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
            '&:hover': {
              textDecoration: 'none',
            },
          }}
        >
          Logout
        </MuiLink>
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
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show games played" color="primary">
          <Badge badgeContent={gamesPlayed.length} color="error">
            <StarIcon />
          </Badge>
        </IconButton>
        <p>Games Played</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show notifications"
          color="primary"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          <AccountCircle color="secondary" />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        alignContent: "center",
        margin: "0 auto",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#070707" }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            maxWidth: "lg",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
            fontWeight={900}
          >
            <StyledRouterLink sx={{ color: 'primary.main' }} to="/">
              Gamify
            </StyledRouterLink>
          </Typography>
          {location.pathname === "/" && ( // Conditionally render the search bar
            <Search sx={{ flexGrow: 1, maxWidth: "400px", mx: 2 }}>
              <SearchIconWrapper>
                <SearchIcon color="secondary" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{ width: "100%" }}
                onChange={handleSearchChange} // Add onChange handler
              />
            </Search>
          )}
          <Box>
            <IconButton
              size="large"
              aria-label="show games played"
              color="secondary"
              onClick={() => navigate("/profile")}
            >
              <Badge badgeContent={gamesPlayed.length} color="error">
                <StarIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="secondary"
              sx={{ mr: 2 }}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}