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
					<Badge className="h-6 px-2.5 font-normal" variant="secondary">
						{skill.text}
					</Badge>
				</li>
			))}
		</ul>
	)
}
