import { PenLineIcon } from 'lucide-react'
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty'

export function ProfileEmptyState() {
	return (
		<Empty className="items-start border bg-muted/30 text-start">
			<EmptyHeader className="items-start">
				<EmptyMedia variant="icon">
					<PenLineIcon aria-hidden />
				</EmptyMedia>
				<EmptyTitle>This page is still a blank canvas</EmptyTitle>
				<EmptyDescription className="max-w-md text-start">
					No summary, roles, or skills yet. Everything added in the editor lands
					right here.
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	)
}
