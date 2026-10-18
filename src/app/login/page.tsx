import { redirect } from 'next/navigation'
import { LoginForm } from '@/features/auth'
import { getSession } from '@/lib/auth/session'

export const instant = false

export default async function LoginPage() {
	const session = await getSession()
	if (session) redirect('/edit')

	return (
		<div className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-12">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 -z-10"
			>
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,color-mix(in_oklch,var(--primary)_8%,transparent),transparent)]" />
				<div className="mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[48px_48px] opacity-[0.12]" />
			</div>
			<div className="w-full max-w-sm">
				<LoginForm />
			</div>
		</div>
	)
}
