type IconProps = { color: string; size: number };

export const MegaphoneIcon: React.FC<IconProps> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
    <path d="M15 8.5a5 5 0 0 1 0 7" />
    <path d="M18 5.5a9 9 0 0 1 0 13" />
  </svg>
);

export const EarIcon: React.FC<IconProps> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3" />
    <path d="M3 21v-1a6 6 0 0 1 12 0v1" />
    <path d="M16 11h5M16 14h3M16 8h4" />
  </svg>
);

export const ChangeIcon: React.FC<IconProps> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </svg>
);
