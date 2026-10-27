'use client'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
	const { theme, setTheme } = useTheme()
	return (
		<Button
			size="icon"
			variant="ghost"
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		>
			<MoonIcon className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			<SunIcon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
