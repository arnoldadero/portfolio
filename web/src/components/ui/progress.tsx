import * as React from "react"

export interface ProgressProps {
  value?: number;
  className?: string;
}

export function Progress({ value = 0, className }: ProgressProps) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-muted ${className}`}>
      <div
        className="h-full bg-primary transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
