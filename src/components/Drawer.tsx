import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  Toolbar,
  Box,
  AppBar,
  IconButton,
  Typography,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import { BookmarkAdded, Menu, Science } from "@mui/icons-material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { useTheme } from "@emotion/react";

const links = [
  {
    icono: <HomeIcon />,
    href: "/",
    title: "Inicio",
  },
  {
    icono: <PeopleAltIcon />,
    href: "/Clientes",
    title: "Clientes",
  },
  {
    icono: <PointOfSaleIcon />,
    href: "/Ventas",
    title: "Ventas",
  },
  {
    icono: <LibraryBooksIcon />,
    href: "/Productos",
    title: "Productos",
  },
  {
    icono: <BookmarkAdded />,
    href: "/Pedidos",
    title: "Pedidos",
  },
  {
    icono: <Science />,
    href: "/Components",
    title: "Theme",
  },
];

function DrawerResponsive() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;
  console.log(theme.palette.primary);

  const handleDrawerToggle = () => {
    console.log("toggle", !mobileOpen);
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {links.map(({ icono, href, title }, index) => (
          <Link to={href} key={index}>
            <ListItem disablePadding sx={{ py: 1, px: 2 }}>
              <ListItemButton>
                <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                  {icono}
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    variant='h5'
                    fontWeight='medium'
                    color='primary'
                    component='h2'
                  >
                    {title}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Typography
              variant='h6'
              fontWeight='bold'
              color='primary'
              component='h2'
            >
              Entrepreneurship Manager
            </Typography>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.dark,
                px: 2.5,
                py: 0.5,
                borderRadius: 5,
              }}
            >
              <Typography
                variant='body2'
                component='p'
                fontWeight='bold'
                color='white'
              >
                v0.0.1
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant='temporary'
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
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default DrawerResponsive;
