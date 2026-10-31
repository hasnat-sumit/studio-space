import {
  AccessibilityIcon,
  ArmchairIcon,
  AudioLinesIcon,
  BoxIcon,
  CarIcon,
  CircleDashedIcon,
  CoffeeIcon,
  CookingPotIcon,
  DoorOpenIcon,
  DropletsIcon,
  DrumIcon,
  FlameIcon,
  LibraryIcon,
  MicIcon,
  MicVocalIcon,
  MoonIcon,
  PaletteIcon,
  PianoIcon,
  ShirtIcon,
  SparklesIcon,
  SunIcon,
  ThermometerIcon,
  TruckIcon,
  WifiIcon,
  WavesHorizontalIcon,
} from "lucide-react";import type { LucideIcon } from "lucide-react";
import type { StudioAmenityId } from "@/types/studio";

/**
 * Human-readable labels + icons for every amenity identifier.
 *
 * Studios only store the string ids (`src/types/studio.ts`) so the backend
 * stays free to change copy/icons without touching data.
 */
export interface AmenityConfig {
  label: string;
  icon: LucideIcon;
}

export const AMENITIES: Record<StudioAmenityId, AmenityConfig> = {
  "gigabit-wifi": { label: "Gigabit Wi-Fi", icon: WifiIcon },
  "natural-light": { label: "North-facing natural light", icon: SunIcon },
  cyclorama: { label: "Infinity cyclorama", icon: CircleDashedIcon },
  blackout: { label: "Full blackout control", icon: MoonIcon },
  "makeup-stations": { label: "Makeup & hair stations", icon: SparklesIcon },
  kitchenette: { label: "Kitchenette", icon: CookingPotIcon },
  "espresso-bar": { label: "Espresso bar", icon: CoffeeIcon },
  parking: { label: "On-site parking", icon: CarIcon },
  "loading-dock": { label: "Drive-in loading dock", icon: TruckIcon },
  "green-room": { label: "Green room", icon: DoorOpenIcon },
  "drum-kit": { label: "House drum kit", icon: DrumIcon },
  "grand-piano": { label: "Grand piano", icon: PianoIcon },
  "mixing-desk": { label: "Analog mixing desk", icon: AudioLinesIcon },
  "mic-array": { label: "Broadcast mic array", icon: MicIcon },
  "vocal-booth": { label: "Isolated vocal booth", icon: MicVocalIcon },
  "acoustic-treatment": { label: "Treated acoustics", icon: WavesHorizontalIcon },
  easels: { label: "Adjustable easels", icon: PaletteIcon },
  kilns: { label: "On-site kilns", icon: FlameIcon },
  "clay-sink": { label: "Clay sink & washout", icon: DropletsIcon },
  "step-free-access": { label: "Step-free access", icon: AccessibilityIcon },
  "climate-control": { label: "Climate control", icon: ThermometerIcon },
  "lockable-storage": { label: "Lockable storage", icon: BoxIcon },
  "garment-racks": { label: "Garment racks", icon: ShirtIcon },
  "prop-library": { label: "Prop library", icon: LibraryIcon },
  "lounge-seating": { label: "Lounge seating", icon: ArmchairIcon },
};

/** Display label for an amenity id (defensive for unknown ids). */
export function amenityLabel(id: StudioAmenityId): string {
  return AMENITIES[id]?.label ?? id;
}

/** Every amenity id, in declaration order — useful for filters later. */
export const AMENITY_IDS = Object.keys(AMENITIES) as StudioAmenityId[];
