import { OperatingHours } from "@/components/Weather/conditionTypes";

export const formatTimeRange = (timeRange: OperatingHours): object => {
  const beginTime = timeRange.beginTime;
  const endTime = timeRange.endTime;

  const beginDate = beginTime ? new Date(`1970-01-01T${beginTime}`) : null;
  const endDate = endTime ? new Date(`1970-01-01T${endTime}`) : null;

  const displayBeginTime = beginDate?.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const displayEndTime = endDate?.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return {
    beginTime: displayBeginTime,
    endTime: displayEndTime,
  };
};
