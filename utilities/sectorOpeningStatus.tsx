import { Trail } from "@/components/Weather/conditionTypes";

export const sectorOpeningStatus = (trails: Trail[]): string => {
  const allOperating = trails.every((trail) => trail.openingStatus === "OPEN");
  const allClosed = trails.every((trail) => trail.openingStatus === "CLOSED");

  if (allOperating) {
    return "OPEN";
  } else if (allClosed) {
    return "CLOSED";
  } else {
    return "PARTIAL";
  }
};
