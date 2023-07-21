export const getEnvVariable = (variableName: string) => {
  if (process.env[variableName]) {
    return process.env[variableName];
  }

  throw new Error(`${variableName} not found in ENV`);
};

export const getEnvVariableOptional = (variableName: string) => {
  if (process.env[variableName]) {
    return process.env[variableName];
  }
};
