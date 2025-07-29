"use client"

import { useState, useEffect, useRef } from "react";
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';

const VantaBackground = () => {
  const [theme, setTheme] = useState('dark');
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event) => {
      setTheme(event.detail);
    };

    // Get initial theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Listen for theme changes
    window.addEventListener('themeChange', handleThemeChange);

    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  // Initialize Vanta FOG effect
  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      vantaEffect.current = FOG({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: theme === 'dark' ? 0x100f0d : 0xf0f0f0,
        midtoneColor: theme === 'dark' ? 0xe01c1c : 0x9333ea,
        lowlightColor: theme === 'dark' ? 0x131315 : 0xf8f9fa,
        baseColor: theme === 'dark' ? 0x0 : 0xffffff
      });
    }
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  // Update Vanta colors when theme changes
  useEffect(() => {
    if (vantaEffect.current) {
      vantaEffect.current.setOptions({
        highlightColor: theme === 'dark' ? 0x100f0d : 0xf0f0f0,
        midtoneColor: theme === 'dark' ? 0xe01c1c : 0x9333ea,
        lowlightColor: theme === 'dark' ? 0x131315 : 0xf8f9fa,
        baseColor: theme === 'dark' ? 0x0 : 0xffffff
      });
    }
  }, [theme]);

  return (
    <div 
      ref={vantaRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default VantaBackground;