interface SVGCursorProps {
  color: string;
}

const SVGCursor: React.FC<SVGCursorProps> = ({ color }) => (

  <svg width="32" height="32" viewBox="5 4 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_1_17)">
      <path d="M12.5448 26L6.72762 5.59344L26 14.8133L17.1816 17.9378L12.5448 26Z" fill={color} />
      <path d="M12.0615 26.1347L12.3877 27.279L12.9812 26.2471L17.5261 18.3446L26.1697 15.282L27.2985 14.8821L26.2177 14.365L6.94536 5.14523L5.94125 4.66487L6.24433 5.72807L12.0615 26.1347Z" stroke="#F5FAFF" />
    </g>
    <defs>
      <filter id="filter0_d_1_17" x="3.15485" y="2.7363" width="27.4421" height="28.8217" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_17" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_17" result="shape" />
      </filter>
    </defs>
  </svg>

);

export default SVGCursor;