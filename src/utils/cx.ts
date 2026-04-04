type ClassPart = string | undefined | null | false | ClassPart[]

/**
 * Joins class names, skipping falsy values and trimming. Arrays are flattened one level.
 *
 * @example
 * cx('govuk-input', className, isWide && 'govuk-!-width-full')
 * cx(['govuk-fieldset', className], error && 'govuk-fieldset--error')
 */
export function cx(...parts: ClassPart[]): string {
  const out: string[] = []

  const push = (s: string) => {
    const t = s.trim()
    if (t) out.push(t)
  }

  const walk = (part: ClassPart) => {
    if (part == null || part === false) return
    if (Array.isArray(part)) {
      for (const item of part) walk(item)
    } else {
      push(String(part))
    }
  }

  for (const part of parts) walk(part)
  return out.join(' ')
}
