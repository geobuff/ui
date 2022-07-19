import { FC, useEffect, useState } from "react";

interface Props {
  children?: JSX.Element;
}

// https://www.joshwcomeau.com/react/the-perils-of-rehydration/#the-solution
const ClientOnly: FC<Props> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return children;
};

export default ClientOnly;
