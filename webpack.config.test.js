const path = require('path');

module.exports = function () {
    return {
        devtool: 'inline-source-map',
        mode: 'development',
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'source-map-loader'
                },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, 'tsconfig-test.json')
                    }
                },
                {
                    enforce: 'post',
                    test: /\.(js|ts)$/,
                    loader: 'istanbul-instrumenter-loader',
                    options: {
                        esModules: true
                    },
                    include: path.resolve(__dirname, 'src'),
                    exclude: /\.(e2e|spec)\.ts$|node_modules/
                }
            ]
        },
        performance: {
            hints: false
        },
        node: {
            global: true,
            process: false,
            crypto: 'empty',
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
};
