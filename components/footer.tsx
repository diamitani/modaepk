import Link from "next/link"
import { Instagram, Twitter, Facebook, Linkedin, ExternalLink } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mr. Moda</h3>
            <p className="text-gray-400 mb-4">Naïf Artist / Creative Director</p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/Mr.Moda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.twitter.com/MrModa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://www.facebook.com/HALLAMODA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/hassan-abdul-hakim-3358a8237/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">36 NE 1st Street Suite 365</p>
            <p className="text-gray-400 mb-2">Miami, FL 33132</p>
            <p className="text-gray-400 mb-2">thefashion@hallamoda.com</p>
            <p className="text-gray-400 mb-2">786.843.1305</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="text-gray-400 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#press" className="text-gray-400 hover:text-white transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#exhibitions" className="text-gray-400 hover:text-white transition-colors">
                  Exhibitions
                </Link>
              </li>
              <li>
                <Link href="#collaborations" className="text-gray-400 hover:text-white transition-colors">
                  Collaborations
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="https://hallamoda.softr.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  Complete Portfolio
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://new.express.adobe.com/page/mM6Q6a5MMc3JX/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  Fashion Lookbook
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://drive.google.com/drive/folders/1--zFO__5aD7NICQq37cs3BvfDhGQAZi7?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  Workshop Videos
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.hallamoda.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Official Website
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Mr. Moda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
