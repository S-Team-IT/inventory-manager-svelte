import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField
} from "@mui/material";
import { getProductByMaster } from "lib/database/products-api";
import { useState } from "react";

type item = {
  master: string;
  name: string;
  quantity: number;
};

export default function AddItemElement() {
  const [masterNo, setMasterNo] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [items, setItems] = useState<item[]>([]);

  async function handleClick() {
    if (masterNo === "" || Number.isNaN(quantity)) {
      alert("Please enter master no & qty.");
      return;
    }

    if (quantity < 1 || !Number.isInteger(quantity)) {
      alert("Qty must be an integer larger than 0.");
      return;
    }

    if (isDuplicate()) {
      alert("Item already listed. Please delete it first.");
      return;
    }

    const name = await getProductByMaster(masterNo);
    if (name === "") {
      alert("Item is not found in list, please inform QS");
      return;
    }

    setItems([...items, { master: masterNo, name, quantity }]);
  }

  function isDuplicate(): boolean {
    const newMaster = masterNo;
    const duplicate = items.find(({ master }) => newMaster === master);
    if (duplicate) return true;
    return false;
  }

  function handleDelete(master: string): void {
    const index: number = items.findIndex((i) => i.master === master);
    if (index === -1) {
      console.error("Item not found in items?");
      return;
    }
    setItems(items.toSpliced(index, 1));
  }

  return (
    <>
      <Stack direction="row" spacing={2}>
        <TextField
          value={masterNo}
          onChange={(e) => setMasterNo(e.target.value)}
          label="Master No."
          placeholder="e.g. 101a"
        />
        <TextField
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          type="number"
          label="qty"
          placeholder="1"
          slotProps={{ htmlInput: { step: 1, min: 1 } }}
        />
        <Button variant="contained" onClick={handleClick}>
          +
        </Button>
      </Stack>
      <List>
        {items.map(({ master, name, quantity }) => (<>
          <ListItem
            key={master}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(master)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar variant="rounded" sx={{ bgcolor: "secondary.main" }}>
               {master}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} secondary={quantity}/>
          </ListItem>
          <Divider />
          </>     
        ))}
      </List>
    </>
  );
}
