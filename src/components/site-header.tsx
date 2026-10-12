'use client'
import { cn } from 'cn'
import { GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AuthMenu } from './auth-menu'
import { ModeToggle } from './mode-toggle'

type Props = {
	/** Width of the inner bar, aligned with the page content. */
	className?: string
}

const HIDE_AFTER = 120
const SCROLL_THRESHOLD = 4

const ACTIVE_CONTROL_SELECTOR = [
	'[aria-expanded="true"]',
	'[data-popup-open]',
	'[data-open]',
].join(', ')

export function SiteHeader({ className }: Props) {
	const headerRef = useRef<HTMLElement>(null)
	const [hidden, setHidden] = useState(false)

	useEffect(() => {
		const header = headerRef.current

		if (!header) return

		let lastY = Math.max(0, window.scrollY)
		let ticking = false
		let frameId = 0

		const isBusy = () => {
			return (
				header.contains(document.activeElement) ||
				header.querySelector(ACTIVE_CONTROL_SELECTOR) !== null
			)
		}

		const reveal = () => {
			setHidden((current) => (current ? false : current))
		}

		const update = () => {
			ticking = false
			frameId = 0

			const y = Math.max(0, window.scrollY)
			const delta = y - lastY

			// Always reveal the header near the top of the page.
			if (y <= HIDE_AFTER) {
				lastY = y
				reveal()
				return
			}

			// Ignore tiny movements to prevent trackpad flicker.
			if (Math.abs(delta) < SCROLL_THRESHOLD) return

			// Update the reference position only after meaningful movement.
			lastY = y

			// Never hide a header containing active controls.
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

		const onFocusIn = () => {
			reveal()
		}

		const onPointerDown = (event: PointerEvent) => {
			const target = event.target

			if (target instanceof Node && header.contains(target)) {
				reveal()
			}
		}

		window.addEventListener('scroll', onScroll, {
			passive: true,
		})

		header.addEventListener('focusin', onFocusIn)
		header.addEventListener('pointerdown', onPointerDown)

		return () => {
			window.removeEventListener('scroll', onScroll)
			header.removeEventListener('focusin', onFocusIn)
			header.removeEventListener('pointerdown', onPointerDown)

			if (frameId) {
				window.cancelAnimationFrame(frameId)
			}
		}
	}, [])

	return (
		<header
			ref={headerRef}
			data-hidden={hidden || undefined}
			className={cn(
				'sticky top-0 z-50 border-border/60 border-b',
				'bg-background/70 backdrop-blur-xl',
				'motion-safe:transition-[translate]',
				'motion-safe:duration-300 motion-safe:ease-out',
				'motion-reduce:transition-none',
				hidden ? '-translate-y-full' : 'translate-y-0'
			)}
		>
			<div
				className={cn(
					'mx-auto flex h-14 w-full max-w-5xl items-center',
					'gap-3 px-4 md:h-16 md:px-6',
					className
				)}
			>
				<Link
					href="/"
					className={cn(
						'group -ms-1.5 flex shrink-0 items-center gap-2',
						'rounded-lg px-1.5 py-1 outline-none',
						'focus-visible:ring-[3px] focus-visible:ring-ring/50'
					)}
				>
					<span
						className={cn(
							'flex size-7 items-center justify-center rounded-lg',
							'bg-primary/10 text-primary transition-colors',
							'group-hover:bg-primary/15'
						)}
					>
						<GalleryVerticalEndIcon aria-hidden="true" className="size-4" />
					</span>

					<span className="font-heading font-semibold text-sm tracking-tight">
						Zelino
					</span>
				</Link>

				<div className="ms-auto flex items-center gap-1">
					<ModeToggle />
					<AuthMenu />
				</div>
			</div>
		</header>
	)
}
