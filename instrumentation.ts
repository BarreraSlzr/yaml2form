import { headers } from 'next/headers'
import { initObservability, trackError, trackPerformance } from './lib/observability'
import { setupDatabase } from './lib/db'
import { NextMiddleware, NextResponse } from 'next/server'
import { Instrumentation } from 'next'

export async function register() {
  // Set up the database tables
  await setupDatabase()
  
  // Initialize observability
  await initObservability()
}

export const onRequestError: Instrumentation.onRequestError = async function (err, request, context) {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || undefined
  const referer = headersList.get('referer') || undefined

  await trackError({
    error: err as Error,
    request: {
      url: request.path,
      method: request.method,
      userAgent,
      referer,
    },
    context: {
      route: context.routePath,
      serverContext: context.renderSource,
      router: context.routeType,
    },
  })
}

export const middleware: NextMiddleware = async function (request, event){
    const start = performance.now();
    const response = NextResponse.next();
    const duration = performance.now() - start
    const { pathname } = new URL(request.url)
    event.waitUntil(
        trackPerformance({
        route: pathname,
        duration,
        status: response.status,
        }) 
    )
    return response;
}
