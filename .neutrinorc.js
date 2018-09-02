module.exports = {
  use: [
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'rss-reader',
        },
      },
    ],
    '@neutrinojs/jest',
    ['@neutrinojs/copy', {
      patterns: [{
        context: './public',
        from: '**/*',
        to: 'dist/',
      }],
    }],
    ['@neutrinojs/style-loader', {
      test: /\.(css|sass|scss)$/,
      moduleTest: /\.module\.(css|sass|scss)$/,
      loaders: ['sass-loader'],
    }],
  ],
};
