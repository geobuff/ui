import React, { FC } from "react";

interface Props {
  height?: string;
  width?: string;
  isGrayScale?: boolean;
}

const Logo: FC<Props> = ({ height="32px", width="140px", isGrayScale=false }) => (
  <svg viewBox="0 0 72.37 18.91" height={height} width={width}>
    <defs>
      <linearGradient
        id="a"
        x1=".49"
        y1="9.46"
        x2="13.61"
        y2="9.46"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#fff" />
        <stop offset="1" stopColor="#b3b3b3" />
      </linearGradient>
    </defs>
    <path
      d="M7 18.42c-1.38 0-4.93-5-6.16-9.24a6.82 6.82 0 01-.33-1.71v-.42a6.56 6.56 0 0113.12 0v.13a.37.37 0 010 .11 6.52 6.52 0 01-.34 1.89c-1.24 4.3-4.79 9.24-6.17 9.24z"
      fill={isGrayScale ? "#C6C6C6" : "url(#a)"}
    />
    <path
      fill={isGrayScale ? "#9B9B9B" : "#000"}
      d="M7.05 1a6.07 6.07 0 016.07 6v.22A5.89 5.89 0 0112.78 9v.05c-1.25 4.33-4.69 8.81-5.69 8.86H7c-1-.05-4.45-4.53-5.69-8.87a.19.19 0 010-.07A6.17 6.17 0 011 7.43a.28.28 0 000-.09v-.29A6.07 6.07 0 017.05 1m0-1A7.05 7.05 0 000 7.05v.38a.17.17 0 010 .07 6.84 6.84 0 00.38 1.81c1.17 4.09 4.8 9.59 6.63 9.59h.07c1.84 0 5.45-5.48 6.63-9.57a6.69 6.69 0 00.37-2 .3.3 0 000-.1v-.1a7.05 7.05 0 00-7-7z"
    />
    <g>
      <path
        d="M14.08 7.05a.49.49 0 010 .12v-.12z"
        fill={isGrayScale ? "#F0F0F0" : "#00c964"}
      />
      <path d="M14.1 7.05zm0 0a.49.49 0 010 .12v-.12z" />
      <g fill={isGrayScale ? "#9B9B9B" : "#000"}>
        <path
          d="M7.44 12.41a2.52 2.52 0 01.23-.52 3.94 3.94 0 00.23-.46 3 3 0 00-.25-2.62 2.38 2.38 0 00-1.71-1.2.84.84 0 00.12-.31c.29-1.27-.83-3-1.7-3.58A2.36 2.36 0 003 3.29a3 3 0 00-1.67.55 6.55 6.55 0 0112.12 1.8l-.26-.1a2.46 2.46 0 00-.83-.2.86.86 0 00-.32 0 1.11 1.11 0 00-.45.3 1 1 0 00-.45-.12.91.91 0 00-.42.11.83.83 0 00-.38.84 1.77 1.77 0 00.2.57 2.61 2.61 0 01.24 1v.71a2.16 2.16 0 00.28.82v.05a3.41 3.41 0 01-.37.39c-.59.49-1.15.93-1.71 1.35l-.39.3a4.23 4.23 0 01-1.15.75z"
          fill={isGrayScale ? "#F0F0F0" : "#00c964"}
        />
        <path d="M7.05 1a6.09 6.09 0 015.67 3.9h-.36a1.41 1.41 0 00-.47.07 1.37 1.37 0 00-.4.21 1.34 1.34 0 00-.35 0 1.3 1.3 0 00-1.29 1.39 2.32 2.32 0 00.24.73v.06a2.06 2.06 0 01.17.72v.18a5.29 5.29 0 000 .56 2.2 2.2 0 00.18.68l-.15.14c-.58.49-1.13.93-1.68 1.33l-.19.14a3.62 3.62 0 00-.43-2.56 3 3 0 00-1.42-1.28 4.71 4.71 0 00-1.93-4A2.89 2.89 0 003 2.8h-.29A6 6 0 017.05 1m0-1A7.05 7.05 0 000 7.05a3 3 0 01.57-1.8A3.24 3.24 0 013 3.78a1.94 1.94 0 011.09.34 3.69 3.69 0 011.49 3.07c-.15.69-1.36.65-1.87.85h1a10 10 0 011.1 0 2.34 2.34 0 011.66 3.17A4.51 4.51 0 007 12.4a.51.51 0 00.16.44.4.4 0 00.26.08h.08a6.17 6.17 0 001.78-1.15c.59-.44 1.17-.89 1.73-1.37a6.3 6.3 0 00.62-.65c.09-.08.06-.18 0-.27a1.63 1.63 0 01-.31-.77c0-.23 0-.44-.05-.69A3.11 3.11 0 0011 7a2.29 2.29 0 01-.19-.48.36.36 0 01.19-.41.37.37 0 01.17-.05.46.46 0 01.24.08c.07.05.21.23.28.28l.14-.22a1 1 0 01.4-.35.44.44 0 01.16 0A2.35 2.35 0 0113 6a2.91 2.91 0 01.78.41.81.81 0 01.26.64 7.05 7.05 0 00-7-7zm7.05 7.05z" />
      </g>
    </g>
    <g>
      <path
        fill={isGrayScale ? "#9B9B9B" : "#000"}
        d="M26.52 13.71a3 3 0 01-.51.48 3.78 3.78 0 01-.83.48 5.74 5.74 0 01-1.17.38 7.78 7.78 0 01-1.54.14 5.1 5.1 0 01-1.87-.33 4 4 0 01-1.46-1 4.55 4.55 0 01-.93-1.61 6.62 6.62 0 01-.33-2.18v-.63a6.91 6.91 0 01.31-2.18 4.54 4.54 0 01.9-1.62 3.8 3.8 0 011.4-1 4.7 4.7 0 011.83-.35 5.52 5.52 0 011.78.26 3.38 3.38 0 011.26.73 3.26 3.26 0 01.79 1.11 4.94 4.94 0 01.37 1.42H24.4a2.7 2.7 0 00-.21-.73 1.6 1.6 0 00-.38-.55 1.5 1.5 0 00-.59-.35 2.57 2.57 0 00-.84-.12 1.92 1.92 0 00-1.7.85 4.41 4.41 0 00-.58 2.51v.64a4.22 4.22 0 00.63 2.52 2.19 2.19 0 001.86.85 4.4 4.4 0 00.68 0 2.78 2.78 0 00.5-.13 1.53 1.53 0 00.34-.17 1.72 1.72 0 00.23-.17v-1.87h-2V9.48h4.17zM31.78 15.19a4.44 4.44 0 01-1.64-.29 3.63 3.63 0 01-1.23-.82 3.34 3.34 0 01-.77-1.21 4.1 4.1 0 01-.27-1.49v-.28a5.1 5.1 0 01.26-1.65 3.92 3.92 0 01.73-1.28A3.36 3.36 0 0130 7.33 3.76 3.76 0 0131.55 7a3.67 3.67 0 011.45.31 2.9 2.9 0 011.09.78 3.36 3.36 0 01.67 1.22A5.66 5.66 0 0135 10.9v.89h-5a2.49 2.49 0 00.21.7 1.81 1.81 0 00.4.54 1.63 1.63 0 00.57.34 2 2 0 00.74.13 2.48 2.48 0 001.08-.22 2.06 2.06 0 00.84-.66l1 1.15a2.84 2.84 0 01-.47.53 3 3 0 01-.67.45 4.25 4.25 0 01-.87.33 5 5 0 01-1.05.11zm-.24-6.46a1.4 1.4 0 00-.6.12 1.34 1.34 0 00-.45.34 1.81 1.81 0 00-.3.51 3.19 3.19 0 00-.16.66H33v-.17a1.81 1.81 0 00-.09-.58 1.33 1.33 0 00-.25-.47 1.37 1.37 0 00-.44-.3 1.73 1.73 0 00-.68-.11zM35.89 11a5.16 5.16 0 01.24-1.6 3.85 3.85 0 01.72-1.27 3.58 3.58 0 011.15-.8A4 4 0 0139.6 7a4 4 0 011.6.3 3.38 3.38 0 011.17.84 3.71 3.71 0 01.73 1.27 5.16 5.16 0 01.25 1.6v.15a5.11 5.11 0 01-.25 1.6 3.8 3.8 0 01-.73 1.27 3.28 3.28 0 01-1.16.83 4.36 4.36 0 01-3.18 0 3.32 3.32 0 01-1.17-.83 3.8 3.8 0 01-.73-1.27 5.11 5.11 0 01-.24-1.6zm2.1.15a4.29 4.29 0 00.09.9 2.33 2.33 0 00.28.74 1.56 1.56 0 00.5.49 1.5 1.5 0 00.76.18 1.42 1.42 0 00.74-.18 1.59 1.59 0 00.51-.49 2.11 2.11 0 00.28-.74 4.29 4.29 0 00.09-.9V11a4.26 4.26 0 00-.09-.89 2.06 2.06 0 00-.28-.73 1.44 1.44 0 00-.51-.5 1.41 1.41 0 00-.76-.19 1.36 1.36 0 00-.74.19 1.41 1.41 0 00-.5.5 2.27 2.27 0 00-.28.73A4.26 4.26 0 0038 11zM44.78 15.05V4.45h3.71a7.41 7.41 0 011.65.17 3.61 3.61 0 011.24.54 2.34 2.34 0 01.77.91 2.86 2.86 0 01.27 1.29 2.61 2.61 0 01-.09.69 2.57 2.57 0 01-.28.63 2.59 2.59 0 01-.47.53 2.63 2.63 0 01-.68.39 2.16 2.16 0 011.34.9 2.23 2.23 0 01.32.68 3.14 3.14 0 01.09.75 2.76 2.76 0 01-1 2.33 4.48 4.48 0 01-2.83.79zM47 8.89h1.62a2 2 0 001.24-.35 1.17 1.17 0 00.41-1 1.2 1.2 0 00-.42-1 2.12 2.12 0 00-1.32-.32H47zm0 1.54v2.87h1.87a2.2 2.2 0 00.73-.11 1.39 1.39 0 00.51-.29 1.22 1.22 0 00.31-.44 1.63 1.63 0 00.09-.55 1.91 1.91 0 00-.09-.61 1.1 1.1 0 00-.27-.47 1.16 1.16 0 00-.48-.3 2.48 2.48 0 00-.71-.1zM58.87 14.25a2.67 2.67 0 01-.9.7 3.06 3.06 0 01-1.25.24 3.29 3.29 0 01-1.07-.19 2 2 0 01-.82-.52 2.39 2.39 0 01-.54-.91 4 4 0 01-.19-1.33V7.17h2.1v5.11a1.53 1.53 0 00.09.56 1 1 0 00.23.38.94.94 0 00.35.2 1.35 1.35 0 00.46.07 2 2 0 00.92-.19 1.45 1.45 0 00.55-.55V7.17h2.11v7.88h-2zM63.07 15.05V8.72H61.9V7.17h1.17v-.68a3.37 3.37 0 01.2-1.19 2.38 2.38 0 01.58-.87 2.48 2.48 0 01.91-.53A3.44 3.44 0 0166 3.71a3.31 3.31 0 01.55 0l.52.1v1.63a3 3 0 00-.64-.06 1.3 1.3 0 00-.88.27 1 1 0 00-.31.79v.68h1.57v1.6h-1.63v6.33zM68.41 15.05V8.72h-1.17V7.17h1.17v-.68a3.37 3.37 0 01.2-1.19 2.32 2.32 0 011.49-1.4 3.47 3.47 0 011.2-.19 3.31 3.31 0 01.55 0l.52.1v1.63a3 3 0 00-.64-.06 1.3 1.3 0 00-.88.27 1 1 0 00-.31.79v.68h1.57v1.6h-1.59v6.33z"
      />
    </g>
  </svg>
);

export default Logo;
