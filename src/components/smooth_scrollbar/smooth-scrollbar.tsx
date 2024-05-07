import React, { useRef, useEffect, ReactNode } from 'react';
import Scrollbar from 'smooth-scrollbar';
import { ScrollbarOptions } from 'smooth-scrollbar/interfaces';

interface SmoothScrollbarProps {
  children: ReactNode;
}

const SmoothScrollbar: React.FC<SmoothScrollbarProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollbar: Scrollbar | null = null;
    if (scrollRef.current) {
      scrollbar = Scrollbar.init(scrollRef.current);
      console.log('Scrollbar init')
    }

    return () => {
      scrollbar?.destroy();
    };
  }, []);

  return (
    <div ref={scrollRef} style={{ height: '100%', width: '100%' }}>
      {children}
    </div>
  );
};

export default SmoothScrollbar;