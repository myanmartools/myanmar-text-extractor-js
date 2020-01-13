const path = require('path');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'inline-source-map',
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
                test: /\.(jsx?|tsx?)$/,
                loader: 'istanbul-instrumenter-loader',
                options: {
                    esModules: true
                },
                include: path.resolve(__dirname, 'src'),
                exclude: [
                    /\.(e2e|spec)\.tsx?$/,
                    /node_modules/
                ]
            }
        ]
    }
};
