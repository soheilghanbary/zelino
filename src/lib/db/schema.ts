import {
	boolean,
	index,
	jsonb,
	pgTable,
	text,
	timestamp,
} from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	emailVerified: boolean('email_verified').default(false).notNull(),
	image: text('image'),
	email: text('email'),

	fullName: text('full_name').notNull().default(''),
	title: text('job_title').notNull().default(''),
	tagline: text('tagline').notNull().default(''),
	summary: text('summary').notNull().default(''),
	skills: jsonb('skills').$type<any[]>().default([]).notNull(),
	experiences: jsonb('work_experiences').$type<any[]>().default([]).notNull(),
	location: text('location').notNull().default(''),
	githubUrl: text('github_url').notNull().default(''),
	linkedinUrl: text('linkedin_url').notNull().default(''),
	portfolio: text('portfolio_url').notNull().default(''),
	username: text('username')
		.notNull()
		.$defaultFn(() => nanoid(8)),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
})

export const session = pgTable(
	'session',
	{
		id: text('id').primaryKey(),
		expiresAt: timestamp('expires_at').notNull(),
		token: text('token').notNull().unique(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
	},
	(table) => [index('session_userId_idx').on(table.userId)]
)

export const account = pgTable(
	'account',
	{
		id: text('id').primaryKey(),
		accountId: text('account_id').notNull(),
		providerId: text('provider_id').notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		accessToken: text('access_token'),
		refreshToken: text('refresh_token'),
		idToken: text('id_token'),
		accessTokenExpiresAt: timestamp('access_token_expires_at'),
		refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
		scope: text('scope'),
		password: text('password'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index('account_userId_idx').on(table.userId)]
)

export const verification = pgTable(
	'verification',
	{
		id: text('id').primaryKey(),
		identifier: text('identifier').notNull(),
		value: text('value').notNull(),
		expiresAt: timestamp('expires_at').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index('verification_identifier_idx').on(table.identifier)]
)
