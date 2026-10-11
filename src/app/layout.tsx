import '@/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import type { PropsWithChildren } from 'react'
import Providers from '@/components/providers'
import { appConfig } from '@/config'

const font = Inter({
	weight: ['400', '500', '600', '700', '800', '900'],
	subsets: ['latin-ext'],
})

// Headings only — tighter apertures than Inter so hero titles and section
// labels read as display type rather than as slightly-bold body copy.
const headingFont = Plus_Jakarta_Sans({
	weight: ['500', '600', '700', '800'],
	subsets: ['latin-ext'],
	variable: '--font-display',
})

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	colorScheme: 'light',
	themeColor: 'var(--primary)',
}

export const metadata: Metadata = {
	title: {
		default: appConfig.title,
		template: `%s - ${appConfig.title}`,
	},
	description: appConfig.description,
	icons: {
		icon: '/favicon.ico',
	},
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${font.className} ${headingFont.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
