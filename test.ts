const testsContext = (require as any).context('./test', true, /\.spec\.ts$/);

testsContext.keys().forEach(testsContext);
