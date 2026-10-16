import { GlobeIcon, SendIcon } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import {
	DribbbleIcon,
	GithubIcon,
	InstagramIcon,
	LinkedinIcon,
	XIcon,
} from '@/assets/icons'
import { Button } from '@/components/ui/button'
import type { ProfileLink } from '../lib'

const ICONS = {
	github: GithubIcon,
	linkedin: LinkedinIcon,
	dribbble: DribbbleIcon,
	instagram: InstagramIcon,
	x: XIcon,
	telegram: SendIcon,
	globe: GlobeIcon,
} satisfies Record<ProfileLink['icon'], ComponentType<SVGProps<SVGSVGElement>>>

type Props = {
	links: ProfileLink[]
}

export function LinkButtons({ links }: Props) {
	if (links.length === 0) return null

	return (
		<ul className="flex flex-wrap items-center gap-2">
			{links.map((link) => {
				const Icon = ICONS[link.icon]

				return (
					<li key={link.href}>
						<Button
							aria-label={link.name}
							className="size-11 rounded-full sm:size-10"
							nativeButton={false}
							render={
								<a href={link.href} rel="noreferrer noopener" target="_blank" />
							}
							size="icon"
							title={link.name}
							variant="outline"
						>
							<Icon />
						</Button>
					</li>
				)
			})}
		</ul>
	)
}
