declare module 'eslint-plugin-jsx-a11y' {
  interface Plugin {
    flatConfigs: {
      recommended: object;
    };
  }
  const plugin: Plugin;
  export = plugin;
}