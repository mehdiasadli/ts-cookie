export function assign<T extends object>(target: T, ...sources: Array<Partial<T>>): T {
  for (const source of sources) {
    if (source) {
      Object.keys(source).forEach((key) => {
        const value = source[key as keyof typeof source];

        if (value !== undefined) {
          (target as any)[key] = value;
        }
      });
    }
  }

  return target;
}
