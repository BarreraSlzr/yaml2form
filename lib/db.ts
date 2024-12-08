import { Generated, sql } from 'kysely'
import { createKysely } from '@vercel/postgres-kysely'

export const db = createKysely<Database>()
export { sql } from 'kysely'


interface Database {
    yaml_forms: YamlTable
    errors: ErrorTable
    performance: PerformanceTable
}

interface YamlTable {
    id: Generated<number>
    yaml_data: string
    created_at: Generated<Date>
}

interface ErrorTable {
    id: Generated<number>
    error_id: string
    message: string
    stack: string
    request_url: string
    request_method: string
    request_user_agent: string | null
    request_referer: string | null
    context_route: string | null
    context_server_context: string | null
    context_router: string | null
    created_at: Generated<Date>
}

interface PerformanceTable {
    id: Generated<number>
    route: string
    duration: number
    status: number
    created_at: Generated<Date>
}

export async function setupDatabase() {
    try {
        // Create yaml_forms table
        await db.schema
            .createTable('yaml_forms')
            .ifNotExists()
            .addColumn('id', 'serial', (col) => col.primaryKey())
            .addColumn('yaml_data', 'text', (col) => col.notNull())
            .addColumn('created_at', 'timestamp', (col) =>
                col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
            )
            .execute()

        // Create errors table
        await db.schema
            .createTable('errors')
            .ifNotExists()
            .addColumn('id', 'serial', (col) => col.primaryKey())
            .addColumn('error_id', 'uuid', (col) => col.notNull())
            .addColumn('message', 'text', (col) => col.notNull())
            .addColumn('stack', 'text', (col) => col.notNull())
            .addColumn('request_url', 'text', (col) => col.notNull())
            .addColumn('request_method', 'text', (col) => col.notNull())
            .addColumn('request_user_agent', 'text')
            .addColumn('request_referer', 'text')
            .addColumn('context_route', 'text')
            .addColumn('context_server_context', 'text')
            .addColumn('context_router', 'text')
            .addColumn('created_at', 'timestamp', (col) =>
                col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
            )
            .execute()

        // Create performance table
        await db.schema
            .createTable('performance')
            .ifNotExists()
            .addColumn('id', 'serial', (col) => col.primaryKey())
            .addColumn('route', 'text', (col) => col.notNull())
            .addColumn('duration', 'float4', (col) => col.notNull())
            .addColumn('status', 'integer', (col) => col.notNull())
            .addColumn('created_at', 'timestamp', (col) =>
                col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
            )
            .execute()

        console.log('Database tables created successfully')
    } catch (error) {
        console.error('Error setting up database:', error)
    }
}

