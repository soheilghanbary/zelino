import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Zelino',
		short_name: 'Zelino',
		description: 'Define Your Career',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#18181B',
		orientation: 'portrait',
		icons: [
			{
				src: '/favicon.svg',
				sizes: 'any',
				type: 'image/svg+xml',
				purpose: 'any',
			},
			{
				src: '/icon-192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/icon-512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	}
}
