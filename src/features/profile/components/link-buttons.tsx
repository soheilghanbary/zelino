'use client'
import { GlobeIcon } from 'lucide-react'
import Link from 'next/link'
import type { ComponentType, SVGProps } from 'react'
import { GithubIcon, LinkedinIcon } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

type Icon = ComponentType<SVGProps<SVGSVGElement>>

type ProfileLink = {
	href: string
	icon: Icon
	name: string
}

type Props = {
	githubUrl: string
	linkedinUrl: string
	portfolio: string
}

function toLink(url: string, name: string, icon: Icon): ProfileLink | null {
	const value = url.trim()
	if (!value) return null
	const href = /^https?:\/\//i.test(value) ? value : `https://${value}`
	return { href, icon, name }
}

export function LinkButtons({ githubUrl, linkedinUrl, portfolio }: Props) {
	const links = [
		toLink(githubUrl, 'GitHub', GithubIcon),
		toLink(linkedinUrl, 'LinkedIn', LinkedinIcon),
		toLink(portfolio, 'Portfolio', GlobeIcon),
	].filter((link): link is ProfileLink => link !== null)

	if (links.length === 0) return null

	return (
		<TooltipProvider>
			<ul className="flex flex-wrap items-center gap-2">
				{links.map(({ href, icon: Icon, name }) => (
					<li key={href}>
						<Tooltip>
							<TooltipTrigger
								render={
									<Button
										aria-label={name}
										className="size-10 rounded-full"
										nativeButton={false}
										render={
											<Link
												href={href}
												target={
													href.startsWith('mailto:') ? undefined : '_blank'
												}
												rel="noreferrer noopener"
											/>
										}
										size="icon"
										variant="outline"
									>
										<Icon />
									</Button>
								}
							/>
							<TooltipContent side="bottom">{name}</TooltipContent>
						</Tooltip>
					</li>
				))}
			</ul>
		</TooltipProvider>
	)
}
