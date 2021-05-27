import React from "react";
import PropTypes from "prop-types";

const Earth = ({ height, width }) => (
  <svg viewBox="0 0 1999.52 1999.52" height={height} width={width}>
    <defs>
      <linearGradient
        id="bc545e3c-1a03-4ca7-a9aa-1d98cb8f1a42"
        x1="49.31"
        y1="999.76"
        x2="1950.2"
        y2="999.76"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#fff" />
        <stop offset="0.21" stopColor="#f6f6f6" />
        <stop offset="0.54" stopColor="#dedede" />
        <stop offset="0.97" stopColor="#b6b6b6" />
        <stop offset="1" stopColor="#b3b3b3" />
      </linearGradient>
    </defs>
    <g>
      <circle
        cx="999.76"
        cy="999.76"
        r="950.45"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="98.6237788796425px"
        fill="url(#bc545e3c-1a03-4ca7-a9aa-1d98cb8f1a42)"
      />
      <path
        d="M1390.26,129.42c-179.38,52.65-19,191.9-33.16,311.66-10.42,88.35-126.77,80.62-115.4,170.07,11.89,93.57,96.63,149.48,177.77,180.75,90.82,35,209.07-2.33,278.52,78.26,77.66,90.1,83.51,254.61,74.8,365.73-5.86,74.75-23.27,198.73,85.08,202l90.48-379.11-44.87-354.14L1665.59,321.58"
        transform="translate(-0.06 0)"
        fill="#00c964"
      />
      <path
        d="M652.31,1252.92C555.08,1181,452.94,1079.77,395.06,972.34c-52.25-97.09,67.22-216.54-59.72-298.67S66.92,817.21,66.92,817.21L84.26,923.63,66.92,1023.81l14.93,223,93.85,236.7c5.21-106.29,158.1-53.83,210.59-37,126.75,40.53,271,12.8,390.4,68.49,34.39,16,66.17,37.78,102.14,49.88,75.27,25.33,121-4.94,121-81.3C999.8,1320.07,750.06,1325.22,652.31,1252.92Z"
        transform="translate(-0.06 0)"
        fill="#00c964"
      />
      <path
        d="M66.91,817.21s141.5-225.66,268.43-143.53,7.46,201.58,59.73,298.66c57.86,107.43,160,208.7,257.23,280.59,97.78,72.3,347.52,67.14,347.52,230.6,0,76.37-45.72,106.64-121,81.31C842.88,1552.75,811.08,1531,776.7,1515c-119.45-55.68-263.67-28-390.4-68.48-52.52-16.8-205.39-69.26-210.62,37"
        transform="translate(-0.06 0)"
        fill="none"
        stroke="#000"
        strokeLinejoin="round"
        strokeWidth="49.3118894398212px"
      />
      <path
        d="M1857.87,1437.92c-108.35-3.3-90.94-127.28-85.08-202,8.71-111.12,2.86-275.63-74.8-365.73-69.45-80.59-187.7-43.26-278.52-78.26-81.14-31.27-165.88-87.18-177.77-180.75-11.37-89.45,105-81.72,115.4-170.07,14.13-119.76-146.22-259,33.16-311.66"
        transform="translate(-0.06 0)"
        fill="none"
        stroke="#000"
        strokeMiterlimit="10"
        strokeWidth="49.3118894398212px"
      />
      <circle
        cx="999.76"
        cy="999.76"
        r="950.45"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="98.6237788796425px"
      />
    </g>
  </svg>
);

Earth.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};

export default Earth;
