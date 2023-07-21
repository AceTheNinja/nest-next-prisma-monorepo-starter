export const util = {
  isObject<T>(value: T): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  merge(
    target: Record<string, any>,
    source: Record<string, any>,
  ): Record<string, unknown> {
    Object.keys(source).forEach((key: string) => {
      if (this.isObject(target[key]) && this.isObject(source[key])) {
        Object.assign(source[key], this.merge(target[key], source[key]));
      }
    });

    return { ...target, ...source };
  },
};

const getEnvLoaderFile = (envFileName) => {
  switch (envFileName) {
    case '.env.local':
      return 'local';
    case '.env.development':
      return 'dev';
    case '.env.staging':
      return 'stg';
    case '.env.production':
      return 'prod';
  }
};

export const configuration = async (): Promise<Record<string, unknown>> => {
  const envLoader = getEnvLoaderFile(process.env.ENV_FILE);
  const environment = await import(`./${envLoader}`);
  const common = await import(`./common`);

  // object deep merge
  return util.merge(common.config, environment.config);
};
