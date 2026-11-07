// components/AnimatedText.tsx
'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  text: string | ReactNode[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  wordDelay?: number;
  delay?: number;
  once?: boolean;
  /** Extra vertical padding (em units) inside each mask — increases clipping headroom */
  maskPadY?: number;
  /** Extra horizontal padding (em units) inside each mask — protects italic overhang */
  maskPadX?: number;
}

function tokenize(str: string) {
  return str.split(/(\s+)/).filter((s) => s !== '');
}

export default function AnimatedText({
  text,
  className,
  as: Tag = 'span', // default to span so it nests cleanly inside <h1>/<h2>
  wordDelay = 0.06,
  delay = 0,
  once = true,
  maskPadY = 0.12,
  maskPadX = 0.08,
}: AnimatedTextProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const segments: ReactNode[] = typeof text === 'string' ? [text] : text;

  type Token = { content: string; segIndex: number; isSpace: boolean };
  const tokens: Token[] = [];

  segments.forEach((seg, segIndex) => {
    if (typeof seg === 'string') {
      tokenize(seg).forEach((t) => {
        tokens.push({
          content: t,
          segIndex,
          isSpace: /^\s+$/.test(t),
        });
      });
    } else {
      tokens.push({ content: '', segIndex, isSpace: false });
    }
  });

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: wordDelay, delayChildren: delay },
    },
  };

  const wordVariant: Variants = {
    hidden: { y: '110%' },
    visible: {
      y: '0%',
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        style={{ display: 'inline' }}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-80px' }}
      >
        {tokens.map((tok, i) => {
          if (tok.isSpace) {
            return <span key={i}>{'\u00A0'}</span>;
          }

          const originalSeg = segments[tok.segIndex];
          const isNodeSegment = typeof originalSeg !== 'string';

          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'bottom',
                lineHeight: 1.1,
                paddingTop: `${maskPadY}em`,
                paddingBottom: `${maskPadY}em`,
                paddingLeft: `${maskPadX}em`,
                paddingRight: `${maskPadX}em`,
                marginTop: `-${maskPadY}em`,
                marginBottom: `-${maskPadY}em`,
                marginLeft: `-${maskPadX}em`,
                marginRight: `-${maskPadX}em`,
              }}
            >
              <motion.span
                style={{ display: 'inline-block' }}
                variants={wordVariant}
              >
                {isNodeSegment ? originalSeg : tok.content}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
