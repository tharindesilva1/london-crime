import * as React from "react";

function SvgBikeTheft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#ff5600"
        stroke="#000"
        d="M5 19a4 4 0 100-8 4 4 0 000 8zm14 0a4 4 0 100-8 4 4 0 000 8zM5 6h5m9 9L16 5h-3M9 9l-4 6h7c0-3 2-6 5-6H9zm0 0L7 6"
      />
    </svg>
  );
}

export default SvgBikeTheft;
