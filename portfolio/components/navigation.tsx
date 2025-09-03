"use client"

import { useState, useEffect, useRef } from "react"

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll detection for active section
  useEffect(() => {
    const sections = ["home", "about", "contact"]
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY
          const windowHeight = window.innerHeight
          let newActiveSection = activeSection

          // Check if we're at the very top (home section)
          if (scrollPosition < windowHeight * 0.4) {
            newActiveSection = "home"
          } else {
            // Check other sections
            for (let i = sections.length - 1; i >= 0; i--) {
              const section = document.getElementById(sections[i])
              if (section && sections[i] !== "home") {
                const sectionTop = section.offsetTop
                const sectionHeight = section.offsetHeight
                
                // Section is active if scroll position is within the section bounds
                if (scrollPosition >= sectionTop - windowHeight * 0.4 && 
                    scrollPosition < sectionTop + sectionHeight - windowHeight * 0.2) {
                  newActiveSection = sections[i]
                  break
                }
              }
            }
          }

          // Only update if the section actually changed
          if (newActiveSection !== activeSection) {
            setActiveSection(newActiveSection)
          }

          ticking = false
        })
        ticking = true
      }
    }

    // Initial check
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [activeSection])

  // Update indicator position when active section changes
  useEffect(() => {
    if (!isMobile && containerRef.current) {
      const navItems = ["home", "about", "contact"]
      const activeIndex = navItems.indexOf(activeSection)
      const activeButton = buttonRefs.current[activeIndex]
      
      if (activeButton && containerRef.current) {
        // Use requestAnimationFrame for smoother animation
        requestAnimationFrame(() => {
          if (containerRef.current && activeButton) {
            const containerRect = containerRef.current.getBoundingClientRect()
            const buttonRect = activeButton.getBoundingClientRect()
            
            const left = buttonRect.left - containerRect.left
            const width = buttonRect.width
            
            setIndicatorStyle({ left, width })
          }
        })
      }
    }
  }, [activeSection, isMobile]) // Keep dependencies but use requestAnimationFrame

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsOpen(false) // Close sidebar after navigation on mobile
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  // Desktop: Modern nav with sliding indicator
  if (!isMobile) {
    const navItems = ["home", "about", "contact"]
    
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-center">
          <div 
            ref={containerRef}
            className="relative flex gap-8 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 border border-black/10 shadow-lg"
          >
            {/* Sliding Background Indicator */}
            <div 
              className="absolute top-2 bottom-2 bg-black/10 rounded-full transition-all duration-500 ease-out backdrop-blur-sm border border-black/5 shadow-sm"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
              }}
            />
            
            {navItems.map((section, index) => (
              <button
                key={section}
                ref={(el) => {
                  buttonRefs.current[index] = el
                }}
                onClick={() => scrollToSection(section)}
                className={`relative z-10 px-3 py-2 transition-all duration-300 capitalize font-sans font-medium tracking-wide hover:scale-105 ${
                  activeSection === section 
                    ? "text-black" 
                    : "text-black/60 hover:text-black/80"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>
    )
  }

  // Mobile: Collapsible sidebar with 3D sphere toggle
  return (
    <>
      {/* Minimalistic Animated Liquid Blob Toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-6 left-6 z-[60] w-12 h-12 transition-all duration-300 hover:scale-110 active:scale-95 group"
      >
        {/* Animated Liquid Blob */}
        <div 
          className="w-full h-full bg-white/90 transition-all duration-500 ease-out shadow-lg hover:shadow-xl hover:shadow-white/20"
          style={{
            borderRadius: isOpen 
              ? '20% 25% 30% 20%' 
              : '45% 30% 35% 40%',
            animation: 'blob-morph 4s ease-in-out infinite',
            transform: `scale(${isOpen ? '0.9' : '1'}) rotate(${isOpen ? '90deg' : '0deg'})`,
            filter: 'blur(0.5px)',
          }}
        >
          {/* Hamburger Lines - Integrated into blob */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div 
              className={`w-5 h-0.5 bg-black/80 rounded transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-0.5 opacity-90' : 'opacity-70'
              }`} 
            />
            <div 
              className={`w-5 h-0.5 bg-black/80 rounded my-1 transition-all duration-300 ${
                isOpen ? 'opacity-0 scale-0' : 'opacity-70'
              }`} 
            />
            <div 
              className={`w-5 h-0.5 bg-black/80 rounded transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-0.5 opacity-90' : 'opacity-70'
              }`} 
            />
          </div>
        </div>
      </button>

      {/* Blob Animation Keyframes */}
      <style jsx>{`
        @keyframes blob-morph {
          0%, 100% {
            border-radius: 45% 30% 35% 40%;
          }
          25% {
            border-radius: 30% 50% 40% 25%;
          }
          50% {
            border-radius: 40% 35% 50% 30%;
          }
          75% {
            border-radius: 35% 40% 30% 50%;
          }
        }
      `}</style>

      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Collapsible Sidebar */}
      <nav 
        className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl border-r border-white/10 z-[56] transition-all duration-500 ease-out ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
        style={{
          boxShadow: isOpen ? '0 0 50px rgba(0,0,0,0.5), 0 0 100px rgba(255,255,255,0.1)' : 'none'
        }}
      >
        <div className="pt-24 px-8">
          {/* Navigation Items */}
          <div className="space-y-6">
            {["home", "about", "contact"].map((section, index) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`w-full text-left py-4 px-6 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  activeSection === section 
                    ? 'bg-gradient-to-r from-white/20 to-gray-200/10 text-white border border-white/20 shadow-lg' 
                    : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeSection === section 
                      ? 'bg-white shadow-lg shadow-white/50' 
                      : 'bg-white/30 group-hover:bg-white/60'
                  }`} />
                  <span className="text-xl font-sans font-medium capitalize tracking-wide">
                    {section}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="text-white/40 text-sm text-center">
              <p className="font-mono tracking-widest">A N D Y    Z H O U</p>
              <p className="mt-2 text-xs font-sans">Software Developer</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
