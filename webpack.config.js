//TODO refactor it with es6
module.exports = {
    entry:  {
        app: './src/client.es6'
        ,
        vendor: [
            'babel-polyfill',
            'react',
            'react-dom',
            'react-router',
            'bootstrap'
        ]
    },
    output: {
        filename: '[name].js'
    }
    ,
    resolve: {
        /**
         * @see https://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions: ['', '.webpack.js', '.web.js', '.js', '.ts', '.es6'],
        modulesDirectories: ['node_modules', 'git_modules', 'modules']
    }
    ,
    module: {
        loaders: [
            {
                //TODO use .babelrc instead of query
                test: /\.es6$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
            ,
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                    ,
                    plugins: [
                        [
                            'transform-react-jsx'
                            ,
                            {
                                pragma: 'this.createElement'
                            }
                        ]
                    ]
                }
            }
        ]
    }
};