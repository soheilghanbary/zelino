import { cn } from 'cn'
import { BuildingIcon } from 'lucide-react'
import type { ExperiencesValues } from '@/lib/db/parse'
import { isCurrentPeriod } from '../lib'

type Props = {
	experiences: ExperiencesValues
}

const PERIOD_BASE =
	'rounded-full px-2 py-0.5 text-xs whitespace-nowrap tabular-nums'

export function ProfileTimeline({ experiences }: Props) {
	return (
		<ol className="flex flex-col gap-8">
			{experiences.map((experience, index) => {
				const current = isCurrentPeriod(experience.period)

				return (
					<li className="group relative flex gap-4" key={experience.id}>
						<div className="flex shrink-0 flex-col items-center">
							<span
								aria-hidden
								className="relative z-10 size-3 rounded-full border-2 border-border bg-background transition-colors group-hover:border-primary group-hover:bg-primary"
							/>
							{index < experiences.length - 1 && (
								<span aria-hidden className="mt-2 h-full w-px bg-border/50" />
							)}
						</div>

						<div className="flex flex-1 flex-col gap-1.5 pt-1">
							<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
								<h3 className="text-balance font-heading font-semibold text-base tracking-tight">
									{experience.role}
								</h3>
								<p
									className={cn(
										PERIOD_BASE,
										current
											? 'bg-emerald-600/10 font-medium text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300'
											: 'bg-muted text-muted-foreground'
									)}
								>
									{experience.period}
								</p>
							</div>

							<p className="flex items-center gap-1.5 text-muted-foreground text-sm/6">
								<BuildingIcon
									aria-hidden
									className="size-3.5 shrink-0 opacity-60"
								/>
								<span className="wrap-anywhere">{experience.company}</span>
							</p>

							{experience.description && (
								<p className="mt-2 max-w-prose select-text whitespace-pre-wrap text-pretty text-foreground/70 text-sm/7">
									{experience.description}
								</p>
							)}
						</div>
					</li>
				)
			})}
		</ol>
	)
}
