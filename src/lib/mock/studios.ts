import { unsplash } from "@/lib/images";
import type { Studio } from "@/types/studio";

/**
 * Temporary stand-in for the backend's studio catalogue.
 *
 * This is the only place mock studio data lives — components never hardcode
 * listings. When `NEXT_PUBLIC_API_URL` is configured and the API responds,
 * this file is bypassed entirely (see `src/lib/api/studios.ts`).
 *
 * The first six entries feed the homepage's featured grid; the full list also
 * backs the Explore Studios page (`/studios`) and every details page
 * (`/studios/[id]`, resolved by slug or id) until real APIs ship.
 */
export const MOCK_STUDIOS: readonly Studio[] = [
  {
    id: "studio_001",
    slug: "noir-photo-studio",
    title: "Noir Photo Studio",
    category: "photography",
    location: "Brooklyn, New York",
    hourlyRate: 85,
    rating: 4.9,
    reviewCount: 126,
    capacity: 8,
    description:
      "Blackout portrait room. Ceiling grid takes four strobes and a 12-foot seamless.",
    overview: [
      "Noir is a single-room portrait studio built for photographers who want the frame under total control. Blacked-out walls, a ceiling grid rated for four strobes, and a 12-foot seamless roll in white, black, and grey — switched between models without breaking your light.",
      "The room sits on a quiet Brooklyn block with street-level load-in, a grip corner that stays organized, and a small lounge behind double doors when you need the set quiet. Best for portraits, lookbooks, and product work that lives or dies on the light.",
    ],
    deposit: 150,
    amenities: [
      "gigabit-wifi",
      "cyclorama",
      "blackout",
      "makeup-stations",
      "kitchenette",
      "parking",
    ],
    host: {
      id: "host_001",
      name: "Rae Whitfield",
      tagline: "Portrait photographer & studio operator",
      responseNote: "Usually responds within an hour",
      joinedYear: 2021,
    },
    gallery: [
      {
        src: unsplash("photo-1516035069371-29a1b244cc32", 1600),
        alt: "Camera body and prime lenses arranged on a dark studio surface",
      },
      {
        src: unsplash("photo-1452587925148-ce544e77e70d", 1600),
        alt: "Vintage film camera resting on a map beside freshly printed photographs",
      },
      {
        src: unsplash("photo-1497366811353-6870744d04b2", 1600),
        alt: "Sunlit loft studio with a long wooden table and floor-to-ceiling windows",
      },
    ],
    createdAt: "2024-11-02",
    image: unsplash("photo-1516035069371-29a1b244cc32", 900),
    imageAlt:
      "Camera body and prime lenses arranged on a dark studio surface",
  },
  {
    id: "studio_002",
    slug: "blackbird-sound-stage",
    title: "Blackbird Sound Stage",
    category: "sound-stage",
    location: "Atlanta, Georgia",
    hourlyRate: 140,
    rating: 4.9,
    reviewCount: 84,
    capacity: 30,
    description:
      "Black-box stage. Roll-up doors, a 24-foot throw, and grid-locked lighting.",
    overview: [
      "Blackbird is a working black-box stage with roll-up doors on both ends, so trucks back in and sets go up without a shuttle run. The grid is locked and rated for real builds, and the 24-foot throw covers everything from interview setups to full performance captures.",
      "Support spaces do the unglamorous work: a green room that seats a full crew, climate control that survives Georgia summers, and parking that can take a production van. Half-day and full-day blocks, with overnight builds by arrangement.",
    ],
    deposit: 500,
    amenities: [
      "gigabit-wifi",
      "blackout",
      "green-room",
      "loading-dock",
      "parking",
      "climate-control",
    ],
    host: {
      id: "host_002",
      name: "Darnell Price",
      tagline: "Line producer & stage manager",
      responseNote: "Usually responds within an hour",
      joinedYear: 2020,
    },
    gallery: [
      {
        src: unsplash("photo-1514306191717-452ec28c7814", 1600),
        alt: "Deep red stage curtain drawn across a theatre sound stage",
      },
      {
        src: unsplash("photo-1503095396549-807759245b35", 1600),
        alt: "Performers silhouetted against a glowing red stage curtain",
      },
      {
        src: unsplash("photo-1598488035139-bdbb2231ce04", 1600),
        alt: "Warm recording loft with electric guitars mounted above a mixing desk",
      },
    ],
    createdAt: "2024-09-21",
    image: unsplash("photo-1514306191717-452ec28c7814", 900),
    imageAlt:
      "Deep red stage curtain drawn across a theatre sound stage",
  },
  {
    id: "studio_003",
    slug: "analog-music-loft",
    title: "Analog Music Loft",
    category: "music",
    location: "Nashville, Tennessee",
    hourlyRate: 65,
    rating: 4.9,
    reviewCount: 203,
    capacity: 10,
    description:
      "Warm tracking room. Vintage console, live area, and a wall of guitars.",
    overview: [
      "A working tracking room in a converted Nashville warehouse: a serviced vintage console, a live area that takes a drum kit and a small band at once, and a wall of guitars and amps included in the rate. The control room looks straight into the live room through a single pane of glass.",
      "Sessions run on house power that was wired for audio — no generator hum, no mystery ground loops. Wes keeps the patchbay labeled and the tea kettle on, and will engineer by the hour if your budget allows.",
    ],
    deposit: 250,
    amenities: [
      "gigabit-wifi",
      "grand-piano",
      "drum-kit",
      "mixing-desk",
      "vocal-booth",
      "lounge-seating",
    ],
    host: {
      id: "host_003",
      name: "Wesley Kane",
      tagline: "Producer & studio owner",
      responseNote: "Usually responds within an hour",
      joinedYear: 2019,
    },
    gallery: [
      {
        src: unsplash("photo-1598488035139-bdbb2231ce04", 1600),
        alt: "Warm recording loft with electric guitars mounted above a mixing desk",
      },
      {
        src: unsplash("photo-1520523839897-bd0b52f945a0", 1600),
        alt: "Close-up of warm, softly lit upright piano keys",
      },
      {
        src: unsplash("photo-1478737270239-2f02b77fc618", 1600),
        alt: "Studio condenser microphone on a shock mount in a darkened vocal booth",
      },
    ],
    createdAt: "2024-12-05",
    image: unsplash("photo-1598488035139-bdbb2231ce04", 900),
    imageAlt:
      "Warm recording loft with electric guitars mounted above a mixing desk",
  },
  {
    id: "studio_004",
    slug: "the-frequency-room",
    title: "The Frequency Room",
    category: "podcast",
    location: "Austin, Texas",
    hourlyRate: 45,
    rating: 4.8,
    reviewCount: 97,
    capacity: 4,
    description:
      "Four-seat podcast booth. Broadcast mics, full treatment, and a live engineer on request.",
    overview: [
      "Four seats, four broadcast mics on boom arms, and treatment on every surface — record a full panel and skip the cleanup pass. The desk takes laptops and a small switcher, so video podcasts are just as easy as audio-only.",
      "A live mix engineer can be added to any booking, and the room is pre-wired for remote guests on a clean return. Walk in, sit down, record; the files are yours at the end of the session.",
    ],
    deposit: 75,
    amenities: [
      "gigabit-wifi",
      "mic-array",
      "acoustic-treatment",
      "espresso-bar",
      "climate-control",
    ],
    host: {
      id: "host_004",
      name: "Alicia Moreno",
      tagline: "Podcast producer",
      responseNote: "Usually responds within an hour",
      joinedYear: 2022,
    },
    gallery: [
      {
        src: unsplash("photo-1581368135153-a506cf13b1e1", 1600),
        alt: "Host in headphones speaking into a boom-arm microphone at a podcast desk",
      },
      {
        src: unsplash("photo-1589903308904-1010c2294adc", 1600),
        alt: "Broadcast microphone and headphones beside an editing workstation",
      },
      {
        src: unsplash("photo-1478737270239-2f02b77fc618", 1600),
        alt: "Studio condenser microphone on a shock mount in a darkened vocal booth",
      },
    ],
    createdAt: "2025-01-09",
    image: unsplash("photo-1581368135153-a506cf13b1e1", 900),
    imageAlt:
      "Host in headphones speaking into a boom-arm microphone at a podcast desk",
  },
  {
    id: "studio_005",
    slug: "atelier-nord",
    title: "Atelier Nord",
    category: "art",
    location: "Portland, Oregon",
    hourlyRate: 55,
    rating: 4.8,
    reviewCount: 61,
    capacity: 12,
    description:
      "Gallery-style art workshop. Track lighting, a wet station, and sixteen easels.",
    overview: [
      "A working atelier with sixteen adjustable easels, a wet station that survives a full class day, and track lighting calibrated to read color true — hang a show, teach a workshop, or take the room for a private studio day.",
      "North-facing windows give even morning light, and lockable storage means materials stay between sessions. The room cleans down fast, and the washout station is plumbed for clay as well as paint.",
    ],
    deposit: 100,
    amenities: [
      "gigabit-wifi",
      "easels",
      "natural-light",
      "clay-sink",
      "lockable-storage",
      "step-free-access",
    ],
    host: {
      id: "host_005",
      name: "Marta Kowalski",
      tagline: "Painter & workshop leader",
      responseNote: "Responds within a few hours",
      joinedYear: 2020,
    },
    gallery: [
      {
        src: unsplash("photo-1572947650440-e8a97ef053b2", 1600),
        alt: "Moody gallery-style art workshop with framed works under track lighting",
      },
      {
        src: unsplash("photo-1513364776144-60967b0f800f", 1600),
        alt: "Paintbrushes loaded with colour on a canvas",
      },
      {
        src: unsplash("photo-1524758631624-e2822e304c36", 1600),
        alt: "Bright designer lounge with sculptural chairs and a statement floor lamp",
      },
    ],
    createdAt: "2025-02-27",
    image: unsplash("photo-1572947650440-e8a97ef053b2", 900),
    imageAlt:
      "Moody gallery-style art workshop with framed works under track lighting",
  },
  {
    id: "studio_006",
    slug: "ember-vocal-suite",
    title: "Ember Vocal Suite",
    category: "music",
    location: "Denver, Colorado",
    hourlyRate: 70,
    rating: 4.7,
    reviewCount: 148,
    capacity: 4,
    description:
      "Isolated vocal booth. Tube condenser, zero-latency cue mix, and a dimmer for mood.",
    overview: [
      "One room, one job: vocals. Ember is an isolated booth around a tube condenser, with a zero-latency cue mix and a dimmer that lets you set the mood for a long session. The sound floor is low enough for whisper takes.",
      "The adjoining control nook handles comping while the singer stays warm in the booth. Book by the hour for overdubs or grab an evening block for a full vocal production day.",
    ],
    deposit: 150,
    amenities: [
      "gigabit-wifi",
      "vocal-booth",
      "acoustic-treatment",
      "mixing-desk",
      "espresso-bar",
    ],
    host: {
      id: "host_006",
      name: "Tomas Lindqvist",
      tagline: "Vocal coach & recording engineer",
      responseNote: "Responds same day",
      joinedYear: 2021,
    },
    gallery: [
      {
        src: unsplash("photo-1478737270239-2f02b77fc618", 1600),
        alt: "Studio condenser microphone on a shock mount in a darkened vocal booth",
      },
      {
        src: unsplash("photo-1598488035139-bdbb2231ce04", 1600),
        alt: "Warm recording loft with electric guitars mounted above a mixing desk",
      },
      {
        src: unsplash("photo-1589903308904-1010c2294adc", 1600),
        alt: "Broadcast microphone and headphones beside an editing workstation",
      },
    ],
    createdAt: "2024-10-15",
    image: unsplash("photo-1478737270239-2f02b77fc618", 900),
    imageAlt:
      "Studio condenser microphone on a shock mount in a darkened vocal booth",
  },
  {
    id: "studio_007",
    slug: "daybreak-loft-studio",
    title: "Daybreak Loft Studio",
    category: "photography",
    location: "Los Angeles, California",
    hourlyRate: 72,
    rating: 4.8,
    reviewCount: 98,
    capacity: 12,
    description:
      "North-facing loft. Ten-foot windows flood the cove from sunrise to dusk.",
    overview: [
      "A daylight loft built around ten-foot windows that flood the cove from sunrise to dusk — no flags, no bounce boards, just honest north light for most of the working day. The white cove sweeps wide enough for movement and small vehicle props.",
      "Downstairs load-in, a styling corner with two makeup stations, and an espresso bar that keeps crews on site. Popular for brand films, lookbooks, and anything that wants soft, forgiving daylight.",
    ],
    deposit: 150,
    amenities: [
      "gigabit-wifi",
      "natural-light",
      "makeup-stations",
      "kitchenette",
      "espresso-bar",
      "step-free-access",
    ],
    host: {
      id: "host_007",
      name: "Elena Márquez",
      tagline: "Set designer turned space host",
      responseNote: "Responds within a few hours",
      joinedYear: 2022,
    },
    gallery: [
      {
        src: unsplash("photo-1497366811353-6870744d04b2", 1600),
        alt: "Sunlit loft studio with a long wooden table and floor-to-ceiling windows",
      },
      {
        src: unsplash("photo-1516035069371-29a1b244cc32", 1600),
        alt: "Camera body and prime lenses arranged on a dark studio surface",
      },
      {
        src: unsplash("photo-1524758631624-e2822e304c36", 1600),
        alt: "Bright designer lounge with sculptural chairs and a statement floor lamp",
      },
    ],
    createdAt: "2025-03-18",
    image: unsplash("photo-1497366811353-6870744d04b2", 900),
    imageAlt:
      "Sunlit loft studio with a long wooden table and floor-to-ceiling windows",
  },
  {
    id: "studio_008",
    slug: "the-print-lab",
    title: "The Print Lab",
    category: "photography",
    location: "Brooklyn, New York",
    hourlyRate: 58,
    rating: 4.8,
    reviewCount: 66,
    capacity: 6,
    description:
      "Daylight print lab. Copy table, garment rack, and a seamless wall for styling.",
    overview: [
      "A daylight prep-and-shoot room for the work that happens around a shoot: a copy table under even north light, garment racks for styling, and a seamless wall for the frames that need to happen between fittings.",
      "Rae's second Brooklyn space, run with the same standards as Noir — organized, quiet, and priced for the small crew that doesn't need a stage. Lockable storage keeps client samples safe between bookings.",
    ],
    deposit: 100,
    amenities: [
      "gigabit-wifi",
      "natural-light",
      "garment-racks",
      "prop-library",
      "kitchenette",
      "lockable-storage",
    ],
    host: {
      id: "host_001",
      name: "Rae Whitfield",
      tagline: "Portrait photographer & studio operator",
      responseNote: "Usually responds within an hour",
      joinedYear: 2021,
    },
    gallery: [
      {
        src: unsplash("photo-1452587925148-ce544e77e70d", 1600),
        alt: "Vintage film camera resting on a map beside freshly printed photographs",
      },
      {
        src: unsplash("photo-1516035069371-29a1b244cc32", 1600),
        alt: "Camera body and prime lenses arranged on a dark studio surface",
      },
      {
        src: unsplash("photo-1513364776144-60967b0f800f", 1600),
        alt: "Paintbrushes loaded with colour on a canvas",
      },
    ],
    createdAt: "2026-01-08",
    image: unsplash("photo-1452587925148-ce544e77e70d", 900),
    imageAlt:
      "Vintage film camera resting on a map beside freshly printed photographs",
  },
  {
    id: "studio_009",
    slug: "the-foundry-stage",
    title: "The Foundry Stage",
    category: "sound-stage",
    location: "Austin, Texas",
    hourlyRate: 165,
    rating: 4.6,
    reviewCount: 52,
    capacity: 40,
    description:
      "Converted foundry bay. Steel trusses span forty feet overhead.",
    overview: [
      "A converted foundry bay with forty feet of clear span under steel trusses that took our last three rigging plans without an exception. Column-free floor, 30kW of power, and a loading dock a box truck can back straight into.",
      "The bones are industrial and honest: concrete floor, high bay doors, and enough height to build tall. Step-free throughout, with a green room and catering corner at the back for long shoot days.",
    ],
    deposit: 750,
    amenities: [
      "gigabit-wifi",
      "loading-dock",
      "green-room",
      "parking",
      "climate-control",
      "step-free-access",
    ],
    host: {
      id: "host_008",
      name: "Priya Raghavan",
      tagline: "Location manager",
      responseNote: "Responds within a few hours",
      joinedYear: 2023,
    },
    gallery: [
      {
        src: unsplash("photo-1503095396549-807759245b35", 1600),
        alt: "Performers silhouetted against a glowing red stage curtain",
      },
      {
        src: unsplash("photo-1514306191717-452ec28c7814", 1600),
        alt: "Deep red stage curtain drawn across a theatre sound stage",
      },
      {
        src: unsplash("photo-1524758631624-e2822e304c36", 1600),
        alt: "Bright designer lounge with sculptural chairs and a statement floor lamp",
      },
    ],
    createdAt: "2025-06-12",
    image: unsplash("photo-1503095396549-807759245b35", 900),
    imageAlt:
      "Performers silhouetted against a glowing red stage curtain",
  },
  {
    id: "studio_010",
    slug: "signal-podcast-suite",
    title: "Signal Podcast Suite",
    category: "podcast",
    location: "Seattle, Washington",
    hourlyRate: 52,
    rating: 4.9,
    reviewCount: 77,
    capacity: 5,
    description:
      "Glass-walled podcast suite. River views beyond the faders.",
    overview: [
      "A glass-walled suite above the river with a broadcast-ready signal chain: five mic positions, a monitor controller, and routing that flatters every voice we've run through it. Video podcasts look as good as they sound — river light does the background work.",
      "Ben hosts most mornings himself and will walk first-timers through the routing in ten minutes. Monthly blocks are common for weekly shows; mornings book out fastest.",
    ],
    deposit: 100,
    amenities: [
      "gigabit-wifi",
      "mic-array",
      "acoustic-treatment",
      "natural-light",
      "kitchenette",
    ],
    host: {
      id: "host_009",
      name: "Ben Sato",
      tagline: "Audio engineer & podcast host",
      responseNote: "Responds within a few hours",
      joinedYear: 2023,
    },
    gallery: [
      {
        src: unsplash("photo-1589903308904-1010c2294adc", 1600),
        alt: "Broadcast microphone and headphones beside an editing workstation",
      },
      {
        src: unsplash("photo-1581368135153-a506cf13b1e1", 1600),
        alt: "Host in headphones speaking into a boom-arm microphone at a podcast desk",
      },
      {
        src: unsplash("photo-1478737270239-2f02b77fc618", 1600),
        alt: "Studio condenser microphone on a shock mount in a darkened vocal booth",
      },
    ],
    createdAt: "2025-10-30",
    image: unsplash("photo-1589903308904-1010c2294adc", 900),
    imageAlt:
      "Broadcast microphone and headphones beside an editing workstation",
  },
  {
    id: "studio_011",
    slug: "riverside-music-suite",
    title: "Riverside Music Suite",
    category: "music",
    location: "Nashville, Tennessee",
    hourlyRate: 78,
    rating: 4.7,
    reviewCount: 89,
    capacity: 8,
    description:
      "Live room over the river. Yamaha grand, drum riser, and variable acoustics.",
    overview: [
      "A live room on the water with a Yamaha grand that stays tuned, a permanent drum riser, and variable acoustic panels that genuinely change the decay of the space. Track a ballad in the morning and a full band at night without moving a chair.",
      "June engineered on enough records to know what a session needs before it asks — the patchbay is labeled, the headphone mixes are sane, and the river view does something quiet to a long day.",
    ],
    deposit: 250,
    amenities: [
      "gigabit-wifi",
      "grand-piano",
      "drum-kit",
      "mixing-desk",
      "acoustic-treatment",
      "kitchenette",
    ],
    host: {
      id: "host_010",
      name: "June Okafor",
      tagline: "Recording engineer & space host",
      responseNote: "Usually responds within an hour",
      joinedYear: 2022,
    },
    gallery: [
      {
        src: unsplash("photo-1520523839897-bd0b52f945a0", 1600),
        alt: "Close-up of warm, softly lit upright piano keys",
      },
      {
        src: unsplash("photo-1598488035139-bdbb2231ce04", 1600),
        alt: "Warm recording loft with electric guitars mounted above a mixing desk",
      },
      {
        src: unsplash("photo-1478737270239-2f02b77fc618", 1600),
        alt: "Studio condenser microphone on a shock mount in a darkened vocal booth",
      },
    ],
    createdAt: "2025-09-17",
    image: unsplash("photo-1520523839897-bd0b52f945a0", 900),
    imageAlt: "Close-up of warm, softly lit upright piano keys",
  },
  {
    id: "studio_012",
    slug: "clay-and-kiln-studio",
    title: "Clay & Kiln Studio",
    category: "art",
    location: "Portland, Oregon",
    hourlyRate: 40,
    rating: 4.9,
    reviewCount: 97,
    capacity: 12,
    description:
      "Ceramics workshop. Six wheels, two kilns, and a dedicated washout station.",
    overview: [
      "A ceramics workshop that runs like a classroom: six wheels, two kilns on a published firing schedule, and a washout station plumbed for clay so the space is clean at the end of every session. Glaze-testing notes live on the wall, courtesy of Ivy.",
      "Book the room for a class, a residency block, or a firing weekend. Materials and firings are billed separately by arrangement, and lockable storage keeps work-in-progress between visits.",
    ],
    deposit: 75,
    amenities: [
      "gigabit-wifi",
      "kilns",
      "clay-sink",
      "natural-light",
      "lockable-storage",
      "climate-control",
    ],
    host: {
      id: "host_011",
      name: "Ivy Chen",
      tagline: "Ceramicist & workshop host",
      responseNote: "Responds same day",
      joinedYear: 2022,
    },
    gallery: [
      {
        src: unsplash("photo-1513364776144-60967b0f800f", 1600),
        alt: "Paintbrushes loaded with colour on a canvas",
      },
      {
        src: unsplash("photo-1572947650440-e8a97ef053b2", 1600),
        alt: "Moody gallery-style art workshop with framed works under track lighting",
      },
      {
        src: unsplash("photo-1524758631624-e2822e304c36", 1600),
        alt: "Bright designer lounge with sculptural chairs and a statement floor lamp",
      },
    ],
    createdAt: "2025-05-22",
    image: unsplash("photo-1513364776144-60967b0f800f", 900),
    imageAlt: "Paintbrushes loaded with colour on a canvas",
  },
  {
    id: "studio_013",
    slug: "the-maker-lounge",
    title: "The Maker Lounge",
    category: "art",
    location: "Seattle, Washington",
    hourlyRate: 48,
    rating: 4.7,
    reviewCount: 58,
    capacity: 14,
    description:
      "Bright maker lounge. Soft seating, sample tables, and space to pin up work.",
    overview: [
      "A bright, calm lounge for the collaborative parts of creative work: sample tables big enough to unroll a collection, pin-up walls for a full day of reviews, and soft seating that makes a residency feel like a residency.",
      "Step-free throughout, with an espresso bar and lockable storage for materials. Ivy's second space suits workshops, portfolio reviews, and small teams who need a room that isn't an office.",
    ],
    deposit: 100,
    amenities: [
      "gigabit-wifi",
      "natural-light",
      "lounge-seating",
      "lockable-storage",
      "espresso-bar",
      "step-free-access",
    ],
    host: {
      id: "host_011",
      name: "Ivy Chen",
      tagline: "Ceramicist & workshop host",
      responseNote: "Responds same day",
      joinedYear: 2022,
    },
    gallery: [
      {
        src: unsplash("photo-1524758631624-e2822e304c36", 1600),
        alt: "Bright designer lounge with sculptural chairs and a statement floor lamp",
      },
      {
        src: unsplash("photo-1572947650440-e8a97ef053b2", 1600),
        alt: "Moody gallery-style art workshop with framed works under track lighting",
      },
      {
        src: unsplash("photo-1513364776144-60967b0f800f", 1600),
        alt: "Paintbrushes loaded with colour on a canvas",
      },
    ],
    createdAt: "2026-02-14",
    image: unsplash("photo-1524758631624-e2822e304c36", 900),
    imageAlt:
      "Bright designer lounge with sculptural chairs and a statement floor lamp",
  },
];

/** Highest-rated first, matching what the backend endpoint promises. */
export function mockFeaturedStudios(limit = 6): Studio[] {
  return [...MOCK_STUDIOS]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, limit);
}
