import { forwardRef } from 'react';

const SamChatLogo = forwardRef(({ className = 'w-8 h-8', color = '#0EA5E9' }, ref) => (
  <svg
    ref={ref}
    className={className}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#22C55E" />
      </linearGradient>
    </defs>
    
    {/* S Monogram with Chat Bubble */}
    <path
      d="M20 20 C10 20 10 40 20 50 L35 50 C45 50 45 70 35 80 L20 80 C10 80 10 100 20 100 L60 100 C70 100 70 80 60 80 L45 80 C35 80 35 50 45 50 L60 50 C70 50 70 20 60 20 Z"
      fill="url(#gradient)"
      stroke="#111827"
      strokeWidth="2"
    />
    
    {/* Lightning bolt accent */}
    <path
      d="M25 35 L32 45 L28 55 L35 55 L30 70"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Chat bubble tail */}
    <path
      d="M55 65 Q65 75 75 65"
      stroke="#111827"
      strokeWidth="2"
      fill="none"
    />
  </svg>
));

SamChatLogo.displayName = 'SamChatLogo';
export default SamChatLogo;
