import { Quad, Triple, Double, SurfaceTow } from "@/components/Icons";
import { LiftType } from "@/components/Weather/conditionTypes";

const liftData: Record<
  LiftType,
  Record<number, { name: string; icon: JSX.Element }>
> = {
  CHAIRLIFT: {
    4: { name: "Fixed Grip Quad", icon: <Quad /> },
    3: { name: "Fixed Grip Triple", icon: <Triple /> },
    2: { name: "Fixed Grip Double", icon: <Double /> },
  },
  DETACHABLE_CHAIRLIFT: {
    4: { name: "High Speed Quad", icon: <Quad /> },
  },
  SURFACE_LIFT: {
    1: { name: "J-Bar", icon: <SurfaceTow /> },
  },
  ROPE_TOW: {
    1: { name: "Rope Tow", icon: <SurfaceTow /> },
  },
  MAGIC_CARPET: {
    1: { name: "Magic Carpet", icon: <SurfaceTow /> },
  },
};

export const findLiftData = (liftType: LiftType, capacity: number) => {
  return liftData[liftType]?.[capacity] || { name: "", icon: <></> };
};
