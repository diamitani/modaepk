import Link from "next/link"
import { ChevronLeft, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import { SocialLinks } from "@/components/social-links"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold">Contact</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-gray-600 mb-8">
              For inquiries about commissions, exhibitions, collaborations, or press opportunities, please get in touch
              using the form or contact information below.
            </p>

            <div className="space-y-6 mb-8">
              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-700">thefashion@hallamoda.com</p>
                    <p className="text-gray-700">press@hallamoda.com (Press Inquiries)</p>
                    <p className="text-gray-700">collaborations@hallamoda.com (Collaborations)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-gray-700">786.843.1305</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Address</h3>
                    <p className="text-gray-700">36 NE 1st Street Suite 365</p>
                    <p className="text-gray-700">Miami, FL 33132</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <SocialLinks />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  )
}
