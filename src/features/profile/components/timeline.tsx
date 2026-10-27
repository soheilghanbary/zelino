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
		// The rail is drawn on the list itself so it never has to know which
		// entry is last — no `:last-child` bookkeeping on every row.
		<ol className="before:bg-border relative flex flex-col gap-8 before:absolute before:start-[0.4375rem] before:top-3 before:bottom-3 before:w-px">
			{experiences.map((experience) => {
				const current = isCurrentPeriod(experience.period)

				return (
					<li
						className="relative grid grid-cols-[0.875rem_minmax(0,1fr)] gap-x-4"
						key={experience.id}
					>
						<span
							aria-hidden
							className="border-border bg-background relative z-10 mt-1.5 size-3.5 rounded-full border-2"
						/>

						<div className="flex flex-col gap-1.5">
							<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
								<h3 className="font-heading text-base font-semibold tracking-tight text-balance">
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

							<p className="text-muted-foreground flex items-center gap-1.5 text-sm/6">
								<BuildingIcon
									aria-hidden
									className="size-3.5 shrink-0 opacity-60"
								/>
								<span className="wrap-anywhere">{experience.company}</span>
							</p>

							{experience.description && (
								<p className="text-foreground/70 mt-2 max-w-prose text-sm/7 text-pretty whitespace-pre-wrap">
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
