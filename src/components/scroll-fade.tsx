'use client'
import { cn } from 'cn'
import type * as React from 'react'
import { type PropsWithChildren, useCallback, useEffect, useRef } from 'react'

const FADE_PX = 28

/**
 * Horizontal scroll container that fades its edges only when there is
 * actually content to scroll towards, so a list that fits never fades.
 *
 * The mask is written straight to the DOM node instead of through state —
 * scroll events fire far faster than React needs to re-render, and the only
 * output is one custom style on one element.
 */
export function ScrollFade({
	className,
	children,
	...props
}: PropsWithChildren<React.ComponentPropsWithoutRef<'div'>>) {
	const ref = useRef<HTMLDivElement>(null)

	const sync = useCallback(() => {
		const el = ref.current
		if (!el) return

		const max = el.scrollWidth - el.clientWidth
		const scrollable = max > 1
		const start = scrollable && el.scrollLeft > 1
		const end = scrollable && el.scrollLeft < max - 1

		// Alpha per edge rather than adding/removing gradient stops keeps the
		// stop count fixed, which is what makes mask-image transitionable.
		const mask = `linear-gradient(to right, rgb(0 0 0 / ${start ? 0 : 1}) 0px, black ${FADE_PX}px, black calc(100% - ${FADE_PX}px), rgb(0 0 0 / ${end ? 0 : 1}) 100%)`

		el.style.maskImage = scrollable ? mask : 'none'
		el.style.webkitMaskImage = scrollable ? mask : 'none'
	}, [])

	useEffect(() => {
		const el = ref.current
		if (!el) return

		sync()

		const observer = new ResizeObserver(sync)
		observer.observe(el)
		for (const child of el.children) observer.observe(child)

		return () => observer.disconnect()
	}, [sync])

	return (
		<div
			{...props}
			ref={ref}
			onScroll={sync}
			className={cn(
				'hide-scrollbar overflow-x-auto overscroll-x-contain transition-[mask-image] duration-300 ease-out',
				className
			)}
		>
			{children}
		</div>
	)
}
