import { useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Toolbar,
  Box,
  AppBar,
  IconButton,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

function DrawerResponsive() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    console.log("toggle", !mobileOpen);
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {["Inicio", "Ventas", "Productos", "Clientes"].map((text, index) => (
          <ListItem key={index} disablePadding sx={{ py: 1, px: 2 }}>
            <ListItemText>
              <Typography
                variant='h5'
                fontWeight='bold'
                color='white'
                component='h2'
              >
                <Link to='#'>{text}</Link>
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ position: "absolute", bottom: 0 }}>
        {["Version 0.0.1", "Entrepreneurship Manager"].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemText>{text}</ListItemText>
          </ListItem>
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
          <Typography variant='h6' noWrap component='div'>
            Entrepreneurship Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              backgroundColor: "orange",
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default DrawerResponsive;
