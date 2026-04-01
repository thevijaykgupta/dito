import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip middleware for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Check if maintenance mode is enabled
  const maintenanceMode = request.cookies.get('maintenanceMode')?.value === 'true';

  if (maintenanceMode) {
    // Return maintenance page
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Site Maintenance - T-Midnyt</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
              color: white;
            }
            .maintenance-container {
              text-align: center;
              padding: 2rem;
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              border-radius: 1rem;
              max-width: 600px;
            }
            h1 {
              font-size: 2.5rem;
              margin-bottom: 1rem;
            }
            p {
              font-size: 1.2rem;
              opacity: 0.9;
            }
          </style>
        </head>
        <body>
          <div class="maintenance-container">
            <h1>🛠️ Site Maintenance</h1>
            <p>We're currently performing some maintenance on our website. We'll be back shortly!</p>
          </div>
        </body>
      </html>
      `,
      {
        headers: {
          'content-type': 'text/html',
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}; 
