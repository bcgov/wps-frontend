// Utility type that makes all properties, included nested ones, optional
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}
