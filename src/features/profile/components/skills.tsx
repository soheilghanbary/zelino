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
						className="bg-card text-foreground/85 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground h-7 gap-1.5 px-3 font-medium shadow-xs transition-colors"
						variant="outline"
					>
						{skill.text}
					</Badge>
				</li>
			))}
		</ul>
	)
}
