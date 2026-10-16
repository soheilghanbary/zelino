import { MailIcon, MapPinIcon, PhoneIcon, SparklesIcon } from 'lucide-react'
import {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
	getProfileLinks,
	profileInitials,
	profileName,
	toExternalUrl,
} from '../lib'
import type { Profile } from '../schemas'
import { LinkButtons } from './link-buttons'
import { ShareButton } from './share-button'

type Props = {
	profile: Profile
}

export function ProfileHero({ profile }: Props) {
	const name = profileName(profile)
	const hasMeta = Boolean(profile.location || profile.email || profile.phone)
	const socialLinks = profile.socialLinks.flatMap((item) => {
		const href = toExternalUrl(item.link)
		if (!href) return []
		const lower = item.title.toLowerCase()
		const icon: 'github' | 'linkedin' | 'globe' = lower.includes('github')
			? 'github'
			: lower.includes('linkedin')
				? 'linkedin'
				: 'globe'
		return [{ href, icon, name: item.title }]
	})

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-5">
				<Avatar className="size-24 rounded-full ring-1 ring-border sm:size-28">
					{profile.image ? (
						<AvatarImage alt={name} src={profile.image} />
					) : (
						<AvatarFallback className="bg-primary/10 font-heading font-semibold text-2xl text-primary">
							{profileInitials(profile)}
						</AvatarFallback>
					)}
					{profile.openToWork && (
						<AvatarBadge aria-hidden className="bg-emerald-500" />
					)}
				</Avatar>

				<div className="flex flex-col gap-2">
					<h1 className="text-balance font-bold font-heading text-3xl tracking-tight">
						{name}
					</h1>

					{profile.title && (
						<p className="text-pretty font-medium text-base/6 text-primary">
							{profile.title}
						</p>
					)}

					{profile.tagline && (
						<p className="max-w-prose text-pretty text-muted-foreground text-sm/6">
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
				<ul className="flex flex-col gap-2 text-foreground/85 text-sm/6">
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
								className="flex w-fit max-w-full items-center gap-2 rounded-md transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
								className="flex w-fit max-w-full items-center gap-2 rounded-md transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
				<LinkButtons links={[...getProfileLinks(profile), ...socialLinks]} />
				<ShareButton name={name} />
			</div>
		</div>
	)
}
