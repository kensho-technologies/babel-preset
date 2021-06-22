export default function groupBy<T, K>(items: T[], iteratee: (item: T) => K): Map<K, T[]> {
  const groups = new Map<K, T[]>()

  items.forEach((item) => {
    const key = iteratee(item)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (groups.has(key)) groups.get(key)!.push(item)
    else groups.set(key, [item])
  })

  return groups
}
