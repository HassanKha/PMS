export const LoadingSpin = (size : string) => <svg
  xmlns="http://www.w3.org/2000/svg"
  width={`${size}rem`}
  height={`${size}rem`}
  viewBox="0 0 100 100"
  preserveAspectRatio="xMidYMid"
  className="white-spinner"
>
  <defs>
    <filter id="spinner-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="rgba(0,0,0,0.4)" />
    </filter>
  </defs>
  <circle
    cx="50"
    cy="50"
    r="35"
    fill="none"
    stroke="#fff"
    strokeWidth="10"
    strokeDasharray="165 57"
    filter="url(#spinner-shadow)"
  >
    <animateTransform
      attributeName="transform"
      type="rotate"
      repeatCount="indefinite"
      dur="1s"
      values="0 50 50;360 50 50"
      keyTimes="0;1"
    />
  </circle>
</svg>
