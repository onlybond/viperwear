'use client';

import React from 'react';

export interface JerseyDesignState {
  view: 'front' | 'back';
  template: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  pattern: 'none' | 'stripes' | 'chevron' | 'hex' | 'gradient' | 'half';
  logo: string | null;
  logoPosition: 'left-chest' | 'center' | 'right-chest';
  text: {
    content: string;
    font: string;
    color: string;
    position: string;
  };
  number: {
    content: string;
    font: string;
    color: string;
  };
}

interface JerseyPreviewProps {
  designState: JerseyDesignState;
}

export default function JerseyPreview({ designState }: JerseyPreviewProps) {
  const { view, colors, pattern, text, number } = designState;
  
  // Destructure colors
  const primary = colors.primary || '#0D0E12';
  const secondary = colors.secondary || '#F5A623';
  const accent = colors.accent || '#FFFFFF';

  // Render SVG pattern definitions dynamically
  const renderPatterns = () => {
    return (
      <defs>
        {/* Striped Pattern */}
        <pattern id="pat-stripes" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="20" height="40" fill={secondary} />
          <rect x="20" width="20" height="40" fill={primary} />
        </pattern>

        {/* Chevron Pattern */}
        <pattern id="pat-chevron" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 0 10 L 20 30 L 40 10 L 40 0 L 20 20 L 0 0 Z" fill={secondary} />
          <path d="M 0 30 L 20 50 L 40 30 L 40 20 L 20 40 L 0 20 Z" fill={secondary} />
        </pattern>

        {/* Hexagon Grid Pattern */}
        <pattern id="pat-hex" width="30" height="52" patternUnits="userSpaceOnUse">
          <path d="M 15 0 L 30 8.6 L 30 25.8 L 15 34.4 L 0 25.8 L 0 8.6 Z" fill="none" stroke={secondary} strokeWidth="1.5" />
          <path d="M 0 51.6 L 15 43 L 30 51.6" fill="none" stroke={secondary} strokeWidth="1.5" />
          <path d="M 15 0 L 15 8.6 M 30 25.8 L 30 34.4 M 0 25.8 L 0 34.4" fill="none" stroke={secondary} strokeWidth="1.5" />
        </pattern>

        {/* Diagonal Gradient Fade */}
        <linearGradient id="pat-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primary} />
          <stop offset="50%" stopColor={secondary} />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>

        {/* Half & Half */}
        <linearGradient id="pat-half" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={primary} />
          <stop offset="50%" stopColor={secondary} />
        </linearGradient>
      </defs>
    );
  };

  // Determine what fill to use for the main body
  const getBodyFill = () => {
    switch (pattern) {
      case 'stripes':
        return 'url(#pat-stripes)';
      case 'chevron':
        return 'url(#pat-chevron)';
      case 'hex':
        return 'url(#pat-hex)';
      case 'gradient':
        return 'url(#pat-gradient)';
      case 'half':
        return 'url(#pat-half)';
      default:
        return primary;
    }
  };

  const getFontFamily = (fontName: string) => {
    switch (fontName) {
      case 'Varsity':
        return 'var(--font-varsity), Impact, sans-serif';
      case 'Modern':
        return 'var(--font-display), sans-serif';
      case 'Sleek':
        return 'var(--font-sans), sans-serif';
      default:
        return 'var(--font-varsity), Impact, sans-serif';
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <svg
        viewBox="0 0 400 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: 'auto',
          filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.6))',
        }}
      >
        {renderPatterns()}

        {view === 'front' ? (
          /* FRONT VIEW */
          <g id="jersey-front">
            {/* Sleeves Shadow */}
            <path d="M 60 120 L 20 180 L 55 205 L 100 155 Z" fill="rgba(0,0,0,0.15)" />
            <path d="M 340 120 L 380 180 L 345 205 L 300 155 Z" fill="rgba(0,0,0,0.15)" />

            {/* Left Sleeve */}
            <path d="M 110 100 L 40 170 L 75 200 L 125 150 Z" fill={primary} />
            {pattern !== 'none' && <path d="M 110 100 L 40 170 L 75 200 L 125 150 Z" fill={getBodyFill()} opacity="0.85" />}
            {/* Left Sleeve Accent Cuff */}
            <path d="M 40 170 L 47 177 L 82 207 L 75 200 Z" fill={accent} />

            {/* Right Sleeve */}
            <path d="M 290 100 L 360 170 L 325 200 L 275 150 Z" fill={primary} />
            {pattern !== 'none' && <path d="M 290 100 L 360 170 L 325 200 L 275 150 Z" fill={getBodyFill()} opacity="0.85" />}
            {/* Right Sleeve Accent Cuff */}
            <path d="M 360 170 L 353 177 L 318 207 L 325 200 Z" fill={accent} />

            {/* Main Body */}
            <path
              d="M 110 100 L 125 150 L 115 390 L 130 410 L 270 410 L 285 390 L 275 150 L 290 100 Q 200 150 110 100 Z"
              fill={primary}
            />
            {pattern !== 'none' && (
              <path
                d="M 110 100 L 125 150 L 115 390 L 130 410 L 270 410 L 285 390 L 275 150 L 290 100 Q 200 150 110 100 Z"
                fill={getBodyFill()}
                opacity="0.85"
              />
            )}

            {/* Side Mesh Panels (Accent/Secondary) */}
            <path d="M 125 150 L 115 390 L 125 390 L 133 150 Z" fill={accent} />
            <path d="M 275 150 L 285 390 L 275 390 L 267 150 Z" fill={accent} />

            {/* Collar V-Neck */}
            <path d="M 160 92 Q 200 140 240 92 Q 200 105 160 92 Z" fill={accent} />
            <path d="M 170 94 Q 200 128 230 94 Q 200 100 170 94 Z" fill={secondary} />

            {/* Bottom Hem Stitching */}
            <path d="M 130 405 L 270 405" stroke={accent} strokeWidth="2" strokeDasharray="4,4" />

            {/* Sponsor Text / Team Logo (Dynamic) */}
            {text && text.content && (
              <text
                x="200"
                y="240"
                textAnchor="middle"
                fill={text.color || secondary}
                fontSize="24"
                fontWeight="800"
                letterSpacing="2"
                style={{
                  fontFamily: getFontFamily(text.font),
                  textShadow: '0px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                {text.content.toUpperCase()}
              </text>
            )}

            {/* Brand Logo (Viper Symbol / Accent) */}
            <g transform="translate(190, 160) scale(0.6)" fill={secondary}>
              <path d="M 10 0 C 15 -10, 30 -5, 20 15 C 15 25, 5 20, 10 35 C 12 40, 20 40, 20 30 C 20 25, 25 22, 28 27 C 32 35, 25 45, 12 45 C 0 45, -5 32, 2 20 C 5 10, -2 5, 2 -5 C 4 -10, 8 -8, 10 0 Z" />
              <path d="M -5 10 L -25 5 L -15 20 Z" />
              <path d="M 35 10 L 55 5 L 45 20 Z" />
            </g>
            
            {/* User Custom Uploaded Logo (Simulated) */}
            {designState.logo && (
              <image
                href={designState.logo}
                x={
                  designState.logoPosition === 'left-chest' ? '140' :
                  designState.logoPosition === 'right-chest' ? '230' : '180'
                }
                y="170"
                width="35"
                height="35"
                preserveAspectRatio="xMidYMid meet"
              />
            )}

            {/* Player Number Front (Smaller) */}
            {number && number.content && (
              <text
                x="200"
                y="300"
                textAnchor="middle"
                fill={number.color || '#FFFFFF'}
                fontSize="45"
                fontWeight="900"
                style={{
                  fontFamily: getFontFamily(number.font),
                }}
              >
                {number.content}
              </text>
            )}
          </g>
        ) : (
          /* BACK VIEW */
          <g id="jersey-back">
            {/* Sleeves Shadow */}
            <path d="M 60 120 L 20 180 L 55 205 L 100 155 Z" fill="rgba(0,0,0,0.15)" />
            <path d="M 340 120 L 380 180 L 345 205 L 300 155 Z" fill="rgba(0,0,0,0.15)" />

            {/* Left Sleeve */}
            <path d="M 110 100 L 40 170 L 75 200 L 125 150 Z" fill={primary} />
            {pattern !== 'none' && <path d="M 110 100 L 40 170 L 75 200 L 125 150 Z" fill={getBodyFill()} opacity="0.85" />}
            {/* Left Sleeve Accent Cuff */}
            <path d="M 40 170 L 47 177 L 82 207 L 75 200 Z" fill={accent} />

            {/* Right Sleeve */}
            <path d="M 290 100 L 360 170 L 325 200 L 275 150 Z" fill={primary} />
            {pattern !== 'none' && <path d="M 290 100 L 360 170 L 325 200 L 275 150 Z" fill={getBodyFill()} opacity="0.85" />}
            {/* Right Sleeve Accent Cuff */}
            <path d="M 360 170 L 353 177 L 318 207 L 325 200 Z" fill={accent} />

            {/* Main Body */}
            <path
              d="M 110 100 L 125 150 L 115 390 L 130 410 L 270 410 L 285 390 L 275 150 L 290 100 Q 200 120 110 100 Z"
              fill={primary}
            />
            {pattern !== 'none' && (
              <path
                d="M 110 100 L 125 150 L 115 390 L 130 410 L 270 410 L 285 390 L 275 150 L 290 100 Q 200 120 110 100 Z"
                fill={getBodyFill()}
                opacity="0.85"
              />
            )}

            {/* Side Panels */}
            <path d="M 125 150 L 115 390 L 125 390 L 133 150 Z" fill={accent} />
            <path d="M 275 150 L 285 390 L 275 390 L 267 150 Z" fill={accent} />

            {/* Collar Back */}
            <path d="M 160 92 Q 200 115 240 92 L 235 88 Q 200 108 165 88 Z" fill={accent} />

            {/* Bottom Hem Stitching */}
            <path d="M 130 405 L 270 405" stroke={accent} strokeWidth="2" strokeDasharray="4,4" />

            {/* Player Name Back */}
            <text
              x="200"
              y="160"
              textAnchor="middle"
              fill={text.color || secondary}
              fontSize="18"
              fontWeight="700"
              letterSpacing="3"
              style={{
                fontFamily: getFontFamily(text.font),
                textTransform: 'uppercase',
              }}
            >
              {text.content ? text.content.toUpperCase() : 'YOUR TEAM'}
            </text>

            {/* Player Number Back (Large) */}
            {number && number.content && (
              <text
                x="200"
                y="290"
                textAnchor="middle"
                fill={number.color || '#FFFFFF'}
                fontSize="120"
                fontWeight="900"
                style={{
                  fontFamily: getFontFamily(number.font),
                }}
              >
                {number.content}
              </text>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
