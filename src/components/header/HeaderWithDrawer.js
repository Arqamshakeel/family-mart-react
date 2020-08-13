import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MessageIcon from "@material-ui/icons/Message";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { useMediaQuery } from "react-responsive";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "../home/Home";
import CustomCarousel from "../Carousel/Carousel";
import MoreIcon from "@material-ui/icons/MoreVert";
import FormOrder from "../order/FormOrder";
import AddProduct from "../products/AddProduct";
import AddProductForm from "../products/AddProductForm";
import Cart from "../cart/Cart";
import MaterialTableDemo from "../cart/Cart2";
import productService from "../../services/ProductServices";
import { withRouter } from "react-router";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import { useSelector, useDispatch } from "react-redux";
import { decrement, zero } from "../../Redux/actions/CartBadgeAction";
import { set } from "../../Redux/actions/CartBadgeAction";
import { setOrder, incrementOrder } from "../../Redux/actions/OrderBadgeAction";
import AddressForm from "../AddressForm/AddressForm";
import Checkout from "../AddressForm/Checkout";
import SignInSide from "../LoginAndSignUp/SignInSide";
import SignUp from "../LoginAndSignUp/SignUp";
import io from "socket.io-client";
import TestRes from "../testResponsive/TestRes";
import BottomNav from "../Bottom navigation/BottomNav";
import Order from "../order/Order";
import OrderExpandable from "../order/OrderExpandable";
const socket = io.connect("http://localhost:4001");

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  customizeToolbar: {
    minHeight: 65,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      "&:focus": {
        width: "26ch",
      },
    },
  },
  sectionDesktop: {
    display: "none",
    position: "absolute",
    right: theme.spacing(7),

    [theme.breakpoints.up("md")]: {
      display: "flex",
      //justifyContent: "flex-end",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function ResponsiveDrawer(props) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-device-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 700px)",
  });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  console.log(props);
  const { window } = props;

  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  //const [cartBadge, setCartBadge] = React.useState("0");
  const cartBadge = useSelector((state) => state.counter.counter);
  const orderBadge = useSelector((state) => state.order.order);
  const isMenuOpen = Boolean(anchorEl);
  const [value, setValue] = React.useState(0);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  if (isTabletOrMobile) {
    console.log("Yes Mob");
  } else {
    console.log("not des");
  }
  const classes = useStyles(isTabletOrMobile);

  const dispatch = useDispatch();

  React.useEffect(() => {
    productService
      .getAllCartData()
      .then(function (cart) {
        console.log(cart);

        console.log("hahah" + cart.length);
        dispatch(set(cart.length));
        //setCartBadge(cart.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [cartBadge, orderBadge]);
  React.useEffect(() => {
    productService
      .getOrder()
      .then(function (order) {
        //console.log(cart);

        console.log("Order length" + order.length);
        dispatch(setOrder(order.length));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [cartBadge, orderBadge]);

  React.useEffect(() => {
    socket.on("client", (data) => {
      console.log("in order useEffect");
      // alert(data);
      console.log("data");
      console.log(data);

      dispatch(incrementOrder());
      console.log(orderBadge);
      // dispatch(incrementOrder());
    });
  }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          console.log("hello");
          props.history.push("/cart");
        }}
      >
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={cartBadge} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          console.log("hello");
          props.history.push("/allorders");
        }}
      >
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <MessageIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            props.history.push("/");

            if (isTabletOrMobile) handleDrawerToggle();
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            props.history.push("/addproductform");
            if (isTabletOrMobile) handleDrawerToggle();
          }}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={"Add Product"} />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            props.history.push("/orderform2");
            if (isTabletOrMobile) handleDrawerToggle();
          }}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={"Order Form"} />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            props.history.push("/signin");
            if (isTabletOrMobile) handleDrawerToggle();
          }}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={"Sign in"} />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            props.history.push("/signup");
            if (isTabletOrMobile) handleDrawerToggle();
          }}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={"Sign up"} />
        </ListItem>
        <Divider />
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    // <BrowserRouter>
    <div className={classes.root}>
      <CssBaseline />
      {/* {isTabletOrMobile ? <BottomNav /> : <></>} */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.customizeToolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Family Mart
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => {
                props.history.push("/allorders");
              }}
            >
              <Badge badgeContent={orderBadge} color="secondary">
                <MessageIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => {
                props.history.push("/cart");
              }}
            >
              <Badge badgeContent={cartBadge} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/orderform" exact component={FormOrder} />
          <Route path="/orderform2" exact component={Checkout} />
          <Route path="/addproduct" exact component={AddProduct} />
          <Route path="/addproductform" exact component={AddProductForm} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/cart2" exact component={MaterialTableDemo} />
          <Route path="/signin" exact component={SignInSide} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/allorders" exact component={OrderExpandable} />
          {/* <Route path="/nav" exact component={BottomNav} /> */}
        </Switch>
        {isTabletOrMobileDevice && isPortrait ? <BottomNav /> : <></>}

        {/* <div className={classes.toolbar} /> */}
        {/* <App /> */}
      </main>
      {/* <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Recents" icon={<MailIcon />} />
        <BottomNavigationAction label="Favorites" icon={<MailIcon />} />
        <BottomNavigationAction label="Nearby" icon={<MailIcon />} />
      </BottomNavigation> */}
    </div>
    // </BrowserRouter>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default withRouter(ResponsiveDrawer);
