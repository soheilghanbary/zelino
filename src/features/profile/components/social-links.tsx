import { ArrowUpRightIcon } from 'lucide-react'
import type { SocialLinksValues } from '@/lib/db/parse'
import { toExternalUrl } from '../lib'

type Props = {
	socialLinks: SocialLinksValues
}

export function ProfileSocialLinks({ socialLinks }: Props) {
	return (
		<ul className="flex flex-col gap-2">
			{socialLinks.map((item) => {
				const href = toExternalUrl(item.link)
				return (
					<li key={item.id}>
						{href ? (
							<a
								className="flex items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3 text-sm transition-colors hover:bg-muted/50"
								href={href}
								rel="noopener noreferrer"
								target="_blank"
							>
								<span className="font-medium">{item.title}</span>
								<ArrowUpRightIcon className="size-4 text-muted-foreground" />
							</a>
						) : (
							<div className="flex items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3 text-sm">
								<span className="font-medium">{item.title}</span>
							</div>
						)}
					</li>
				)
			})}
		</ul>
	)
}
