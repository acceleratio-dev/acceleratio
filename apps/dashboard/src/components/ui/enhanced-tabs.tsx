'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface TabsProps {
  tabs: string[];
  activeIndex: number;
  onTabChange: (index: number) => void;
  className?: string;
  tabKey?: string;
}

export const EnhancedTabs = ({ tabs, activeIndex, onTabChange, className = '', tabKey = 'tab' }: TabsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: '0px', width: '0px' });
  const [hasLoadedFromUrl, setHasLoadedFromUrl] = useState(false);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (tabKey && !hasLoadedFromUrl) {
      const savedIndex = searchParams.get(tabKey);
      if (savedIndex !== null) {
        const index = parseInt(savedIndex, 10);
        if (!isNaN(index) && index >= 0 && index < tabs.length) {
          onTabChange(index);
        }
      }
      setHasLoadedFromUrl(true);
    }
  }, [tabKey, searchParams, onTabChange, tabs.length, hasLoadedFromUrl]);

  useEffect(() => {
    if (tabKey && hasLoadedFromUrl) {
      const params = new URLSearchParams(searchParams);
      params.set(tabKey, activeIndex.toString());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [activeIndex, tabKey, router, pathname, searchParams, hasLoadedFromUrl]);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    } else {
      // If element not ready, try again on next frame
      requestAnimationFrame(() => {
        const activeElement = tabRefs.current[activeIndex];
        if (activeElement) {
          const { offsetLeft, offsetWidth } = activeElement;
          setActiveStyle({
            left: `${offsetLeft}px`,
            width: `${offsetWidth}px`,
          });
        }
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const firstElement = tabRefs.current[0];
      if (firstElement) {
        const { offsetLeft, offsetWidth } = firstElement;
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    });
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute h-[30px] transition-all duration-300 ease-out bg-slate-200/70 rounded-[6px] flex items-center"
        style={{
          ...hoverStyle,
          opacity: hoveredIndex !== null ? 1 : 0,
        }}
      />

      <div
        className="absolute bottom-[-6px] h-[2px] bg-slate-600 transition-all duration-300 ease-out"
        style={activeStyle}
      />

      <div className="relative flex space-x-[6px] items-center">
        {tabs.map((tab, index) => (
          <div
            key={index}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            className={`px-3 py-2 cursor-pointer font-medium transition-colors duration-300 h-[30px] ${
              index === activeIndex ? 'text-slate-700' : 'text-slate-500'
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onTabChange(index)}
          >
            <div className="text-sm leading-5 whitespace-nowrap flex items-center justify-center h-full">{tab}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
