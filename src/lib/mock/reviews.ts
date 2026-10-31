import type { StudioReview } from "@/types/review";

/**
 * Temporary stand-in for the backend's review responses.
 *
 * This is the only place mock review data lives — `getReviews()` in
 * `src/lib/api/reviews.ts` filters it by studio slug while the API is
 * unconfigured, and is bypassed entirely once the backend responds.
 */
export const MOCK_REVIEWS: readonly StudioReview[] = [
  // ---- Photography ----
  {
    id: "rev_001",
    studioSlug: "noir-photo-studio",
    authorName: "Camille Ortega",
    rating: 5,
    projectType: "Editorial portrait shoot",
    comment:
      "The blackout is total — gels read exactly as metered and the grid held four strobes without a flicker.",
    createdAt: "2026-03-12",
  },
  {
    id: "rev_002",
    studioSlug: "noir-photo-studio",
    authorName: "Devon Blake",
    rating: 5,
    projectType: "Lookbook, 6 looks",
    comment:
      "Booked for a full day and never once fought the space. Rae had the seamless changed between models.",
    createdAt: "2026-01-28",
  },
  {
    id: "rev_003",
    studioSlug: "noir-photo-studio",
    authorName: "Ines Haddad",
    rating: 4,
    projectType: "Headshots",
    comment:
      "Beautiful light and quiet street access. Street parking is tight, but the studio itself is flawless.",
    createdAt: "2025-11-04",
  },
  {
    id: "rev_004",
    studioSlug: "daybreak-loft-studio",
    authorName: "Marcus Reed",
    rating: 5,
    projectType: "Brand film, half day",
    comment:
      "Those windows earn their keep. We chased the light from nine until two and never moved a fixture.",
    createdAt: "2026-02-19",
  },
  {
    id: "rev_005",
    studioSlug: "daybreak-loft-studio",
    authorName: "Yuki Tanaka",
    rating: 5,
    projectType: "Product stills",
    comment:
      "The cove takes a full cyclorama sweep and the espresso bar kept a crew of nine caffeinated.",
    createdAt: "2025-12-06",
  },
  {
    id: "rev_006",
    studioSlug: "daybreak-loft-studio",
    authorName: "Priya Nair",
    rating: 4,
    projectType: "Interview series",
    comment:
      "Genuinely lovely room. Afternoons get warm by the glass, so book the climate control early.",
    createdAt: "2025-09-22",
  },
  {
    id: "rev_007",
    studioSlug: "the-print-lab",
    authorName: "Theo Lambert",
    rating: 5,
    projectType: "Wardrobe styling",
    comment:
      "Copy table, garment racks, and a styling corner — it's the prep space every other shoot was missing.",
    createdAt: "2026-04-02",
  },
  {
    id: "rev_008",
    studioSlug: "the-print-lab",
    authorName: "Alina Petrova",
    rating: 5,
    projectType: "Flat-lay day",
    comment:
      "North light stayed even all afternoon. Printed proofs on the table by the end of the booking.",
    createdAt: "2026-02-11",
  },
  {
    id: "rev_009",
    studioSlug: "the-print-lab",
    authorName: "Sam Whitaker",
    rating: 4,
    projectType: "Accessory catalogue",
    comment:
      "Compact but brilliantly organized. The prop library saved us a rental fee on set dressing.",
    createdAt: "2025-10-30",
  },

  // ---- Sound stages ----
  {
    id: "rev_010",
    studioSlug: "blackbird-sound-stage",
    authorName: "Nadia Cole",
    rating: 5,
    projectType: "Music video, 2 days",
    comment:
      "Roll-up doors on both ends made the load-in a breeze. The lighting grid is properly rigged for a real build.",
    createdAt: "2026-03-28",
  },
  {
    id: "rev_011",
    studioSlug: "blackbird-sound-stage",
    authorName: "Ibrahim Sesay",
    rating: 5,
    projectType: "Commercial spot",
    comment:
      "24 feet of throw and a green room that actually fits the talent. We'll be back for the next campaign.",
    createdAt: "2026-01-15",
  },
  {
    id: "rev_012",
    studioSlug: "blackbird-sound-stage",
    authorName: "Grace Lin",
    rating: 4,
    projectType: "Dance film",
    comment:
      "Floor is sprung enough for our dancers. Bring earplugs for the generator hum next door.",
    createdAt: "2025-08-19",
  },
  {
    id: "rev_013",
    studioSlug: "the-foundry-stage",
    authorName: "Owen Fitzgerald",
    rating: 5,
    projectType: "Automotive reveal",
    comment:
      "Forty feet of clear span and a loading dock a truck can back right into. Rare at this price.",
    createdAt: "2026-03-05",
  },
  {
    id: "rev_014",
    studioSlug: "the-foundry-stage",
    authorName: "Lucía Márquez",
    rating: 4,
    projectType: "Set build, 3 days",
    comment:
      "Industrial bones, serious power. The trusses took our rigging plan without a single exception.",
    createdAt: "2025-12-18",
  },
  {
    id: "rev_015",
    studioSlug: "the-foundry-stage",
    authorName: "Jonah Pierce",
    rating: 5,
    projectType: "Runway capture",
    comment:
      "We built a 60-foot runway and the crew still had room to work around it. Priya is a great host.",
    createdAt: "2025-10-08",
  },

  // ---- Music ----
  {
    id: "rev_016",
    studioSlug: "analog-music-loft",
    authorName: "Rosa Delgado",
    rating: 5,
    projectType: "EP tracking, 3 days",
    comment:
      "The console is serviced and the live room is gorgeous. We tracked drums and vocals without swapping rooms.",
    createdAt: "2026-02-24",
  },
  {
    id: "rev_017",
    studioSlug: "analog-music-loft",
    authorName: "Kwame Boateng",
    rating: 5,
    projectType: "Album pre-production",
    comment:
      "Wesley knows every cable in the place and it shows. Patched in and tracking within twenty minutes.",
    createdAt: "2025-12-01",
  },
  {
    id: "rev_018",
    studioSlug: "analog-music-loft",
    authorName: "Elena Petrov",
    rating: 4,
    projectType: "String session",
    comment:
      "Warm room, characterful gear. The guitar wall is dangerous for the credit card.",
    createdAt: "2025-07-14",
  },
  {
    id: "rev_019",
    studioSlug: "riverside-music-suite",
    authorName: "Daniel Cho",
    rating: 5,
    projectType: "Piano ballad session",
    comment:
      "The grand is tuned and voiced properly, and the river view does something for the mood of a session.",
    createdAt: "2026-03-19",
  },
  {
    id: "rev_020",
    studioSlug: "riverside-music-suite",
    authorName: "Amara Osei",
    rating: 4,
    projectType: "Podcast crossover live",
    comment:
      "Variable acoustics panels genuinely work. Quiet enough for vocals loud enough for a band.",
    createdAt: "2026-01-07",
  },
  {
    id: "rev_021",
    studioSlug: "riverside-music-suite",
    authorName: "Felix Grant",
    rating: 5,
    projectType: "Single mix-down",
    comment:
      "Booked the evening block twice now. The drum riser stays set, which saved us an hour each time.",
    createdAt: "2025-09-30",
  },
  {
    id: "rev_022",
    studioSlug: "ember-vocal-suite",
    authorName: "Hana Suzuki",
    rating: 5,
    projectType: "Vocal production",
    comment:
      "Zero-latency cue mix and a booth you can actually trust. Did twelve takes without touching an edit.",
    createdAt: "2026-02-08",
  },
  {
    id: "rev_023",
    studioSlug: "ember-vocal-suite",
    authorName: "Andre Mullins",
    rating: 4,
    projectType: "Voiceover, audiobook",
    comment:
      "Tube condenser is the real thing. The dimmer is a small touch that makes long sessions kinder.",
    createdAt: "2025-11-19",
  },
  {
    id: "rev_024",
    studioSlug: "ember-vocal-suite",
    authorName: "Sofia Rinaldi",
    rating: 5,
    projectType: "Feature vocal passes",
    comment:
      "Consistent sound floor, thoughtful acoustics. Tomas had the patchbay diagram printed for me.",
    createdAt: "2025-06-27",
  },

  // ---- Podcast ----
  {
    id: "rev_025",
    studioSlug: "the-frequency-room",
    authorName: "Maya Thompson",
    rating: 5,
    projectType: "Interview podcast, 4 episodes",
    comment:
      "Four seats, broadcast mics, no editing afterwards. The live engineer option is worth every dollar.",
    createdAt: "2026-03-22",
  },
  {
    id: "rev_026",
    studioSlug: "the-frequency-room",
    authorName: "Ravi Krishnan",
    rating: 5,
    projectType: "Video podcast",
    comment:
      "Treatment on every surface means the room simply disappears in the mix. Alicia is a gracious host.",
    createdAt: "2026-01-31",
  },
  {
    id: "rev_027",
    studioSlug: "the-frequency-room",
    authorName: "Claire Dubois",
    rating: 4,
    projectType: "Remote interview day",
    comment:
      "Compact for four, which is exactly the promise. Booked three blocks back to back with no issues.",
    createdAt: "2025-10-12",
  },
  {
    id: "rev_028",
    studioSlug: "signal-podcast-suite",
    authorName: "Jonas Weber",
    rating: 5,
    projectType: "Weekly show, monthly block",
    comment:
      "Glass walls, river light, and a signal chain that flatters every voice we've put through it.",
    createdAt: "2026-04-09",
  },
  {
    id: "rev_029",
    studioSlug: "signal-podcast-suite",
    authorName: "Talia Brooks",
    rating: 5,
    projectType: "Branded podcast",
    comment:
      "Ben walked us through the routing in ten minutes and left us to it. Client thrilled with the audio.",
    createdAt: "2026-02-02",
  },
  {
    id: "rev_030",
    studioSlug: "signal-podcast-suite",
    authorName: "Oscar Nilsson",
    rating: 4,
    projectType: "Panel recording",
    comment:
      "Great room for a four-mic panel. Mornings book out fast — grab the slot early.",
    createdAt: "2025-11-27",
  },

  // ---- Art ----
  {
    id: "rev_031",
    studioSlug: "atelier-nord",
    authorName: "Beatriz Lima",
    rating: 5,
    projectType: "Painting workshop, 12 students",
    comment:
      "Sixteen easels, a wet station that survives a full day, and track lighting that reads color true.",
    createdAt: "2026-03-08",
  },
  {
    id: "rev_032",
    studioSlug: "atelier-nord",
    authorName: "Henry Okafor",
    rating: 4,
    projectType: "Life drawing",
    comment:
      "North light in the morning is exactly right for drawing. Lockable storage kept our materials safe.",
    createdAt: "2025-12-13",
  },
  {
    id: "rev_033",
    studioSlug: "atelier-nord",
    authorName: "Greta Fischer",
    rating: 5,
    projectType: "Private studio day",
    comment:
      "It feels like a real working atelier, not a rented room. Marta left the good brushes out for us.",
    createdAt: "2025-08-03",
  },
  {
    id: "rev_034",
    studioSlug: "clay-and-kiln-studio",
    authorName: "Noor Rahman",
    rating: 5,
    projectType: "Ceramics class, 6 students",
    comment:
      "Six wheels, two kilns firing on schedule, and a washout station that doesn't quit. Ideal classroom.",
    createdAt: "2026-02-26",
  },
  {
    id: "rev_035",
    studioSlug: "clay-and-kiln-studio",
    authorName: "Peter Vandermeer",
    rating: 5,
    projectType: "Glaze testing weekend",
    comment:
      "Booked both kilns for a firing weekend. Ivy's glaze notes taped to the wall saved me hours.",
    createdAt: "2025-12-29",
  },
  {
    id: "rev_036",
    studioSlug: "clay-and-kiln-studio",
    authorName: "Sunny Alvarez",
    rating: 4,
    projectType: "Wheel-throwing intensive",
    comment:
      "Wonderful, unpretentious workspace. Bring an apron — the clay sink means you'll actually use it.",
    createdAt: "2025-09-11",
  },
  {
    id: "rev_037",
    studioSlug: "the-maker-lounge",
    authorName: "Freya Nilsen",
    rating: 5,
    projectType: "Design review",
    comment:
      "Soft seating, big sample tables, and wall space to pin an entire collection. Our team moved in happily.",
    createdAt: "2026-04-15",
  },
  {
    id: "rev_038",
    studioSlug: "the-maker-lounge",
    authorName: "Caleb Ross",
    rating: 4,
    projectType: "Maker residency, week block",
    comment:
      "Bright and calm all day. The espresso bar earned more compliments than the work did.",
    createdAt: "2026-03-01",
  },
  {
    id: "rev_039",
    studioSlug: "the-maker-lounge",
    authorName: "Amélie Fontaine",
    rating: 5,
    projectType: "Portfolio review day",
    comment:
      "Step-free access mattered for one of our guests, and the whole space just feels considered.",
    createdAt: "2026-01-21",
  },
];

/** Mock reviews for one studio (by slug), newest first. */
export function mockReviewsFor(studioSlug: string): StudioReview[] {
  return MOCK_REVIEWS.filter((review) => review.studioSlug === studioSlug).sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
}
