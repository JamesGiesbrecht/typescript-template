export const helloWorld = (name: string): string => {
  return `Hello, ${name}`
}

export const asyncHelloWorld = async (
  name: string,
  secondsToWait = 2,
): Promise<string> => {
  const milliseconds = secondsToWait * 1000
  console.log(`Saying hello in ${secondsToWait} seconds`)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(helloWorld(name))
    }, milliseconds)
  })
}
