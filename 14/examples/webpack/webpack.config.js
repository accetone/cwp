module.exports = {
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    entry: './app/index.js',
    output: {
        filename: 'bundle.js',
        path: './'
    }
};