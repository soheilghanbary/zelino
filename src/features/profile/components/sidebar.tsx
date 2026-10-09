import { type LucideIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Profile } from '../schemas'
import { LinkButtons } from './link-buttons'

type Props = {
	profile: Profile
}

function ContactRow({
	href,
	icon: Icon,
	children,
}: {
	href: string
	icon: LucideIcon
	children: ReactNode
}) {
	return (
		<a
			href={href}
			className="flex w-fit items-center gap-1.5 text-muted-foreground text-sm/6 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
		>
			<Icon className="size-3.5 shrink-0" />
			<span className="wrap-anywhere">{children}</span>
		</a>
	)
}

export function ProfileSidebar({ profile }: Props) {
	return (
		<aside className="flex flex-col gap-6 lg:sticky lg:top-8 lg:self-start">
			<div className="flex flex-col gap-5">
				<Avatar className="size-24 ring-1 ring-border ring-offset-2 ring-offset-background">
					{profile.image ? (
						<AvatarImage src={profile.image} alt={profile.fullName} />
					) : (
						<AvatarFallback className="text-lg">
							{(profile.fullName || profile.username).slice(0, 2).toUpperCase()}
						</AvatarFallback>
					)}
				</Avatar>

				<div className="flex select-text flex-col gap-1.5">
					<h1 className="font-heading font-semibold text-2xl tracking-tight">
						{profile.fullName || profile.username}
					</h1>
					{profile.title && (
						<p className="text-pretty text-muted-foreground text-sm/6">
							{profile.title}
						</p>
					)}
					{profile.tagline && (
						<p className="text-pretty text-sm/6">{profile.tagline}</p>
					)}
					{profile.location && (
						<p className="flex items-center gap-1.5 text-muted-foreground text-sm/6">
							<MapPinIcon className="size-3.5" />
							{profile.location}
						</p>
					)}
					{profile.email && (
						<ContactRow href={`mailto:${profile.email}`} icon={MailIcon}>
							{profile.email}
						</ContactRow>
					)}
					{profile.phone && (
						<ContactRow
							href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}
							icon={PhoneIcon}
						>
							{profile.phone}
						</ContactRow>
					)}
				</div>
			</div>

			<LinkButtons
				githubUrl={profile.githubUrl}
				linkedinUrl={profile.linkedinUrl}
				portfolio={profile.portfolio}
			/>
		</aside>
	)
}
