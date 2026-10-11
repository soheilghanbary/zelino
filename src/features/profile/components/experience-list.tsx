import { Separator } from '@/components/ui/separator'
import type { ExperiencesValues } from '@/lib/db/parse'

type Props = {
	experiences: ExperiencesValues
}

export function ProfileExperienceList({ experiences }: Props) {
	return (
		<ol className="flex flex-col divide-y divide-border">
			{experiences.map((experience) => (
				<li
					key={experience.id}
					className="flex flex-col gap-1.5 py-5 first:pt-0 last:pb-0"
				>
					<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
						<div className="flex flex-wrap items-center gap-1.5">
							<h3 className="font-heading font-medium text-sm tracking-tight">
								{experience.role}
							</h3>
							<Separator orientation="vertical" className={'my-auto h-3'} />
							<p className="text-muted-foreground text-sm/6">
								{experience.company}
							</p>
						</div>
						<p className="whitespace-nowrap text-muted-foreground text-sm/6 tabular-nums">
							{experience.period}
						</p>
					</div>
					{experience.description && (
						<p className="mt-1 select-text whitespace-pre-wrap text-pretty text-foreground/80 text-sm/6">
							{experience.description}
						</p>
					)}
				</li>
			))}
		</ol>
	)
}
