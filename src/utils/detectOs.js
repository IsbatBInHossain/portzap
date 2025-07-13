import os from 'node:os'

export const detectOs = () => {
  const platform = os.platform()
  if (platform === 'win32') {
    return 'windows'
  } else if (platform === 'darwin') {
    return 'macos'
  } else if (platform === 'linux') {
    return 'linux'
  } else {
    throw new Error(`Unsupported OS: ${platform}`)
  }
}
