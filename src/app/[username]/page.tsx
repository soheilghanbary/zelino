import { call } from '@orpc/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { SiteHeader } from '@/components/site-header'
import {
	getProfile,
	getProfileSections,
	ProfileEmptyState,
	ProfileFooter,
	ProfileHero,
	ProfileSection,
	ProfileSectionNav,
	ProfileSkills,
	ProfileTimeline,
	profileDescription,
	profileName,
} from '@/features/profile'

type Props = {
	params: Promise<{ username: string }>
}

/**
 * `generateMetadata` and the page both need the same row; `cache` collapses
 * them into a single query per request.
 */
const loadProfile = cache(async (username: string) =>
	call(getProfile, { username })
)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { username } = await params
	const profile = await loadProfile(username)

	if (!profile) return { title: 'Profile not found' }

	const title = profileName(profile)
	const description = profileDescription(profile)

	return {
		title,
		description,
		alternates: { canonical: `/${username}` },
		openGraph: {
			title,
			description,
			type: 'profile',
			...(profile.image ? { images: [{ url: profile.image }] } : {}),
		},
		twitter: {
			card: profile.image ? 'summary_large_image' : 'summary',
			title,
			description,
			...(profile.image ? { images: [profile.image] } : {}),
		},
	}
}

export default async function UserPage({ params }: Props) {
	const { username } = await params
	const profile = await loadProfile(username)
	if (!profile) notFound()

	const name = profileName(profile)
	const sections = getProfileSections(profile)

	return (
		<div className="relative isolate min-h-svh bg-background">
			<SiteHeader />

			<main className="mx-auto w-full max-w-5xl px-4 pb-24 md:px-6 md:pt-6">
				<div className="grid gap-12 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-16">
					<aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
						<div className="motion-safe:animate-fade-in-up">
							<ProfileHero profile={profile} />
						</div>
						<div className="motion-safe:animate-delay-100 motion-safe:animate-fade-in-up">
							<ProfileSectionNav sections={sections} />
						</div>
					</aside>

					<div className="flex flex-col gap-10">
						{sections.length === 0 ? (
							<div className="motion-safe:animate-fade-in-up">
								<ProfileEmptyState />
							</div>
						) : (
							<>
								{profile.summary && (
									<ProfileSection delay={100} id="about" title="About">
										<p className="max-w-prose select-text whitespace-pre-wrap text-pretty text-base/8 text-muted-foreground">
											{profile.summary}
										</p>
									</ProfileSection>
								)}

								{profile.experiences.length > 0 && (
									<ProfileSection
										count={profile.experiences.length}
										delay={150}
										id="experience"
										title="Experience"
									>
										<ProfileTimeline experiences={profile.experiences} />
									</ProfileSection>
								)}

								{profile.skills.length > 0 && (
									<ProfileSection
										count={profile.skills.length}
										delay={200}
										id="skills"
										title="Skills"
									>
										<ProfileSkills skills={profile.skills} />
									</ProfileSection>
								)}
							</>
						)}

						<ProfileFooter name={name} />
					</div>
				</div>
			</main>
		</div>
	)
}
