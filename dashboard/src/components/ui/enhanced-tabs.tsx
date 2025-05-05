"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState, useRef, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EnhancedTabsProps {
    tabs: string[]
    activeTab: number
    onChange: (index: number) => void
    showDarkModeToggle?: boolean
    className?: string
}

export default function EnhancedTabs({
    tabs,
    activeTab,
    onChange,
    showDarkModeToggle = false,
    className = ""
}: EnhancedTabsProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [hoverStyle, setHoverStyle] = useState({})
    const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
    const [isDarkMode, setIsDarkMode] = useState(false)
    const tabRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        if (hoveredIndex !== null) {
            const hoveredElement = tabRefs.current[hoveredIndex]
            if (hoveredElement) {
                const { offsetLeft, offsetWidth } = hoveredElement
                setHoverStyle({
                    left: `${offsetLeft}px`,
                    width: `${offsetWidth}px`,
                })
            }
        }
    }, [hoveredIndex])

    useEffect(() => {
        const activeElement = tabRefs.current[activeTab]
        if (activeElement) {
            const { offsetLeft, offsetWidth } = activeElement
            setActiveStyle({
                left: `${offsetLeft}px`,
                width: `${offsetWidth}px`,
            })
        }
    }, [activeTab])

    useEffect(() => {
        requestAnimationFrame(() => {
            const firstElement = tabRefs.current[0]
            if (firstElement) {
                const { offsetLeft, offsetWidth } = firstElement
                setActiveStyle({
                    left: `${offsetLeft}px`,
                    width: `${offsetWidth}px`,
                })
            }
        })
    }, [])

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle("dark")
    }

    return (
        <div className={`flex items-center w-full ${isDarkMode ? "dark bg-[#0e0f11]" : ""} ${className}`}>
            <Card
                className={`w-full max-w-[1200px] py-0  border-none shadow-none relative flex items-center ${isDarkMode ? "bg-transparent" : ""}`}
            >
                {showDarkModeToggle && (
                    <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={toggleDarkMode}>
                        {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                    </Button>
                )}
                <CardContent className="p-0 w-full">
                    <div className="relative">
                        {/* Hover Highlight */}
                        <div
                            className="absolute h-[30px] transition-all duration-300 ease-out bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-[6px] flex items-center"
                            style={{
                                ...hoverStyle,
                                opacity: hoveredIndex !== null ? 1 : 0,
                            }}
                        />

                        {/* Active Indicator */}
                        <div
                            className="absolute bottom-[-6px] h-[2px] bg-[#0e0f11] dark:bg-white transition-all duration-300 ease-out"
                            style={activeStyle}
                        />

                        {/* Tabs */}
                        <div className="relative flex space-x-[6px] items-center">
                            {tabs.map((tab, index) => (
                                <div
                                    key={index}
                                    ref={(el) => { tabRefs.current[index] = el }}
                                    className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${index === activeTab ? "text-[#0e0e10] dark:text-white" : "text-[#0e0f1199] dark:text-[#ffffff99]"
                                        }`}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() => onChange(index)}
                                >
                                    <div className="text-sm font-[var(--www-mattmannucci-me-geist-regular-font-family)] leading-5 whitespace-nowrap flex items-center justify-center h-full">
                                        {tab}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
