'use client'

import { cn } from 'cn'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

const HIDE_AFTER = 20
const SCROLL_THRESHOLD = 4

const ACTIVE_CONTROL_SELECTOR = [
	'[aria-expanded="true"]',
	'[data-popup-open]',
	'[data-open]',
].join(', ')

export function SiteHeaderShell({ children }: { children: ReactNode }) {
	const headerRef = useRef<HTMLElement>(null)
	const [hidden, setHidden] = useState(false)

	useEffect(() => {
		const header = headerRef.current
		if (!header) return

		let lastY = Math.max(0, window.scrollY)
		let ticking = false
		let frameId = 0

		const isBusy = () =>
			header.contains(document.activeElement) ||
			header.querySelector(ACTIVE_CONTROL_SELECTOR) !== null

		const reveal = () => setHidden((current) => (current ? false : current))

		const update = () => {
			ticking = false
			frameId = 0

			const y = Math.max(0, window.scrollY)
			const delta = y - lastY

			if (y <= HIDE_AFTER) {
				lastY = y
				reveal()
				return
			}

			if (Math.abs(delta) < SCROLL_THRESHOLD) return

			lastY = y

			if (isBusy()) {
				reveal()
				return
			}

			const shouldHide = delta > 0
			setHidden((current) => (current === shouldHide ? current : shouldHide))
		}

		const onScroll = () => {
			if (ticking) return
			ticking = true
			frameId = window.requestAnimationFrame(update)
		}

		const onFocusIn = () => reveal()
		const onPointerDown = (event: PointerEvent) => {
			const target = event.target
			if (target instanceof Node && header.contains(target)) reveal()
		}

		window.addEventListener('scroll', onScroll, { passive: true })
		header.addEventListener('focusin', onFocusIn)
		header.addEventListener('pointerdown', onPointerDown)

		return () => {
			window.removeEventListener('scroll', onScroll)
			header.removeEventListener('focusin', onFocusIn)
			header.removeEventListener('pointerdown', onPointerDown)
			if (frameId) window.cancelAnimationFrame(frameId)
		}
	}, [])

	return (
		<header
			ref={headerRef}
			data-hidden={hidden || undefined}
			className={cn(
				'sticky top-0 z-50',
				'bg-background/70 backdrop-blur-xl',
				'motion-safe:transition-[translate]',
				'motion-safe:duration-300 motion-safe:ease-out',
				'motion-reduce:transition-none',
				hidden ? '-translate-y-full' : 'translate-y-0'
			)}
		>
			{children}
		</header>
	)
}
