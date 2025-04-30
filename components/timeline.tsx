import { CalendarDays } from "lucide-react"

export function Timeline() {
  const events = [
    {
      year: "2024",
      events: [
        "Solo Exhibition Brooklyn ade NYC",
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
      <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
      <div className="space-y-12">
        {events.map((yearEvents, index) => (
          <div key={index} className="relative">
            <div className="flex items-center mb-4">
              <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary rounded-full transform -translate-x-1/2 flex items-center justify-center">
                <CalendarDays className="h-4 w-4 text-white" />
              </div>
              <div className="ml-16 md:ml-0 md:absolute md:left-1/2 md:ml-8">
                <h3 className="text-xl font-bold">{yearEvents.year}</h3>
              </div>
            </div>
            <div className="ml-16 md:ml-0 md:grid md:grid-cols-2 md:gap-8">
              <div className="md:text-right md:pr-8 md:col-start-1 md:col-end-2"></div>
              <div className="space-y-2 md:pl-8">
                {yearEvents.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="bg-white p-4 rounded-lg shadow border-l-4 border-primary">
                    <p>{event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
