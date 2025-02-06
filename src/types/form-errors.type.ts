export type FormErrorsType<T> = {
  [K in keyof T]: string[]
}
