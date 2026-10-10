type IconProps = { size: number; color: string };

export const WhatsAppIcon: React.FC<IconProps> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8z" />
    <path d="M9.2 8.6c.2-.5.6-.6.9-.6h.5l.9 2-.6.8c.4 1 1.3 1.9 2.3 2.3l.8-.6 2 .9v.5c0 .3-.1.7-.6.9-1.8.8-6.9-3.4-6.2-6.2z" fill={color} strokeWidth={0.8} />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h3l1.5 4-2 1.3a10 10 0 0 0 5.2 5.2l1.3-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
    <path d="M15 3.5a5.5 5.5 0 0 1 5.5 5.5M15 7a2 2 0 0 1 2 2" />
  </svg>
);
