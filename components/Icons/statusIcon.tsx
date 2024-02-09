export function StatusIcon({ fill = "#008500" }: { fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 19"
      fill="none"
      aria-hidden={true}
    >
      <circle cx="9" cy="9.5" r="9" fill={fill} />
    </svg>
  );
}
