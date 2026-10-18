'use client'

import { Edit3, Link2, LogOutIcon } from 'lucide-react'
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
import { signOut } from '@/lib/auth/client'

type Props = {
	user: {
		image?: string | null
		name?: string | null
	}
	username?: string
}

export function AuthDropdown({ user, username }: Props) {
	const router = useRouter()
	const handleSignOut = async () => {
		await signOut()
		router.refresh()
		router.push('/login')
	}

	const fallback =
		user.name?.trim().charAt(0).toUpperCase() ??
		user.image?.charAt(0).toUpperCase() ??
		'U'

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="ghost" size="icon" className="rounded-full">
						<Avatar>
							<AvatarImage
								src={user.image ?? undefined}
								alt={user.name ?? ''}
							/>
							<AvatarFallback>{fallback}</AvatarFallback>
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
