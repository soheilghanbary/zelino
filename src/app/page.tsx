import Link from 'next/link'
import { Suspense } from 'react'
import { MessageCSR } from '@/components/message-csr'
import { MessageSSR } from '@/components/message-ssr'
import { OAuthButton } from '@/components/oauth-button'
import { SiteHeader } from '@/components/site-header'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { appConfig } from '@/config'
import { cn } from '@/lib/utils'

const GITHUB_REPO_URL = 'https://github.com/soheilghanbary/stack'
const COPYRIGHT_TEXT = `© ${new Date().getFullYear()} ${appConfig.name} ${appConfig.version} - Soheil Ghanbary`

export default async () => {
	return (
		<div className="flex min-h-svh flex-col">
			<SiteHeader />
			<section className="flex flex-1 items-center justify-center px-4">
				<div className="w-full max-w-sm">
					<div className="fade-in flex animate-blurred-fade-in animate-duration-400 flex-col gap-y-3 p-4">
						<h1 className="font-black text-4xl">
							<span>{appConfig.name}</span>
						</h1>
						<p className="font-normal text-base">{appConfig.description}</p>
						<div className="grid grid-cols-2 gap-x-2">
							<Link
								href={GITHUB_REPO_URL}
								className={cn(buttonVariants(), 'w-full')}
							>
								Get Started
							</Link>
							<OAuthButton />
						</div>
						<p className="text-muted-foreground text-xs">{COPYRIGHT_TEXT}</p>
						<p className="text-muted-foreground text-xs">
							Mode:{' '}
							<span className="font-medium text-primary underline decoration-wavy underline-offset-3">
								{process.env.NODE_ENV}
							</span>
						</p>
						<Separator />
						<Suspense fallback={<p>Loading Client Data...</p>}>
							<MessageCSR />
						</Suspense>
						<Suspense fallback={<p>Loading Server Data...</p>}>
							<MessageSSR />
						</Suspense>
					</div>
				</div>
			</section>
		</div>
	)
}
