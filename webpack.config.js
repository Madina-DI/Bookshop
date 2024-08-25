const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
        port:8080,
		client: {
			logging: 'info', 
			overlay: true,   
			progress: true,   
		},
        open: true,
	},
    module: {
        rules: [
        {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, 
                'css-loader', 
                'sass-loader',
            ],
        },
        {
            test: /\.pug$/,
            loader: 'pug-loader',
        }, 
    ],
},
plugins: [new MiniCssExtractPlugin(), 
          new HtmlWebpackPlugin({
        template: './src/index.pug',
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: 'src/img', to: 'img' },
            ],
        }),
    ],
    optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin()],
	},
};
