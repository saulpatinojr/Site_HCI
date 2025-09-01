import React from 'react';

const Logo = () => {
  return (
    <svg width="48" height="48" viewBox="0 0 100 100" className="transition-all duration-300 group-hover:scale-110">
      <defs>
        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="cyber-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'var(--neon-pink)', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'var(--cyber-purple)', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Background shape */}
      <path d="M10 20 L50 2 L90 20 L90 80 L50 98 L10 80 Z" 
            fill="var(--bg-med)" 
            stroke="url(#cyber-gradient)" 
            strokeWidth="3"
            className="group-hover:stroke-[var(--electric-teal)] transition-all" />

      {/* Cloud shapes */}
      <g stroke="var(--electric-teal)" strokeWidth="3" fill="none" filter="url(#neon-glow)" className="opacity-80 group-hover:opacity-100 transition-opacity">
        <path d="M30 40 Q25 30 35 30 T50 35 Q60 25 70 35 T65 50" />
        <path d="M35 70 Q30 60 40 60 T55 65 Q65 55 75 65 T70 80" />
      </g>
      
      {/* Connecting line */}
      <line x1="50" y1="45" x2="50" y2="65" stroke="var(--neon-pink)" strokeWidth="3" strokeDasharray="5,5">
        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
      </line>

      {/* HCI Text */}
       <text 
        x="50" y="58" 
        fontFamily="Orbitron, sans-serif" 
        fontSize="28" 
        fill="#fff" 
        textAnchor="middle" 
        fontWeight="900" 
        className="transition-all"
        style={{ textShadow: '0 0 5px var(--neon-pink)' }}>
        HCI
      </text>
    </svg>
  );
};

export default Logo;