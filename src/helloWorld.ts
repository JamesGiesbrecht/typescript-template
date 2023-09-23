export const helloWorld = (name: string) => {
  console.log('Hello', name)
}

export const asyncHelloWorld = async (name: string, secondsToWait = 2) => {
  const milliseconds = secondsToWait * 1000

  console.log(`Saying hello in ${secondsToWait} seconds`)

  await setTimeout(() => {
    console.log('Hello', name)
  }, milliseconds)
}
