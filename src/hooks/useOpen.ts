import { useState } from "react";

type useOpenReturn = { open: boolean; show: () => void; hide: () => void };

export default function useOpen(initialState: boolean = false): useOpenReturn {
  const [open, setOpen] = useState(initialState);

  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  return { open, show, hide };
}
