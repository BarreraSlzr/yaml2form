import { v4 as uuidv4 } from 'uuid'
import { db } from './db'

let isInitialized = false

export async function initObservability() {
  if (isInitialized) return

  console.log('Initializing observability service...')
  isInitialized = true
}

export async function trackError(errorData: {
  error: Error,
  request: {
    url: string
    method: string
    userAgent?: string
    referer?: string
  }
  context: {
    route?: string
    serverContext?: string
    router?: string
  }
}) {
  if (!isInitialized) {
    console.error('Observability service not initialized')
    return
  }

  const errorId = uuidv4()

  try {
    await db.insertInto('errors').values({
      error_id: errorId,
      message: errorData.error?.message || 'No error message',
      stack: errorData.error?.stack || '',
      request_url: errorData.request.url,
      request_method: errorData.request.method,
      request_user_agent: errorData.request.userAgent || null,
      request_referer: errorData.request.referer || null,
      context_route: errorData.context.route || null,
      context_server_context: errorData.context.serverContext || null,
      context_router: errorData.context.router || null,
    }).execute()

    console.log(`Error tracked and inserted into database with ID: ${errorId}`)
  } catch (insertError) {
    console.error('Failed to insert error into database:', insertError)
  }
}

export async function trackPerformance(performanceData: {
  route: string
  duration: number
  status: number
}) {
  if (!isInitialized) {
    console.error('Observability service not initialized')
    return
  }

  try {
    await db.insertInto('performance').values({
      route: performanceData.route,
      duration: performanceData.duration,
      status: performanceData.status,
    }).execute()

    console.log('Performance data tracked and inserted into database')
  } catch (insertError) {
    console.error('Failed to insert performance data into database:', insertError)
  }
}
