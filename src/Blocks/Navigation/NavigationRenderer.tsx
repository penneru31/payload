'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Media, Page } from '@/payload-types'
import './Navigation.css'

type NavigationBlockData = Extract<Page['layout'][number], { blockType: 'navigation' }>

interface NavigationRendererProps extends NavigationBlockData {
  disableInnerContainer?: boolean
}

const NavigationBlock: React.FC<NavigationRendererProps> = ({ theme, logo, links, buttons }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Mapping theme keys to CSS classes.
  const themeClasses: Record<string, string> = {
    'black-theme': 'navbar-black',
    'white-theme': 'navbar-white',
    'orange-theme': 'navbar-orange',
    'green-theme': 'navbar-green',
  }
  console.log('media', logo)
  // Use provided theme; default to 'orange-theme' if not found.
  const themeClass = themeClasses[theme] || themeClasses['orange-theme']

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  return (
    <nav className={`navbar ${themeClass}`}>
      <div className="navbar-inner">
        <div className="navbar-logo">
          <Link href="/">
            <Image
              src={(logo.image as Media)?.url || ''}
              alt="altt"
              width={80}
              height={80}
              className="logo"
            />
          </Link>
        </div>
        <div className="navbar-menu-toggle" onClick={toggleMobileMenu}>
          <span className="hamburger-icon">{isMobileMenuOpen ? '✖' : '☰'}</span>
        </div>
        <ul className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          {links?.map((link, index) => (
            <li key={index}>
              <a href={link.url}>{link.text}</a>
            </li>
          ))}
        </ul>
        <div className={`navbar-buttons ${isMobileMenuOpen ? 'open' : ''}`}>
          {buttons?.map((button, index) => {
            const btnClass = button.style === 'primary' ? 'btn-primary' : 'btn-secondary'
            const href = button.url.startsWith('#')
              ? button.url
              : button.url.startsWith('/')
                ? button.url
                : button.url
            return (
              <Link key={index} href={href} className={`btn ${btnClass}`}>
                {button.text}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default NavigationBlock
