import * as React from "react";

function SvgDrugs(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.657 2.757a6 6 0 118.485 8.486l-9.9 9.9a6 6 0 11-8.485-8.486l9.9-9.9zm7.07 7.071l-4.242 4.243-5.657-5.657 4.243-4.242a4 4 0 115.657 5.656z"
        fill="#82e600"
        strokeWidth={1.5}
        stroke="#000"
      />
    </svg>
  );
}

export default SvgDrugs;
