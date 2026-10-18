import '@/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import type { PropsWithChildren } from 'react'
import Providers from '@/components/providers'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Toaster } from '@/components/ui/toast'
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
	maximumScale: 1,
	userScalable: false,
	colorScheme: 'light',
	themeColor: '#18181B',
}

export const metadata: Metadata = {
	title: {
		default: appConfig.title,
		template: `%s - ${appConfig.title}`,
	},
	description: appConfig.description,
	icons: {
		icon: '/favicon.ico',
		apple: '/apple-touch-icon',
	},
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${font.className} ${headingFont.variable} antialiased`}>
				<Providers>
					<SiteHeader />
					{children}
					<SiteFooter />
				</Providers>
				<Toaster />
			</body>
		</html>
	)
}
