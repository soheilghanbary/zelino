import { call } from '@orpc/server'
import {
	BriefcaseIcon,
	Link2Icon,
	SettingsIcon,
	UserIcon,
	ZapIcon,
} from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
	AboutForm,
	AboutFormSkeleton,
	SkillsFormSkeleton,
} from '@/features/career'
import {
	getSkills,
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

export const UserNameSection = async () => {
	const { username } = await call(getUserName)
	return (
		<>
			<div className="w-fit rounded-lg border bg-muted/40 p-2">
				<p className="text-sm/5 tracking-wider">
					zelino.vercel.app/
					<span className="pl-0.5 text-muted-foreground">{username}</span>
				</p>
			</div>
			<EditUsername value={username} />
			<Button
				render={<Link href={`/${username}`} />}
				nativeButton={false}
				variant="outline"
				size={'icon'}
			>
				<Link2Icon />
			</Button>
		</>
	)
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
								<Skeleton className="h-9 w-47" />
								<Skeleton className="size-9" />
								<Skeleton className="size-9" />
							</>
						}
					>
						<UserNameSection />
					</Suspense>
				</div>
				<Separator className="my-4" />
				<Tabs defaultValue="about">
					<TabsList variant="line">
						<TabsTrigger value="about">
							<UserIcon />
							About
						</TabsTrigger>
						<TabsTrigger value="experience">
							<BriefcaseIcon />
							Experience
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
					<TabsContent value="about">
						<Suspense fallback={<AboutFormSkeleton />}>
							<AboutTab />
						</Suspense>
					</TabsContent>
					<TabsContent value="experience">
						<p className="py-6 text-muted-foreground text-sm/6">
							Work history lands here.
						</p>
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
						<DeleteModal />
					</TabsContent>
				</Tabs>
			</main>
		</div>
	)
}
