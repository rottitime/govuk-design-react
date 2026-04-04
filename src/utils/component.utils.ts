import type { MutableRefObject, Ref } from 'react'

/** Merges multiple refs so they all receive the same instance (RHF register + wrappers). */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): Ref<T> {
  return (value) => {
    for (const ref of refs) {
      if (ref == null) continue
      if (typeof ref === 'function') ref(value)
      else (ref as MutableRefObject<T | null>).current = value
    }
  }
}
