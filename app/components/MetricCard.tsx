import React from "react";
import { useTheme, getColorClasses } from "../hooks/useTheme";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative";
}

export default function MetricCard({
  title,
  value,
  icon,
  change,
  changeType,
}: MetricCardProps) {
  const { colorTheme } = useTheme();
  const colors = getColorClasses(colorTheme);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 xl:p-6 lg:p-4 p-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="xl:text-2xl lg:text-xl text-lg font-bold text-gray-900 dark:text-white mt-1">
            {typeof value === "number" &&
            title.toLowerCase().includes("revenue")
              ? `$${value.toLocaleString()}`
              : value.toLocaleString()}
          </p>
          {change && (
            <p
              className={`text-sm mt-1 ${
                changeType === "positive"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {changeType === "positive" ? "↗" : "↘"} {change}
            </p>
          )}
        </div>
        <div
          className={`xl:p-3 p-2 rounded-lg ${colors.primary} bg-opacity-10`}
        >
          <div className={`w-6 h-6 ${colors.primaryText}`}>{icon}</div>
        </div>
      </div>
    </div>
  );
}
