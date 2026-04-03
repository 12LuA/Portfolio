import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import PlausibleProvider from "next-plausible"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <PlausibleProvider
          domain="12lua.github.io"
          selfHosted={true}
          customDomain="https://analytics.12lua.de"
          trackOutboundLinks={true}
          trackFileDownloads={true}
          taggedEvents={true}
          revenue={true}
          enabled={true}
        >
          <ThemeProvider>
            {children}
            <div className="background-gradient" />
          </ThemeProvider>
        </PlausibleProvider>
      </body>
    </html>
  )
}
