type ClassPart = string | undefined | null | false | ClassPart[]

/**
 * Joins class names, skipping falsy values. Arrays are flattened. Duplicate tokens
 * (including across arguments) are removed; first occurrence wins.
 *
 * @example
 * cx('govuk-input', className, isWide && 'govuk-!-width-full')
 * cx(['govuk-fieldset', className], error && 'govuk-fieldset--error')
 */
export function cx(...parts: ClassPart[]): string {
  const seen = new Set<string>()
  const tokens: string[] = []

  const addToken = (raw: string) => {
    const t = raw.trim()
    if (!t || seen.has(t)) return
    seen.add(t)
    tokens.push(t)
  }

  const addString = (s: string) => {
    const str = String(s).trim()
    if (!str) return
    for (const token of str.split(/\s+/)) addToken(token)
  }

  const walk = (part: ClassPart) => {
    if (part == null || part === false) return
    if (Array.isArray(part)) {
      for (const item of part) walk(item)
    } else {
      addString(String(part))
    }
  }

  for (const part of parts) walk(part)
  return tokens.join(' ')
}
