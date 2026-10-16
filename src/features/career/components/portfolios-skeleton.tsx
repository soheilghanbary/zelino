import { Skeleton } from '@/components/ui/skeleton'

export function PortfoliosSkeleton() {
	return (
		<div className="flex flex-col gap-3">
			<Skeleton className="h-4 w-40" />
			<Skeleton className="h-48 w-full" />
			<Skeleton className="h-48 w-full" />
		</div>
	)
}
