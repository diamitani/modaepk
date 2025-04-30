import Link from "next/link"
import { Instagram, Twitter, Facebook, Linkedin, Globe } from "lucide-react"

export function SocialLinks() {
  const socialLinks = [
    {
      name: "Website",
      url: "https://www.hallamoda.com",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/Mr.Moda",
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      name: "Twitter",
      url: "https://www.twitter.com/MrModa",
      icon: <Twitter className="h-5 w-5" />,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/HALLAMODA",
      icon: <Facebook className="h-5 w-5" />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/hassan-abdul-hakim-3358a8237/",
      icon: <Linkedin className="h-5 w-5" />,
    },
  ]

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Connect with Mr. Moda</h3>
      <div className="flex flex-wrap gap-4">
        {socialLinks.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors"
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
