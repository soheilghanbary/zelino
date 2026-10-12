'use client'

import { skipToken, useQuery } from '@tanstack/react-query'
import { Edit3, Link2, LogIn, LogOutIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'
import { signOut, useSession } from '@/lib/auth/client'
import { client } from '@/lib/orpc/client'

export function AuthMenu() {
	const router = useRouter()
	const { data: session, isPending } = useSession()
	const { data: userName } = useQuery(
		client.career.getUserName.queryOptions({
			input: session?.user ? undefined : skipToken,
		})
	)
	const username = userName?.username

	if (isPending) {
		return (
			<Button size="icon" variant="ghost" disabled aria-label="Loading session">
				<Spinner />
			</Button>
		)
	}

	if (!session?.user) {
		return (
			<Button
				nativeButton={false}
				render={<Link href="/login" />}
				className={'mr-1 rounded-full'}
			>
				<LogIn />
				Sign in
			</Button>
		)
	}

	const handleSignOut = async () => {
		await signOut()
		router.push('/login')
		router.refresh()
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="ghost" size="icon" className="rounded-full">
						<Avatar>
							<AvatarImage src={session.user.image!} alt="shadcn" />
							<AvatarFallback>LR</AvatarFallback>
						</Avatar>
					</Button>
				}
			/>
			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<DropdownMenuItem
						nativeButton={false}
						disabled={!username}
						render={<Link href={username ? `/${username}` : '/edit'} />}
					>
						<Link2 />
						Preview
					</DropdownMenuItem>
					<DropdownMenuItem
						nativeButton={false}
						render={<Link href={'/edit'} />}
					>
						<Edit3 />
						Edit profile
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleSignOut}>
					<LogOutIcon />
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
