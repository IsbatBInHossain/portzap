export const parseOutput = (data, osName) => {
  if (osName === 'windows') {
    const r = /(TCP|UDP)\s+([\d.:]+)\s+([\d.:]+)\s+\w+\s+(\d+)/;
    const lines = data.split('\n').map(line => line.trim());
    lines.forEach(line => {
      const match = line.match(r);
      if (match) {
        const [protocol, localIp, remoteIp, port] = match.slice(1);
        console.log(
          `Protocol: ${protocol}, Local IP: ${localIp}, Remote IP: ${remoteIp}, Port: ${port}`
        );
        return {
          protocol,
          localIp,
          remoteIp,
          port,
        };
      }
    });
  }
};
