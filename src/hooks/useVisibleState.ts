import { useState, useEffect } from "react";

type useVisibleStateHook = [boolean, () => void, () => void];

export default function useVisibleState(
  initialState: boolean = false
): useVisibleStateHook {
  const [visible, setVisible] = useState(initialState);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return [visible, show, hide];
}
