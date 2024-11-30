import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory store for rate limiting
const rateLimit = new Map<string, { count: number; timestamp: number }>()

// Rate limit configuration
const RATE_LIMIT = 50 // requests
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in milliseconds

export function middleware(request: NextRequest) {
  // Only apply rate limiting to API routes
  if (!request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const ip = request.ip ?? 'anonymous'
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW

  // Clean up old entries
  const entries = Array.from(rateLimit.entries())
  entries.forEach(([key, value]) => {
    if (value.timestamp < windowStart) {
      rateLimit.delete(key)
    }
  })

  // Get existing rate limit data
  const rateLimitInfo = rateLimit.get(ip)

  if (!rateLimitInfo) {
    // First request in the window
    rateLimit.set(ip, { count: 1, timestamp: now })
    return NextResponse.next()
  }

  if (rateLimitInfo.timestamp < windowStart) {
    // New window
    rateLimit.set(ip, { count: 1, timestamp: now })
    return NextResponse.next()
  }

  if (rateLimitInfo.count >= RATE_LIMIT) {
    // Rate limit exceeded
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests',
        retryAfter: Math.ceil((rateLimitInfo.timestamp + RATE_LIMIT_WINDOW - now) / 1000)
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil((rateLimitInfo.timestamp + RATE_LIMIT_WINDOW - now) / 1000).toString()
        }
      }
    )
  }

  // Increment counter
  rateLimitInfo.count++
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*'
}
