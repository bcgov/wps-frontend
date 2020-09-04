export const logError = (err: Error): void => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err)
  }
}
