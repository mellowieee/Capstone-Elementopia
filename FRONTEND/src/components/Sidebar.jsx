import React from "react";
import { styled } from "@mui/material/styles";
import {
  Drawer as MuiDrawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;
const closedWidth = 60;

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: open ? drawerWidth : closedWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
  overflowX: "hidden",
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : closedWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    backgroundColor: "#222",
    color: "#fff",
  },
}));

const Sidebar = ({ open, handleDrawerOpen, handleDrawerClose }) => {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar sx={{ display: "flex", justifyContent: open ? "space-between" : "center", paddingX: 2 }}>
        {open ? (
          <>
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>Menu</Typography>
            <IconButton onClick={handleDrawerClose} sx={{ color: "#fff" }}>
              <ChevronLeftIcon />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={handleDrawerOpen} sx={{ color: "#fff" }}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      <Divider sx={{ borderColor: "#555" }} />

      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton sx={{ justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, justifyContent: "center", mr: open ? 2 : "auto", color: "#fff" }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: "#fff" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
