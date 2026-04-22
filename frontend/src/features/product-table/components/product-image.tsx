import {
  Dialog,
  DialogContent,
  DialogTitle,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useState } from "react";
import type { photoObj } from "types/supabase";

interface props {
  name: string;
  photoUrls: photoObj[];
}

export default function ProductImage({ name, photoUrls }: props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  return (
    <>
      <ImageList cols={1} sx={{ width: "300px" }}>
        <ImageListItem>
          <button className="unset" onClick={toggleModal} type="button">
            <img
              src={photoUrls[0].item}
              width="300px"
              aria-label="item-image"
            />
          </button>
        </ImageListItem>
      </ImageList>
      <Dialog
        open={isOpen}
        onClose={toggleModal}
        fullWidth={true}
        maxWidth="lg"
      >
        <DialogTitle sx={{ paddingBottom: 0 }}>{name}</DialogTitle>
        <DialogContent>
          <ImageList cols={3} gap={30}>
            {photoUrls.map(({ item: url }, key) => (
              <ImageListItem key={url}>
                <img src={url} alt={`${name} #${key + 1}`} />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
      </Dialog>
    </>
  );
}
