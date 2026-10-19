import { ArrowUpRightIcon } from 'lucide-react'
import type { PortfoliosValues } from '@/lib/db/parse'
import { toExternalUrl } from '../lib'

type Props = {
	portfolios: PortfoliosValues
}

export function ProfilePortfolio({ portfolios }: Props) {
	return (
		<div className="scroll-fade-x scrollbar-none scroll-fade-4 snap-x snap-mandatory overflow-x-auto">
			<ul className="flex snap-x gap-4 pb-2 sm:grid sm:grid-cols-2 sm:gap-6 sm:pb-0">
				{portfolios.map((item) => {
					const href = toExternalUrl(item.link)
					return (
						<li
							className="group relative aspect-4/3 w-[78vw] max-w-sm shrink-0 snap-start overflow-hidden rounded-md border bg-card shadow-xs sm:w-auto sm:max-w-none sm:shrink"
							key={item.id}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							{/* biome-ignore lint/performance/noImgElement: user-provided remote image */}
							<img
								alt={item.title}
								className="absolute inset-0 h-full w-full rounded-[inherit] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
								src={item.image || '/placeholder.webp'}
							/>

							<div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-black/70 to-transparent p-4">
								<h3 className="font-heading font-semibold text-base text-white tracking-tight">
									{item.title}
								</h3>
							</div>

							<div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/20 px-4 text-center opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-black/45 group-hover:opacity-100 group-hover:backdrop-blur-md">
								{item.description && (
									<p className="max-w-prose text-pretty text-sm text-white">
										{item.description}
									</p>
								)}
								{href && (
									<a
										className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 font-medium text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/25"
										href={href}
										rel="noopener noreferrer"
										target="_blank"
									>
										Visit
										<ArrowUpRightIcon className="size-4" />
									</a>
								)}
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
