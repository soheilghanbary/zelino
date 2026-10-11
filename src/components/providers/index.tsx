'use client'
import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type { PropsWithChildren } from 'react'
import { EdgeStoreProvider } from '@/lib/edgestore'
import { QueryProvider } from './query-provider'

export default function Providers({ children }: PropsWithChildren) {
	return (
		<EdgeStoreProvider>
			<NuqsAdapter>
				<QueryProvider>
					<ThemeProvider
						attribute="class"
						enableColorScheme
						defaultTheme="light"
					>
						{children}
					</ThemeProvider>
				</QueryProvider>
			</NuqsAdapter>
		</EdgeStoreProvider>
	)
}
