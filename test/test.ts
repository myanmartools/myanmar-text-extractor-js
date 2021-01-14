declare const require: {
    context(
        path: string,
        deep?: boolean,
        filter?: RegExp
    ): {
        keys(): string[];
        <T>(id: string): T;
    };
};

const testsContext = (require as any).context('.', true, /\.spec\.ts$/);

testsContext.keys().forEach(testsContext);
