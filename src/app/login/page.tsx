'use client'
import { GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'
import { LoginForm } from '@/features/auth'

export default function LoginPage() {
	return (
		<div className="grid min-h-svh overflow-x-clip lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link href={'/'} className="flex items-center gap-2 font-medium">
						<div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<GalleryVerticalEndIcon className="size-4" />
						</div>
						Zelino
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<LoginForm />
					</div>
				</div>
			</div>
			<div className="relative hidden overflow-hidden bg-muted lg:block">
				<div
					aria-hidden="true"
					className="mask-[radial-gradient(ellipse_75%_75%_at_50%_50%,#000_35%,transparent_100%)] absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[32px_32px] opacity-70"
				/>
				<div
					aria-hidden="true"
					className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_65%)]"
				/>
				<div className="mask-[radial-gradient(circle_at_50%_50%,#000,transparent_70%)] absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[8px_8px] opacity-40 dark:opacity-25" />

				<div className="relative flex h-full flex-col justify-between p-10">
					<div className="flex items-center gap-3">
						<div className="flex size-9 items-center justify-center rounded-lg border bg-background shadow-xs">
							<GalleryVerticalEndIcon className="size-4 text-muted-foreground" />
						</div>
						<div>
							<p className="font-medium text-sm">Your career, structured</p>
							<p className="text-muted-foreground text-xs">
								One profile. Every role.
							</p>
						</div>
					</div>

					<blockquote className="max-w-sm">
						<p className="font-heading text-2xl leading-snug tracking-tight">
							Build a profile that reads like you, not like a template.
						</p>
						<footer className="mt-4 text-muted-foreground text-sm">
							Skills, roles, and links in one place.
						</footer>
					</blockquote>

					<div className="flex flex-wrap gap-2">
						{['Skills', 'Experience', 'Open source', 'Contact'].map((label) => (
							<span
								key={label}
								className="rounded-full border bg-background/60 px-3 py-1 font-medium text-xs backdrop-blur-sm"
							>
								{label}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
