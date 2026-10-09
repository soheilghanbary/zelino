import { Skeleton } from '@/components/ui/skeleton'

export function SkillsFormSkeleton() {
	return (
		<div role="status" aria-busy="true">
			<span className="sr-only">Loading skills</span>

			<div aria-hidden="true" className="flex flex-col gap-6">
				<div className="flex flex-col gap-3">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-9 w-full" />
					<Skeleton className="h-3 w-72 max-w-full" />
				</div>

				<Skeleton className="h-9 w-24" />
			</div>
		</div>
	)
}
