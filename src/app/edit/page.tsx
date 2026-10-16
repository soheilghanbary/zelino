import { call } from '@orpc/server'
import {
	BriefcaseIcon,
	ImageIcon,
	Link2Icon,
	LinkIcon,
	SettingsIcon,
	UserIcon,
	ZapIcon,
} from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { ScrollFade } from '@/components/scroll-fade'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { appConfig } from '@/config'
import {
	AboutForm,
	AboutFormSkeleton,
	ExperiencesList,
	ExperiencesSkeleton,
	PortfoliosList,
	PortfoliosSkeleton,
	SkillsFormSkeleton,
	SocialForm,
	SocialSkeleton,
} from '@/features/career'
import {
	getExperiences,
	getPortfolios,
	getSkills,
	getSocial,
	getUserAbout,
	getUserName,
} from '@/features/career/api/queries'
import { DeleteModal } from '@/features/career/components/delete-modal'
import { EditUsername } from '@/features/career/components/edit-username'
import { SkillsForm } from '@/features/career/components/skills-form'

export const AboutTab = async () => {
	const data = await call(getUserAbout)
	return <AboutForm {...data} image={data.image ?? ''} />
}

export const SkillsTab = async () => {
	const data = await call(getSkills)
	return <SkillsForm {...data} />
}

export const ExperienceTab = async () => {
	const data = await call(getExperiences)
	return <ExperiencesList {...data} />
}

export const PortfolioTab = async () => {
	const data = await call(getPortfolios)
	return <PortfoliosList {...data} />
}

export const SocialTab = async () => {
	const data = await call(getSocial)
	return <SocialForm {...(data?.social ?? {})} />
}

export const UserNameSection = async () => {
	const { username } = await call(getUserName)
	const url = `${appConfig.siteDomain}/${username}`

	return (
		<>
			<div className="flex h-9 min-w-0 items-center gap-2 rounded-lg border bg-muted px-2.5 shadow-xs">
				<Link2Icon
					aria-hidden
					className="size-3.5 shrink-0 text-muted-foreground"
				/>
				<p className="flex min-w-0 items-baseline text-sm/5" title={url}>
					<span className="truncate text-muted-foreground">
						{appConfig.siteDomain}/
					</span>
					<span className="font-medium text-foreground">{username}</span>
				</p>
			</div>
			<EditUsername value={username} />
			<Button
				render={<Link href={`/${username}`} />}
				aria-label={`Open ${url}`}
				className="shrink-0"
				nativeButton={false}
				variant="outline"
				size={'icon'}
			>
				<Link2Icon />
			</Button>
		</>
	)
}

export const DeleteAccountSection = async () => {
	const { username } = await call(getUserName)
	return <DeleteModal username={username} />
}

export default function EditPage() {
	return (
		<div className="min-h-svh">
			<SiteHeader />
			<main className="mx-auto w-full max-w-xl px-4 py-10 md:px-6">
				<p className="text-muted-foreground text-sm/8">Your portfolio</p>
				<h1 className="font-heading font-semibold text-2xl tracking-tight">
					Edit profile
				</h1>
				<p className="mt-1 text-muted-foreground text-sm/6">
					What you type here is exactly what visitors see. Fill in the fields
					below and save when you're ready — no preview step.
				</p>
				<div className="mt-4 flex items-center gap-2">
					<Suspense
						fallback={
							<>
								<Skeleton className="h-9 w-48" />
								<Skeleton className="size-9 shrink-0" />
								<Skeleton className="size-9 shrink-0" />
							</>
						}
					>
						<UserNameSection />
					</Suspense>
				</div>
				<Separator className="my-4" />
				<Tabs defaultValue="about">
					<ScrollFade className="-mx-4 px-4 md:mx-0 md:px-0">
						<TabsList variant="line">
							<TabsTrigger value="about">
								<UserIcon />
								About
							</TabsTrigger>
							<TabsTrigger value="experience">
								<BriefcaseIcon />
								Experience
							</TabsTrigger>
							<TabsTrigger value="portfolio">
								<ImageIcon />
								Portfolio
							</TabsTrigger>
							<TabsTrigger value="social">
								<LinkIcon />
								Social
							</TabsTrigger>
							<TabsTrigger value="skills">
								<ZapIcon />
								Skills
							</TabsTrigger>
							<TabsTrigger value="settings">
								<SettingsIcon />
								Settings
							</TabsTrigger>
						</TabsList>
					</ScrollFade>
					<TabsContent value="about">
						<Suspense fallback={<AboutFormSkeleton />}>
							<AboutTab />
						</Suspense>
					</TabsContent>
					<TabsContent value="experience">
						<Suspense fallback={<ExperiencesSkeleton />}>
							<ExperienceTab />
						</Suspense>
					</TabsContent>
					<TabsContent value="portfolio">
						<Suspense fallback={<PortfoliosSkeleton />}>
							<PortfolioTab />
						</Suspense>
					</TabsContent>
					<TabsContent value="social">
						<Suspense fallback={<SocialSkeleton />}>
							<SocialTab />
						</Suspense>
					</TabsContent>
					<TabsContent value="skills">
						<Suspense fallback={<SkillsFormSkeleton />}>
							<SkillsTab />
						</Suspense>
					</TabsContent>
					<TabsContent value="settings">
						<h2 className="font-semibold text-foreground text-lg">
							Danger zone
						</h2>
						<p className="text-muted-foreground text-sm/6">
							Permanently delete your account, portfolio, and public page. This
							cannot be undone.
						</p>
						<Suspense fallback={<Skeleton className="mt-4 h-9 w-36" />}>
							<DeleteAccountSection />
						</Suspense>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	)
}
