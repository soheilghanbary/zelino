import { Badge } from '@/components/ui/badge'
import type { Skill } from '@/lib/db/parse'

type Props = {
	skills: Skill[]
}

export function ProfileSkills({ skills }: Props) {
	return (
		<ul className="flex flex-wrap gap-2">
			{skills.map((skill) => (
				<li key={skill.id}>
					<Badge
						className="h-7 gap-1.5 bg-card px-3 font-medium text-foreground/85 shadow-xs transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
						variant="outline"
					>
						<span className="size-1.5 rounded-full bg-primary/50" />
						{skill.text}
					</Badge>
				</li>
			))}
		</ul>
	)
}
