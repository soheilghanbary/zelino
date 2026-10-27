'use client'
import { useTheme } from 'next-themes'
import CrystalizedBall from '@/components/CrystalizedBall'

export function CrystalShowcase() {
	const { resolvedTheme } = useTheme()

	return (
		<CrystalizedBall
			preset="solar"
			color="#1F75EC"
			size={0.7}
			crackle={0.7}
			fill={0.55}
			interactive
			hoverStrength={0.7}
			strands={6}
			flares={1}
			glow={1.1}
			sparks={0.5}
			particleCount={15000}
			motion="orbit"
			particleShape="square"
			depth={0.6}
			sway={0.7}
			twinkle={0.5}
			haze={0.8}
			dustSpeed={1}
			speed={1}
			intro
			paused={false}
			theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
		/>
	)
}
