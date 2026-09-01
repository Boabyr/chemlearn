/** Rechnet einen Ausdruck über den gegebenen Größen aus. */
export function auswerten(ausdruck: string, werte: Record<string, number>): number

/** Namen im Ausdruck, ohne Funktionsaufrufe. */
export function variablenIn(ausdruck: string): string[]

/** Beanstandung oder null, wenn der Ausdruck über den erlaubten Größen aufgeht. */
export function pruefeAusdruck(ausdruck: string, erlaubteVariablen: string[]): string | null
