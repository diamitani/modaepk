import { CalendarDays } from "lucide-react"

export function Timeline() {
  const events = [
    {
      year: "2024",
      events: [
        "Solo Exhibition Brooklyn Made NYC",
        "CEYCAMODA Gallery Exhibition Alongside Cey Adams and Craig Anthony Miller",
      ],
    },
    {
      year: "2023",
      events: ["Congressional Recognition; City Council Citation; Queens Certificate Of Excellence"],
    },
    {
      year: "2022",
      events: [
        "Art Basel Live Solo Exhibition With Modern Monarchie; Joia Beach, Miami",
        "Group Exhibition Art Basel Miami Blonde House Group",
        "Secured New Design Contract With Faith Connexion",
        "NFT NYC Mural Installations X Sleepy Sloth Society",
        "Latin American Fashion Summit X Faith Connexion NFT Token Launch, Miami",
        "Skep 360 X Mr. Moda, Miami Design District",
      ],
    },
    {
      year: "2021",
      events: [
        "Art Basel Miami Curated Faena Hotel Live Art Performance; Faith Connexion",
        "Physical NFT Sale Floor Price 1eth, $3600 at the time Legititech Faith Connexion, Miami",
        "Lead Bespoke Clothing Workshop at the Istituto Marangoni, Miami",
        "Opened Younity Studios In Diamond District, Miami",
        "$50K Private Art Sale 'WILL' 72 x 48\" mixed media on canvas",
        "Group Exhibition With Artist 'Miskeen' at Lavista Gallery, Atlanta, GA",
      ],
    },
    {
      year: "2020",
      events: [
        "Assisted Chris Habana in bespoke performance pieces (Doja Cat & Lil Nas X); American Music Awards / Amazon Music",
      ],
    },
    {
      year: "2019",
      events: [
        "Sustainable Mural Installation Faith Connexion X Swizz Beatz Istituto Marangoni, Miami",
        "Live Painted LV Handbag And Auction Children's Hospital Parrot Jungle, Miami",
        "Bespoke Garments And Styling For Live Performance Artist JID Jimmy Kimmel, NYC",
        "XXL Cover With Dreamville Music Group Featuring Bespoke Garment For JID",
      ],
    },
    {
      year: "2018",
      events: [
        "In-House Artist/Designer Faith Connexion Paris Flagship Store SoHo NYC",
        "Art Basel Mural Installation Swarm Event Space, Miami (Kanye West, Flying Lotus Etc)",
        "Walked In Patricia Field Fashion Show For Scooter La Forge Wynwood, Miami",
      ],
    },
    {
      year: "2016",
      events: [
        "Art Basel Miami 1st Major Art Sale ($15k) 'FEVVER' 48 x 36 mixed media on Canvas",
        "Mastered Streetwear Class Of 2016",
      ],
    },
  ]

  return (
    <div className="relative">
      {/* Center line - only visible on md screens and up */}
      <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

      <div className="space-y-16">
        {events.map((yearEvents, index) => (
          <div key={index} className="relative">
            {/* Year marker in center - only visible on md screens and up */}
            <div className="hidden md:flex absolute left-1/2 w-12 h-12 bg-primary rounded-full transform -translate-x-1/2 flex items-center justify-center z-10">
              <CalendarDays className="h-5 w-5 text-white" />
            </div>

            {/* Mobile year marker - only visible on small screens */}
            <div className="md:hidden flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <CalendarDays className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold ml-4">{yearEvents.year}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left side content (even indexes) */}
              <div className={`${index % 2 === 0 ? "md:block" : "md:hidden"}`}>
                <div className="flex flex-col items-end">
                  <h3 className="hidden md:block text-xl font-bold mb-4 text-right">{yearEvents.year}</h3>
                  <div className="space-y-3 w-full">
                    {yearEvents.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className="bg-white p-4 rounded-lg shadow border-r-4 border-primary text-right"
                      >
                        <p>{event}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side content (odd indexes) */}
              <div className={`${index % 2 === 1 ? "md:block" : "md:hidden"} md:col-start-2 md:col-end-3`}>
                <div className="flex flex-col items-start">
                  <h3 className="hidden md:block text-xl font-bold mb-4">{yearEvents.year}</h3>
                  <div className="space-y-3 w-full">
                    {yearEvents.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="bg-white p-4 rounded-lg shadow border-l-4 border-primary">
                        <p>{event}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile view - always show content regardless of index */}
              <div className="md:hidden col-span-1">
                <div className="flex flex-col items-start">
                  <div className="space-y-3 w-full">
                    {yearEvents.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="bg-white p-4 rounded-lg shadow border-l-4 border-primary">
                        <p>{event}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
