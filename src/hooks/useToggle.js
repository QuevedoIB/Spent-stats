import { useState, useCallback } from "react";

export default function useToggle({ initialValue = false } = {}) {
  const [toggled, setToggled] = useState(initialValue);

  const handleToggle = useCallback((value) => {
    setToggled((currentValue) => (value !== undefined ? value : !currentValue));
  }, []);

  return { handleToggle, toggled };
}
