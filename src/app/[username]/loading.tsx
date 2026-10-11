import type { ReactNode } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function Lines({ widths }: { widths: string[] }) {
	return (
		<div className="flex flex-col gap-3">
			{widths.map((width) => (
				<Skeleton className={`h-4 ${width}`} key={width} />
			))}
		</div>
	)
}

function SectionSkeleton({
	labelWidth,
	children,
	className,
}: {
	labelWidth: string
	children: ReactNode
	className?: string
}) {
	return (
		<div className={`flex flex-col gap-4 ${className ?? ''}`}>
			<Skeleton className={`h-3 ${labelWidth}`} />
			{children}
		</div>
	)
}

export default function Loading() {
	return (
		<div role="status" aria-busy="true" className="p-8">
			<span className="sr-only">Loading profile</span>

			<div aria-hidden="true" className="flex min-h-svh flex-col">
				<header className="p-4">
					<div className="mx-auto flex w-full max-w-4xl items-center gap-2 rounded-full border border-border/60 bg-background/75 p-1 shadow-sm backdrop-blur-xl">
						<div className="ml-1 flex shrink-0 items-center gap-2">
							<Skeleton className="size-7 rounded-full" />
							<Skeleton className="h-4 w-14" />
						</div>
						<div className="ms-auto flex items-center gap-1">
							<Skeleton className="size-9 rounded-md" />
							<Skeleton className="size-9 rounded-full" />
						</div>
					</div>
				</header>

				<main className="mx-auto w-full max-w-5xl px-4">
					<div className="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
						<div className="flex flex-col gap-6">
							<div className="flex flex-col gap-5">
								<Skeleton className="size-24 rounded-full" />
								<div className="flex select-text flex-col gap-1.5">
									<Skeleton className="h-7 w-48" />
									<Skeleton className="h-4 w-32" />
									<Skeleton className="h-4 w-11/12" />
									<Skeleton className="h-4 w-8/12" />
									<Skeleton className="h-4 w-28" />
									<Skeleton className="h-4 w-44" />
									<Skeleton className="h-4 w-32" />
								</div>
							</div>

							<div className="flex flex-wrap items-center gap-1.5">
								{Array.from({ length: 3 }).map((_, index) => (
									<Skeleton className="size-10 rounded-full" key={index} />
								))}
							</div>
						</div>

						<div className="flex flex-col gap-8">
							<SectionSkeleton labelWidth="w-14">
								<Lines widths={['w-full', 'w-11/12', 'w-9/12', 'w-4/5']} />
							</SectionSkeleton>

							<SectionSkeleton className="border-t pt-8" labelWidth="w-24">
								<div className="flex flex-col gap-5">
									{[0, 1].map((group) => (
										<div className="flex flex-col gap-2" key={group}>
											<div className="flex items-baseline justify-between gap-4">
												<Skeleton className="h-5 w-48" />
												<Skeleton className="h-4 w-28" />
											</div>
											<Skeleton className="h-4 w-36" />
											{group === 0 && (
												<Lines widths={['w-full', 'w-10/12', 'w-7/12']} />
											)}
										</div>
									))}
								</div>
							</SectionSkeleton>
							<SectionSkeleton className="border-t pt-8" labelWidth="w-14">
								<div className="flex flex-wrap gap-2">
									{['w-24', 'w-20', 'w-28', 'w-16', 'w-24', 'w-20'].map(
										(width, index) => (
											<Skeleton
												key={`${width}-${index}`}
												className={`h-6 rounded-4xl px-2.5 ${width}`}
											/>
										)
									)}
								</div>
							</SectionSkeleton>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
