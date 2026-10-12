import { FEATURES, VALUE_PROPS } from '../data'

function ValueProps() {
	return (
		<ul className="grid gap-6 sm:grid-cols-3">
			{VALUE_PROPS.map(({ description, icon: Icon, title }) => (
				<li className="flex flex-col gap-2" key={title}>
					<Icon aria-hidden className="size-5 text-primary" />
					<h3 className="font-heading font-semibold text-sm">{title}</h3>
					<p className="text-pretty text-muted-foreground text-sm/6">
						{description}
					</p>
				</li>
			))}
		</ul>
	)
}

function Features() {
	return (
		<ul className="grid gap-4 sm:grid-cols-2">
			{FEATURES.map(({ description, icon: Icon, title }) => (
				<li
					className="flex flex-col gap-3 rounded-xl border bg-card/60 p-5 transition-colors hover:border-primary/30 hover:bg-card"
					key={title}
				>
					<span className="flex size-9 w-fit items-center justify-center rounded-lg bg-primary/10 text-primary">
						<Icon aria-hidden className="size-4" />
					</span>
					<h3 className="font-heading font-semibold text-base tracking-tight">
						{title}
					</h3>
					<p className="text-pretty text-muted-foreground text-sm/6">
						{description}
					</p>
				</li>
			))}
		</ul>
	)
}

export function LandingFeatures() {
	return (
		<section className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-4 md:px-6">
			<ValueProps />

			<div className="flex flex-col gap-6">
				<div className="flex items-center gap-4">
					<h2 className="font-heading font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
						What you get
					</h2>
					<div aria-hidden className="h-px flex-1 bg-border" />
				</div>
				<Features />
			</div>
		</section>
	)
}
