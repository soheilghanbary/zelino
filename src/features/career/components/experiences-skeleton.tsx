import { Skeleton } from '@/components/ui/skeleton'

export function ExperiencesSkeleton() {
	return (
		<div role="status" aria-busy="true">
			<span className="sr-only">Loading experiences</span>

			<div aria-hidden="true" className="flex flex-col gap-4">
				<div className="flex items-center justify-between gap-2">
					<Skeleton className="h-4 w-28" />
					<Skeleton className="h-8 w-36" />
				</div>

				<div className="flex flex-col gap-3">
					{Array.from({ length: 3 }).map((_, index) => (
						<div
							key={index}
							className="flex flex-col gap-2 rounded-md border p-4"
						>
							<Skeleton className="h-4 w-40" />
							<Skeleton className="h-3 w-24" />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
