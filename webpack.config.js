 var webpack = require('webpack');
 var providePlugin = new webpack.ProvidePlugin( {$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'} );
     module.exports = {
	      entry:'./src/js/entry.js',
	      output:{
		      path:'./static/',
		      publicPath: './static/',
		      filename:'index.js'
	},
	 module:{
		    rules:[
           {test:/\.less$/,use:["less-loader","style-loader","css-loader"]},
           {
            test:/\.js$/,
            loader:"babel-loader",
            exclude:/node_modules/,
            query:{
              presets:[
                  require.resolve('babel-preset-es2015'),
                  require.resolve('babel-preset-react'),
                  require.resolve('babel-preset-stage-0'),
             ]
            }
          },
         {test:/.(jpg|png|gif|svg)$/,loader:'url-loader?limit=8192&name=./[name].[ext]'}
		]
  },
    devServer:{
      port:8080,
      historyApiFallback:true,
      inline:true,
   },
       plugins:[providePlugin]	        
    }