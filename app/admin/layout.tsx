import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin - Mr. Moda",
  description: "Admin area for Mr. Moda's press kit",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-xl font-bold">Mr. Moda Admin</h1>
        </div>
      </div>
      {children}
    </div>
  )
}
