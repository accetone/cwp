module.exports = {
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['stage-2', 'es2015', 'react']
            }
        }]
    },
    entry: ['babel-polyfill', './app/index.js'],
    output: {
        filename: 'bundle.js',
    }
};