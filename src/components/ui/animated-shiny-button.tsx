import type React from "react"
import { ChevronRight } from "lucide-react"
import "./animated-shiny-button.css"

interface AnimatedShinyButtonProps {
  children: React.ReactNode
  className?: string
  url?: string
}

export function AnimatedShinyButton({
  children,
  className = "",
  url,
}: AnimatedShinyButtonProps) {
  return (
    <>
      {url ? (
        <a href={url} className={`shiny-cta-link group ${className}`}>
          <span className="flex items-center">
            {children}
            <ChevronRight className="ml-1 size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
          </span>
        </a>
      ) : (
        <button className={`shiny-cta group ${className}`}>
          <span className="flex items-center">
            {children}
            <ChevronRight className="ml-1 size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
          </span>
        </button>
      )}
    </>
  )
}
