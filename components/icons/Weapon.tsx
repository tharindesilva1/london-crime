import * as React from "react";

function SvgWeapon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" {...props}>
      <path
        d="M10.476 11.618l-.89 2.12h12.691l-.008-2.12h-8.245v1.737h-.469v-1.737h-.52v1.737h-.47v-1.737h-.544v1.737h-.469v-1.737h-1.076 0zm12.12.499v1.27h.584v-1.27h-.584zm-12.822 2.09l.643 1-1.514 5.496 3.177.224.674-3.062h3.616l.459-2.508 5.454-.121-.004-1.029H9.774zm6.459 1.163l-.35 1.911h-3.001l.406-1.845.391-.009-.07 1.11.446.424.032-1.052.771-.508 1.375-.03z"
        strokeWidth={0.5}
        stroke="#000"
        fill="#750342"
      />
    </svg>
  );
}

export default SvgWeapon;
