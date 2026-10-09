import { Skeleton } from '@/components/ui/skeleton'

/**
 * Mirrors `AboutForm`'s layout so the Suspense fallback swaps in without shifting
 * content. Heights are taken from the real components: `h-9` inputs, `h-4` labels,
 * `size-28` avatar.
 */
export function AboutFormSkeleton() {
	return (
		<div role="status" aria-busy="true">
			<span className="sr-only">Loading profile</span>

			<div aria-hidden="true" className="flex flex-col gap-6">
				<div className="flex flex-wrap items-center gap-4">
					<Skeleton className="size-28 rounded-full" />
					<div className="grid gap-2">
						<Skeleton className="h-9 w-36" />
						<Skeleton className="h-3 w-72 max-w-full" />
					</div>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					<div className="flex flex-col gap-3">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-9 w-full" />
					</div>

					<div className="flex flex-col gap-3">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-9 w-full" />
					</div>

					<div className="flex flex-col gap-3 sm:col-span-2">
						<div className="flex items-baseline justify-between gap-2">
							<Skeleton className="h-4 w-28" />
							<Skeleton className="h-3 w-12" />
						</div>
						<Skeleton className="h-9 w-full" />
					</div>

					<div className="flex flex-col gap-3 sm:col-span-2">
						<div className="flex items-baseline justify-between gap-2">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-3 w-14" />
						</div>
						<Skeleton className="h-24 w-full" />
					</div>
				</div>

				<Skeleton className="h-9 w-24" />
			</div>
		</div>
	)
}
