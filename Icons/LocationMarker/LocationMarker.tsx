import React, { FC } from "react";
import { Icon } from "@chakra-ui/react";

interface Props {
  [x: string]: any;
}

const LocationMarker: FC<Props> = ({ ...props }) => (
  <Icon {...props}>
    <path
      fill="currentColor"
      d="M6 10c0-3.414 2.676-6 6-6s6 2.586 6 6c0 2.982-1.567 5.5-3.238 7.33A18.488 18.488 0 0112 19.79a18.49 18.49 0 01-2.762-2.46C7.567 15.5 6 12.981 6 10zm5.474 11.85L12 21l-.525.85a1 1 0 001.05 0L12 21l.526.85h.001l.002-.001.006-.004.02-.013a7.993 7.993 0 00.311-.206c.206-.141.496-.348.841-.616a20.487 20.487 0 002.531-2.332C18.067 16.677 20 13.695 20 10c0-4.539-3.592-8-8-8-4.408 0-8 3.461-8 8 0 3.695 1.933 6.677 3.762 8.678a20.485 20.485 0 002.53 2.332 17.706 17.706 0 001.085.778c.029.02.052.034.068.044l.02.013.006.004h.002v.001zM10 10a2 2 0 114 0 2 2 0 01-4 0zm2-4a4 4 0 100 8 4 4 0 000-8z"
    />
  </Icon>
);

export default LocationMarker;
