export const parseOutput = (data, osName) => {
  // Define OS-specific configurations
  const osConfigs = {
    windows: {
      regex: /(TCP|UDP)\s+([\d.:]+)\s+[\d.:]+\s+\w+\s+(\d+)/,
      extractValues: (match) => {
        const [protocol, localIp, pid] = match.slice(1);
        const port = localIp.split(':')[1];
        return { protocol, port, pid };
      },
    },
    unix: {
      regex:
        /\S+\s+(\d+)\s+\S+\s+\S+\s+\S+\s+\d+\s+\S+\s+(TCP|UDP)\s+\S+:(\d+)/,
      extractValues: (match) => {
        const [pid, protocol, port] = match.slice(1);
        return { protocol, port, pid };
      },
    },
  };

  // Get the appropriate config
  const config = osConfigs[osName];

  // Common processing logic
  const lines = data.split('\n').map((line) => line.trim());

  const processedLines = lines.reduce((acc, line) => {
    const match = line.match(config.regex);
    if (match) {
      acc.push(config.extractValues(match));
    }
    return acc;
  }, []);

  return processedLines;
};

export const filterData = (data, portNumber) =>
  data.filter((line) => (portNumber ? line.port === String(portNumber) : true));
