import * as React from "react"

export interface DialogProps {
  children: React.ReactNode;
}

export function Dialog({ children }: DialogProps) {
  return <div>{children}</div>
}

export function DialogTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) {
  return <div className="cursor-pointer">{children}</div>
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
      <div className="relative max-h-[90vh] w-[90vw] max-w-[500px] rounded-lg bg-background p-6 shadow-lg">
        {children}
      </div>
    </div>
  )
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold">{children}</h2>
}
