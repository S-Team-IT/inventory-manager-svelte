import { Dialog, DialogContent, DialogTitle, ImageList, ImageListItem } from "@mui/material";
import { useState } from "react";
import type { photoObj } from "types/supabase";

interface props {
  name: string;
  photoUrls: photoObj[];
}

export default function ProductImage({ name, photoUrls }: props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  return (
    <>
      <ImageList cols={1} sx={{ width: "300px" }}>
        <ImageListItem>
          <a onClick={toggleModal}>
            <img src={photoUrls[0].item} alt="" width="300px" />
          </a>
        </ImageListItem>
      </ImageList>
      <Dialog open={isOpen} onClose={toggleModal} fullWidth={true} maxWidth="lg">
        <DialogTitle sx={{ paddingBottom: 0 }}>{name}</DialogTitle>
        <DialogContent>
          <ImageList cols={3} gap={30}>
            {photoUrls.map(({ item: url }) => (
              <ImageListItem key={url}>
                <img src={url} />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
      </Dialog>
    </>
  );
}
