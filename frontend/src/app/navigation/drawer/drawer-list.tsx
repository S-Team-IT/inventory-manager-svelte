import AddIcon from "@mui/icons-material/Add";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Divider, List } from "@mui/material";
import { RoleContext } from "lib/context/context";
import { useContext } from "react";
import DrawerListItem from "./drawer-list-item";

export default function DrawerList() {
  const role = useContext(RoleContext);

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <DrawerListItem route={"/"} description={"Dashboard"}>
          <HomeFilledIcon />
        </DrawerListItem>
        <Divider />
        {(role === "QS" || role === "Admin") && (
          <DrawerListItem route={"/add-product"} description={"Add new Item"}>
            <AddIcon />
          </DrawerListItem>
        )}
        {(role === "Procurement" || role === "Admin") && (
          <DrawerListItem
            route={"/incoming-transaction"}
            description={"Add delivery order"}
          >
            <BookmarkAddIcon />
          </DrawerListItem>
        )}
        {(role === "Project" || role === "Admin") && (
          <DrawerListItem
            route={"/outgoing-transaction"}
            description={"Remove quantity"}
          >
            <BookmarkRemoveIcon />
          </DrawerListItem>
        )}
        {role === "Admin" && (
          <DrawerListItem route={"/add-account"} description={"Add account"}>
            <PersonAddIcon />
          </DrawerListItem>
        )}
      </List>
    </Box>
  );
}
