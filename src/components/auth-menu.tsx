import { call } from '@orpc/server'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
import { AuthDropdown } from '@/components/auth-dropdown'
import { Button } from '@/components/ui/button'
import { getUserName } from '@/features/career/api/queries'
import { getSession } from '@/lib/auth/session'

export async function AuthMenu() {
	const session = await getSession()
	let username: string | undefined

	if (!session?.user) {
		return (
			<Button
				nativeButton={false}
				render={<Link href="/login" />}
				className="mr-1 rounded-full"
			>
				<LogIn />
				Sign in
			</Button>
		)
	}

	try {
		const data = await call(getUserName)
		username = data?.username
	} catch {
		username = undefined
	}

	return (
		<AuthDropdown
			user={{
				image: session.user.image,
				name: session.user.name,
			}}
			username={username}
		/>
	)
}
