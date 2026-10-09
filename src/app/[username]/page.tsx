import { call } from '@orpc/server'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/site-header'
import {
	getProfile,
	ProfileExperienceList,
	ProfileSidebar,
	ProfileSkills,
} from '@/features/profile'

type Props = {
	params: Promise<{ username: string }>
}

function Section({ label, children }: { label: string; children: ReactNode }) {
	return (
		<section className="flex flex-col gap-4 border-t pt-8 first:border-t-0 first:pt-0">
			<h2 className="font-heading font-medium text-muted-foreground text-xs uppercase tracking-widest">
				{label}
			</h2>
			{children}
		</section>
	)
}

export const ProfileView = async ({ params }: Props) => {
	const { username } = await params
	const profile = await call(getProfile, { username })
	if (!profile) notFound()

	const hasCareer = Boolean(
		profile.summary ||
			profile.experiences.length > 0 ||
			profile.skills.length > 0
	)

	return (
		<div className="grid gap-10 p-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
			<div className="motion-safe:animate-fade-in-up">
				<ProfileSidebar profile={profile} />
			</div>

			<div className="flex flex-col gap-8">
				{!hasCareer ? (
					<p className="text-balance rounded-lg border border-dashed p-10 text-center text-muted-foreground text-sm/6 motion-safe:animate-fade-in-up">
						This profile is still a blank canvas. Everything you add in the
						editor shows up here.
					</p>
				) : (
					<>
						{profile.summary && (
							<Section label="About">
								<p className="max-w-prose select-text whitespace-pre-wrap text-pretty text-sm/7 motion-safe:animate-delay-100 motion-safe:animate-fade-in-up">
									{profile.summary}
								</p>
							</Section>
						)}

						{profile.experiences.length > 0 && (
							<Section label="Experience">
								<div className="motion-safe:animate-delay-200 motion-safe:animate-fade-in-up">
									<ProfileExperienceList experiences={profile.experiences} />
								</div>
							</Section>
						)}

						{profile.skills.length > 0 && (
							<Section label="Skills">
								<div className="motion-safe:animate-delay-300 motion-safe:animate-fade-in-up">
									<ProfileSkills skills={profile.skills} />
								</div>
							</Section>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default async function UserPage(props: Props) {
	return (
		<div className="min-h-svh">
			<SiteHeader />
			<main className="mx-auto w-full max-w-5xl px-4">
				<ProfileView {...props} />
			</main>
		</div>
	)
}
