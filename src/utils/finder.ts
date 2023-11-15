import fs from 'fs'

export const file = {
  create: (path: string, content: string) => {
    fs.writeFileSync(path, content)
  },
}
