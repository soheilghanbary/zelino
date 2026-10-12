import { BadgeCheckIcon, MapPinIcon } from 'lucide-react'
import { Avatar, AvatarBadge, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { appConfig } from '@/config'
import { PREVIEW } from '../data'

/**
 * A static, fictional profile rendered with the same primitives the real page
 * uses. It is the fastest way to show what the product produces — and it costs
 * no client JavaScript, unlike an image of a real profile would suggest.
 */
export function HeroPreview() {
	const initials = PREVIEW.name
		.split(' ')
		.map((part) => part[0])
		.join('')
		.slice(0, 2)

	return (
		<div className="w-full max-w-md rounded-2xl border bg-card/85 shadow-xl backdrop-blur-sm">
			<div className="flex items-center gap-3 border-b px-4 py-3">
				<div aria-hidden className="flex gap-1.5">
					<span className="size-2.5 rounded-full bg-destructive/50" />
					<span className="size-2.5 rounded-full bg-amber-500/50" />
					<span className="size-2.5 rounded-full bg-emerald-500/50" />
				</div>
				<p className="mx-auto max-w-full truncate rounded-md bg-muted px-2.5 py-1 text-muted-foreground text-xs">
					{appConfig.siteDomain}/{appConfig.showcaseUsername}
				</p>
			</div>

			<div className="flex flex-col gap-5 p-5">
				<div className="flex items-start gap-4">
					<Avatar className="size-14 rounded-full">
						<AvatarFallback className="bg-primary/10 font-heading font-semibold text-primary">
							{initials}
						</AvatarFallback>
						<AvatarBadge aria-hidden className="bg-emerald-500" />
					</Avatar>

					<div className="min-w-0 flex-1">
						<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
							<p className="font-bold font-heading text-foreground text-lg tracking-tight">
								{PREVIEW.name}
							</p>
							<Badge
								className="h-5 border-emerald-600/20 bg-emerald-600/10 px-1.5 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300"
								variant="outline"
							>
								#OpenToWork
							</Badge>
						</div>
						<p className="font-medium text-primary text-sm">{PREVIEW.role}</p>
						<p className="mt-0.5 flex items-center gap-1.5 text-muted-foreground text-xs">
							<MapPinIcon aria-hidden className="size-3 shrink-0" />
							{PREVIEW.location}
						</p>
					</div>
				</div>

				<p className="text-balance text-muted-foreground text-sm/6">
					{PREVIEW.tagline}
				</p>

				<div>
					<p className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
						Skills
					</p>
					<ul className="flex flex-wrap gap-1.5">
						{PREVIEW.skills.map((skill) => (
							<li key={skill}>
								<span className="inline-flex h-6 items-center rounded-md border bg-muted/60 px-2 font-medium text-foreground/85 text-xs">
									{skill}
								</span>
							</li>
						))}
					</ul>
				</div>

				<div>
					<p className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
						Experience
					</p>
					<ul className="flex flex-col gap-2.5">
						{PREVIEW.experience.map((entry) => (
							<li
								className="flex items-baseline justify-between gap-3"
								key={entry.role}
							>
								<p className="min-w-0 text-sm">
									<span className="font-medium">{entry.role}</span>
									<span className="text-muted-foreground">
										{' '}
										· {entry.company}
									</span>
								</p>
								<p className="shrink-0 whitespace-nowrap rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs tabular-nums">
									{entry.period}
								</p>
							</li>
						))}
					</ul>
				</div>

				<p className="flex items-center gap-1.5 border-t pt-3 text-muted-foreground text-xs">
					<BadgeCheckIcon
						aria-hidden
						className="size-3.5 shrink-0 text-emerald-500"
					/>
					Every field above came from the editor — no theme involved.
				</p>
			</div>
		</div>
	)
}
