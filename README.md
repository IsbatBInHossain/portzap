# portzap

A CLI tool for managing and killing processes on specific ports.

No more digging through `lsof` or `netstat` output. No more waiting 10 seconds
for a port conflict error from a zombie Node server.

## Install

Clone the repository and install dependencies:
```bash
git clone https://github.com/IsbatBInHossain/portzap.git
cd portzap
npm install
```

Link it globally so you can use it anywhere:
```bash
npm link
```

## Usage

### List all ports in use
```bash
portzap list
```

### Kill a process on a specific port
```bash
portzap zap 3000
```

### Help
```bash
portzap --help
portzap help zap
portzap help list
```

## Platform

Linux and Windows. macOS is not supported.

On Linux, portzap uses `kill`. On Windows, it uses `taskkill`.

## Requirements

Node.js 18+

## License

MIT
