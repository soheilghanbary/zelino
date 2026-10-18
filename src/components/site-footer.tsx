import { GithubIcon } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { appConfig } from '@/config'

export function SiteFooter() {
	return (
		<footer className="border-t">
			<div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-4 py-2 sm:flex-row">
				<p className="max-w-md text-balance text-center text-muted-foreground text-xs sm:text-left">
					One link for your whole career.
				</p>
				<Button
					nativeButton={false}
					render={
						<a
							href={appConfig.repoUrl}
							target="_blank"
							rel="noreferrer noopener"
						/>
					}
					variant="ghost"
					size="sm"
				>
					<GithubIcon />
					Star on GitHub
				</Button>
			</div>
		</footer>
	)
}
