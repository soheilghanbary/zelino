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
	children,
	className,
	delay,
	labelWidth,
}: {
	children: ReactNode
	className?: string
	delay?: string
	labelWidth: string
}) {
	return (
		<div
			className={`flex flex-col gap-6 ${className ?? ''}`}
			style={{ animationDelay: delay ?? '0ms' }}
		>
			<div className="flex items-center gap-4">
				<Skeleton className={`h-3 ${labelWidth}`} />
				<Skeleton className="h-px flex-1" />
			</div>
			{children}
		</div>
	)
}

export default function Loading() {
	return (
		<div aria-busy="true" className="relative isolate min-h-svh" role="status">
			<span className="sr-only">Loading profile</span>
			<div aria-hidden="true" className="flex flex-col">
				<main className="mx-auto w-full max-w-5xl p-6 px-4 pb-24">
					<div className="grid gap-12 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-16">
						<aside className="flex flex-col gap-8">
							<div className="flex flex-col gap-7">
								<div className="flex flex-col gap-5">
									<Skeleton className="size-24 rounded-full sm:size-28" />
									<div className="flex flex-col gap-3">
										<Skeleton className="h-8 w-48" />
										<Skeleton className="h-4 w-32" />
										<Skeleton className="h-4 w-56" />
										<Skeleton className="h-5 w-28 rounded-full" />
									</div>
								</div>
								<div className="flex flex-col gap-3">
									<Skeleton className="h-4 w-40" />
									<Skeleton className="h-4 w-52" />
								</div>
								<div className="flex items-center gap-2">
									<Skeleton className="size-10 rounded-full" />
									<Skeleton className="size-10 rounded-full" />
									<Skeleton className="h-8 w-20 rounded-full" />
								</div>
							</div>

							<div className="flex flex-col gap-1">
								{Array.from({ length: 3 }).map((_, index) => (
									<Skeleton className="h-9 w-40" key={index} />
								))}
							</div>
						</aside>

						<div className="flex flex-col gap-10">
							<SectionSkeleton delay="100ms" labelWidth="w-14">
								<Lines widths={['w-full', 'w-11/12', 'w-9/12', 'w-4/5']} />
							</SectionSkeleton>

							<SectionSkeleton
								className="border-t pt-10"
								delay="150ms"
								labelWidth="w-24"
							>
								<div className="flex flex-col gap-8">
									{[0, 1].map((group) => (
										<div
											className="grid grid-cols-[0.875rem_minmax(0,1fr)] gap-x-4"
											key={group}
										>
											<Skeleton className="mt-1.5 size-3.5 rounded-full" />
											<div className="flex flex-col gap-2">
												<div className="flex items-baseline justify-between gap-4">
													<Skeleton className="h-5 w-48" />
													<Skeleton className="h-5 w-24 rounded-full" />
												</div>
												<Skeleton className="h-4 w-36" />
												{group === 0 && (
													<Lines widths={['w-full', 'w-10/12', 'w-7/12']} />
												)}
											</div>
										</div>
									))}
								</div>
							</SectionSkeleton>

							<SectionSkeleton
								className="border-t pt-10"
								delay="200ms"
								labelWidth="w-14"
							>
								<div className="flex flex-wrap gap-2">
									{['w-24', 'w-20', 'w-28', 'w-16', 'w-24', 'w-20'].map(
										(width, index) => (
											<Skeleton
												className={`h-7 rounded-lg px-3 ${width}`}
												key={`${width}-${index}`}
											/>
										)
									)}
								</div>
							</SectionSkeleton>

							<div className="flex items-center justify-between border-t pt-6">
								<Skeleton className="h-3 w-32" />
								<Skeleton className="h-3 w-28" />
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
