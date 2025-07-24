export const parseOutput = (data, osName, portNumber) => {
  // Define OS-specific configurations
  const osConfigs = {
    windows: {
      regex: /(TCP|UDP)\s+([\d.:]+)\s+[\d.:]+\s+\w+\s+(\d+)/,
      extractValues: match => {
        const [protocol, localIp, pid] = match.slice(1);
        const port = localIp.split(':')[1];
        return { protocol, port, pid };
      },
    },
    default: {
      regex:
        /\S+\s+(\d+)\s+\S+\s+\S+\s+\S+\s+\d+\s+\S+\s+(TCP|UDP)\s+\S+:(\d+)/,
      extractValues: match => {
        const [pid, protocol, port] = match.slice(1);
        return { protocol, port, pid };
      },
    },
  };

  // Get the appropriate config
  const config = osConfigs[osName] || osConfigs.default;

  // Common processing logic
  const lines = data.split('\n').map(line => line.trim());

  const processedLines = lines.reduce((acc, line) => {
    const match = line.match(config.regex);
    if (match) {
      acc.push(config.extractValues(match));
    }
    return acc;
  }, []);

  const filteredLines = processedLines.filter(
    line => line.port === String(portNumber)
  );

  return filteredLines;
};
