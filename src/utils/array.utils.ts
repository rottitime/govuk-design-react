export const insertIf = (condition: boolean, ...elements: unknown[]) =>
  condition ? elements : []
