import { Skeleton } from '@/components/ui/skeleton'

export function SocialSkeleton() {
	return (
		<div className="flex flex-col gap-3">
			<Skeleton className="h-10 w-full" />
			<Skeleton className="h-10 w-full" />
			<Skeleton className="h-10 w-full" />
			<Skeleton className="h-9 w-20" />
		</div>
	)
}
