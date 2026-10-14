'use client'

import { useSyncExternalStore } from 'react'

export function useIsMobile(query = '(max-width: 767px)') {
	return useSyncExternalStore(
		(onStoreChange) => {
			const mql = window.matchMedia(query)
			mql.addEventListener('change', onStoreChange)
			return () => mql.removeEventListener('change', onStoreChange)
		},
		() => window.matchMedia(query).matches,
		() => false
	)
}
