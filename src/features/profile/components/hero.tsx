import { MailIcon, MapPinIcon, PhoneIcon, SparklesIcon } from 'lucide-react'
import {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import type { ProfileLink } from '../lib'
import { profileInitials, profileName, toExternalUrl } from '../lib'
import type { Profile } from '../schemas'
import { LinkButtons } from './link-buttons'
import { ShareButton } from './share-button'

type Props = {
	profile: Profile
}

export function ProfileHero({ profile }: Props) {
	const name = profileName(profile)
	const hasMeta = Boolean(profile.location || profile.email || profile.phone)
	const social = profile.social
	const socialLinks = [
		social.github
			? {
					href: `https://github.com/${social.github.replace(/^@/, '')}`,
					icon: 'github' as const,
					name: 'GitHub',
				}
			: null,
		social.linkedin
			? {
					href: `https://linkedin.com/in/${social.linkedin.replace(/^@/, '')}`,
					icon: 'linkedin' as const,
					name: 'LinkedIn',
				}
			: null,
		social.dribbble
			? {
					href: `https://dribbble.com/${social.dribbble.replace(/^@/, '')}`,
					icon: 'dribbble' as const,
					name: 'Dribbble',
				}
			: null,
		social.instagram
			? {
					href: `https://instagram.com/${social.instagram.replace(/^@/, '')}`,
					icon: 'instagram' as const,
					name: 'Instagram',
				}
			: null,
		social.x
			? {
					href: `https://x.com/${social.x.replace(/^@/, '')}`,
					icon: 'x' as const,
					name: 'X',
				}
			: null,
		social.telegram
			? {
					href: `https://t.me/${social.telegram.replace(/^@/, '')}`,
					icon: 'telegram' as const,
					name: 'Telegram',
				}
			: null,
	].filter(Boolean) as ProfileLink[]

	const portfolioUrl = toExternalUrl(social.portfolio || profile.portfolio)
	const portfolioLink = portfolioUrl
		? [{ href: portfolioUrl, icon: 'globe' as const, name: 'Website' }]
		: []

	const links = [...socialLinks, ...portfolioLink]

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-5">
				<Avatar className="ring-border size-24 rounded-full ring-1 sm:size-28">
					{profile.image ? (
						<AvatarImage alt={name} src={profile.image} />
					) : (
						<AvatarFallback className="bg-primary/10 font-heading text-primary text-2xl font-semibold">
							{profileInitials(profile)}
						</AvatarFallback>
					)}
					{profile.openToWork && (
						<AvatarBadge aria-hidden className="bg-emerald-500" />
					)}
				</Avatar>

				<div className="flex flex-col gap-2">
					<h1 className="font-heading text-3xl font-bold tracking-tight text-balance">
						{name}
					</h1>

					{profile.title && (
						<p className="text-primary text-base/6 font-medium text-pretty">
							{profile.title}
						</p>
					)}

					{profile.tagline && (
						<p className="text-muted-foreground max-w-prose text-sm/6 text-pretty">
							{profile.tagline}
						</p>
					)}
				</div>

				{profile.openToWork && (
					<Badge
						className="h-6 w-fit gap-1.5 border-emerald-600/20 bg-emerald-600/10 px-2 font-medium text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300"
						variant="outline"
					>
						<SparklesIcon aria-hidden />
						#OpenToWork
					</Badge>
				)}
			</div>

			{hasMeta && (
				<ul className="text-foreground/85 flex flex-col gap-2 text-sm/6">
					{profile.location && (
						<li className="flex items-center gap-2">
							<MapPinIcon
								aria-hidden
								className="size-3.5 shrink-0 opacity-60"
							/>
							<span className="wrap-anywhere">{profile.location}</span>
						</li>
					)}
					{profile.email && (
						<li>
							<a
								className="hover:text-foreground focus-visible:ring-ring/50 flex w-fit max-w-full items-center gap-2 rounded-md transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
								href={`mailto:${profile.email}`}
							>
								<MailIcon
									aria-hidden
									className="size-3.5 shrink-0 opacity-60"
								/>
								<span className="wrap-anywhere">{profile.email}</span>
							</a>
						</li>
					)}
					{profile.phone && (
						<li>
							<a
								className="hover:text-foreground focus-visible:ring-ring/50 flex w-fit max-w-full items-center gap-2 rounded-md transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
								href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}
							>
								<PhoneIcon
									aria-hidden
									className="size-3.5 shrink-0 opacity-60"
								/>
								<span className="wrap-anywhere">{profile.phone}</span>
							</a>
						</li>
					)}
				</ul>
			)}

			<div className="flex flex-wrap items-center gap-2">
				<LinkButtons links={links} />
				<ShareButton name={name} />
			</div>
		</div>
	)
}
