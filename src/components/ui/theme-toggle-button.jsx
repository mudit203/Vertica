"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

const ThemeToggleButton = ({ 
  showLabel = false, 
  variant = "default", 
  start = "center",
  url = null 
}) => {
  const [theme, setTheme] = useState('dark')

 
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    
   
    window.dispatchEvent(new CustomEvent('themeChange', { detail: newTheme }))
  }

  const getAnimationVariants = () => {
    switch (variant) {
      case 'circle':
        return {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0, opacity: 0 }
        }
      case 'circle-blur':
        return {
          initial: { scale: 0, opacity: 0, filter: 'blur(10px)' },
          animate: { scale: 1, opacity: 1, filter: 'blur(0px)' },
          exit: { scale: 0, opacity: 0, filter: 'blur(10px)' }
        }
      case 'gif':
        return {
          initial: { rotateY: 180, opacity: 0 },
          animate: { rotateY: 0, opacity: 1 },
          exit: { rotateY: -180, opacity: 0 }
        }
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 }
        }
    }
  }

  const variants = getAnimationVariants()

  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={toggleTheme}
        className="relative w-12 h-12 rounded-full bg-gray-800 dark:bg-gray-200 flex items-center justify-center hover:scale-110"
        style={{
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          {variant === 'gif' && url ? (
            <motion.img
              key={theme}
              src={url}
              alt="Theme toggle"
              className="w-8 h-8 rounded-full"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              key={theme}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              {theme === 'dark' ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      
      {showLabel && (
        <motion.span 
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </motion.span>
      )}
    </div>
  )
}

export default ThemeToggleButton
