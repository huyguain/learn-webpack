# Webpack Interview Preparation - Senior Frontend

## 📋 Tổng quan về Webpack

Webpack là một module bundler hiện đại cho JavaScript. Nó có thể xử lý tất cả các tài nguyên của ứng dụng (JS, CSS, images, fonts, etc.) và biến chúng thành các bundle tối ưu.

## 🎯 Các khái niệm cốt lõi

### 1. Entry Point
```javascript
entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
}
```
- **Định nghĩa**: Điểm khởi đầu để webpack bắt đầu xây dựng dependency graph
- **Multiple Entry**: Cho phép tạo nhiều bundle riêng biệt
- **Vendor Bundle**: Tách riêng thư viện bên thứ 3 để tối ưu caching

### 2. Output
```javascript
output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
}
```
- **Content Hash**: Tạo hash dựa trên nội dung file để cache busting
- **Dynamic Naming**: `[name]`, `[contenthash]`, `[chunkhash]`

### 3. Loaders
```javascript
module: {
    rules: [
        {
            test: /\.js$/,
            use: 'babel-loader',
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: ['file-loader'],
        }
    ]
}
```

**Các loại loader quan trọng:**
- **babel-loader**: Transpile ES6+ về ES5
- **css-loader**: Parse CSS và resolve imports
- **style-loader**: Inject CSS vào DOM
- **file-loader**: Emit file và return public URL
- **url-loader**: Tương tự file-loader nhưng có thể inline small files

### 4. Plugins
```javascript
plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].css'
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: true
    })
]
```

**Các plugin quan trọng:**
- **HtmlWebpackPlugin**: Tự động tạo HTML file với script tags
- **MiniCssExtractPlugin**: Extract CSS thành file riêng
- **ProvidePlugin**: Tự động import modules khi được sử dụng
- **TerserPlugin**: Minify JavaScript (production)

## 🚀 Code Splitting & Optimization

### 1. SplitChunks Plugin
```javascript
optimization: {
    splitChunks: {
        chunks: 'all',
        cacheGroups: {
            nodeModules: {
                test: /[\\/]node_modules[\\/]/,
                name: 'nodeModules',
                chunks: 'all',
                priority: 10
            },
            common: {
                name: 'common',
                minChunks: 2,
                chunks: 'all',
                priority: 5
            }
        }
    }
}
```

**Lợi ích:**
- Tách vendor libraries thành bundle riêng
- Tạo common chunks cho code được chia sẻ
- Tối ưu caching và loading performance

### 2. Dynamic Imports
```javascript
// Lazy loading components
const ProductList = React.lazy(() => import('./components/ProductList'));
const ProductAction = React.lazy(() => import('./components/ProductAction'));
```

## 🔧 Development vs Production

### Development Mode
```javascript
mode: 'development',
devServer: {
    static: {
        directory: path.join(__dirname, 'build'),
    },
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    compress: true,
}
```

### Production Mode
```javascript
mode: 'production',
optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
}
```

## 📊 Performance Optimization

### 1. Bundle Analysis
```bash
npm install --save-dev webpack-bundle-analyzer
```

### 2. Tree Shaking
- Loại bỏ dead code không sử dụng
- Hoạt động tốt với ES6 modules
- Cần cấu hình sideEffects trong package.json

### 3. Caching Strategies
- Content hash cho cache busting
- Vendor bundle tách riêng
- Runtime chunk cho webpack runtime

## 🎯 Câu hỏi phỏng vấn thường gặp

### 1. Webpack vs Vite/Rollup?
**Webpack:**
- ✅ Mature ecosystem
- ✅ Extensive plugin system
- ✅ Good for complex applications
- ❌ Slower development server
- ❌ Complex configuration

**Vite:**
- ✅ Fast HMR
- ✅ Simple configuration
- ✅ Native ES modules
- ❌ Newer ecosystem
- ❌ Less mature for complex builds

### 2. Làm thế nào để tối ưu bundle size?
1. **Code Splitting**: Dynamic imports, SplitChunks
2. **Tree Shaking**: Loại bỏ unused code
3. **Minification**: TerserPlugin
4. **Compression**: Gzip/Brotli
5. **Lazy Loading**: React.lazy, Suspense

### 3. Webpack Dev Server vs Production Build?
**Dev Server:**
- In-memory compilation
- Hot Module Replacement
- Source maps
- No file output

**Production:**
- File output to disk
- Minification
- Tree shaking
- Optimized bundles

### 4. Loader vs Plugin?
**Loader:**
- Transform individual files
- Chạy trước khi bundle
- Ví dụ: babel-loader, css-loader

**Plugin:**
- Hoạt động trên toàn bộ bundle
- Chạy sau khi bundle
- Ví dụ: HtmlWebpackPlugin, MiniCssExtractPlugin

### 5. Webpack 5 vs Webpack 4?
**Webpack 5:**
- ✅ Module Federation
- ✅ Asset Modules (thay thế file-loader)
- ✅ Persistent Caching
- ✅ Tree Shaking improvements
- ✅ Better HMR

## 🔍 Advanced Topics

### 1. Module Federation
```javascript
// Host application
new ModuleFederationPlugin({
    name: 'host',
    remotes: {
        remote: 'remote@http://localhost:3001/remoteEntry.js',
    },
})
```

### 2. Asset Modules
```javascript
{
    test: /\.(png|jpg|gif|svg)$/,
    type: 'asset/resource' // Thay thế file-loader
}
```

### 3. Persistent Caching
```javascript
cache: {
    type: 'filesystem',
    buildDependencies: {
        config: [__filename],
    },
}
```

## 📝 Best Practices

1. **Sử dụng content hash** cho cache busting
2. **Tách vendor bundle** để tối ưu caching
3. **Sử dụng tree shaking** để giảm bundle size
4. **Cấu hình source maps** phù hợp cho dev/prod
5. **Sử dụng webpack-bundle-analyzer** để phân tích bundle
6. **Implement code splitting** cho lazy loading
7. **Tối ưu loader configuration** (exclude node_modules)

## 🛠️ Troubleshooting

### Common Issues:
1. **Bundle too large**: Sử dụng bundle analyzer, code splitting
2. **Slow builds**: Persistent caching, exclude node_modules
3. **HMR not working**: Check devServer configuration
4. **CSS not loading**: Check loader order, MiniCssExtractPlugin

---

*Tài liệu này dựa trên project webpack hiện tại của bạn. Hãy thực hành với các cấu hình và thử nghiệm các tính năng để hiểu sâu hơn!*
