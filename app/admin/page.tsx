import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" asChild className="mr-4">
            <Link href="/">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
        </div>

        <p className="text-lg text-gray-600 mb-12 max-w-3xl">
          Manage your website content, portfolio, and chatbot settings.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Management</CardTitle>
              <CardDescription>
                Manage your artwork portfolio, extract images from PDF, and organize your collection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Upload PDFs to extract artwork information, edit artwork details, and organize your portfolio by
                categories and series.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/admin/portfolio">Manage Portfolio</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chatbot Settings</CardTitle>
              <CardDescription>
                Configure your DeepSeek-powered chatbot to answer questions about your artwork.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Customize the chatbot's knowledge base, appearance, and behavior to provide the best experience for your
                visitors.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/admin/chatbot">Manage Chatbot</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Website Content</CardTitle>
              <CardDescription>
                Update your website content, including about section, exhibitions, and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Edit your website content to keep it up-to-date with your latest exhibitions, achievements, and contact
                details.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/admin/content">Manage Content</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
