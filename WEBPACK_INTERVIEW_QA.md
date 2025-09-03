# Webpack Interview Questions & Answers

## 🎯 Câu hỏi phỏng vấn Webpack - Senior Level

### 1. **Giải thích về Webpack và tại sao cần sử dụng nó?**

**Trả lời:**
Webpack là một module bundler hiện đại cho JavaScript. Nó giải quyết các vấn đề:

- **Module System**: Cho phép sử dụng ES6 modules, CommonJS, AMD
- **Asset Management**: Xử lý tất cả tài nguyên (JS, CSS, images, fonts)
- **Optimization**: Minification, tree shaking, code splitting
- **Development Experience**: Hot Module Replacement, source maps

**Ví dụ từ project:**
```javascript
// webpack.config.js
entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS  // Tách vendor libraries
}
```

### 2. **Entry vs Output trong Webpack?**

**Trả lời:**
- **Entry**: Điểm khởi đầu để webpack bắt đầu xây dựng dependency graph
- **Output**: Nơi webpack xuất các bundle đã được xử lý

**Ví dụ:**
```javascript
entry: {
    app: './src/index.js',
    vendor: ['react', 'react-dom']
},
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
}
```

### 3. **Loader vs Plugin - Sự khác biệt?**

**Trả lời:**
- **Loader**: Transform individual files (chạy trước khi bundle)
- **Plugin**: Hoạt động trên toàn bộ bundle (chạy sau khi bundle)

**Ví dụ từ project:**
```javascript
// Loader
{
    test: /\.js$/,
    use: 'babel-loader'  // Transform từng file JS
}

// Plugin
new HtmlWebpackPlugin({  // Tạo HTML file với script tags
    template: './src/index.html'
})
```

### 4. **Code Splitting và tại sao cần thiết?**

**Trả lời:**
Code splitting giúp tối ưu performance bằng cách chia nhỏ bundle:

**Lợi ích:**
- Giảm initial bundle size
- Tải code theo nhu cầu (lazy loading)
- Tối ưu caching

**Ví dụ:**
```javascript
// Dynamic import
const ProductList = React.lazy(() => import('./components/ProductList'));

// SplitChunks plugin
optimization: {
    splitChunks: {
        chunks: 'all',
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors'
            }
        }
    }
}
```

### 5. **Tree Shaking là gì và cách hoạt động?**

**Trả lời:**
Tree shaking loại bỏ dead code không sử dụng:

**Điều kiện:**
- Sử dụng ES6 modules (import/export)
- Mode production
- Cấu hình sideEffects trong package.json

**Ví dụ:**
```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const unusedFunction = () => console.log('unused');

// index.js
import { add } from './math';  // subtract và unusedFunction sẽ bị loại bỏ
```

### 6. **Webpack Dev Server vs Production Build?**

**Trả lời:**

**Dev Server:**
- In-memory compilation
- Hot Module Replacement
- Source maps
- No file output

**Production:**
- File output to disk
- Minification (TerserPlugin)
- Tree shaking
- Optimized bundles

### 7. **Cách tối ưu bundle size?**

**Trả lời:**
1. **Code Splitting**: Dynamic imports, SplitChunks
2. **Tree Shaking**: Loại bỏ unused code
3. **Minification**: TerserPlugin
4. **Compression**: Gzip/Brotli
5. **Lazy Loading**: React.lazy, Suspense
6. **Bundle Analysis**: webpack-bundle-analyzer

### 8. **Webpack 5 vs Webpack 4 - Những cải tiến?**

**Trả lời:**
**Webpack 5:**
- ✅ Module Federation
- ✅ Asset Modules (thay thế file-loader)
- ✅ Persistent Caching
- ✅ Tree Shaking improvements
- ✅ Better HMR

**Ví dụ Asset Modules:**
```javascript
// Webpack 4
{
    test: /\.(png|jpg)$/,
    use: ['file-loader']
}

// Webpack 5
{
    test: /\.(png|jpg)$/,
    type: 'asset/resource'
}
```

### 9. **Module Federation là gì?**

**Trả lời:**
Module Federation cho phép chia sẻ code giữa các ứng dụng độc lập:

**Use cases:**
- Micro-frontends
- Shared component libraries
- Runtime code sharing

**Ví dụ:**
```javascript
// Host app
new ModuleFederationPlugin({
    name: 'host',
    remotes: {
        remote: 'remote@http://localhost:3001/remoteEntry.js'
    }
})
```

### 10. **Cách debug webpack build issues?**

**Trả lời:**
1. **Bundle Analysis**: webpack-bundle-analyzer
2. **Source Maps**: devtool: 'source-map'
3. **Webpack Stats**: --profile --json
4. **Console Logs**: Check webpack output
5. **Performance**: webpack --progress

### 11. **Caching strategies trong Webpack?**

**Trả lời:**
1. **Content Hash**: `[name].[contenthash].js`
2. **Vendor Bundle**: Tách riêng node_modules
3. **Runtime Chunk**: Tách webpack runtime
4. **Persistent Caching**: Webpack 5 filesystem cache

### 12. **Webpack vs Vite/Rollup?**

**Trả lời:**

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

### 13. **Cách implement lazy loading?**

**Trả lời:**
```javascript
// React.lazy
const ProductList = React.lazy(() => import('./ProductList'));

// Webpack dynamic import
import('./utils/heavyModule').then(module => {
    // Use module
});

// Route-based splitting
const routes = [
    {
        path: '/products',
        component: React.lazy(() => import('./pages/ProductList'))
    }
];
```

### 14. **Performance optimization techniques?**

**Trả lời:**
1. **Bundle Splitting**: Chia nhỏ bundles
2. **Tree Shaking**: Loại bỏ dead code
3. **Minification**: Compress code
4. **Caching**: Content hash, vendor bundles
5. **Lazy Loading**: Load code theo nhu cầu
6. **Asset Optimization**: Compress images, fonts

### 15. **Common webpack issues và solutions?**

**Trả lời:**

**Bundle too large:**
- Sử dụng bundle analyzer
- Implement code splitting
- Tree shaking

**Slow builds:**
- Persistent caching
- Exclude node_modules
- Parallel processing

**HMR not working:**
- Check devServer configuration
- Verify file watching
- Check webpack mode

---

## 🎯 Tips cho phỏng vấn

1. **Hiểu sâu**: Không chỉ biết cách sử dụng mà cần hiểu nguyên lý hoạt động
2. **Thực hành**: Có thể demo live coding với webpack config
3. **Performance**: Biết cách đo và tối ưu performance
4. **Best Practices**: Tuân thủ webpack best practices
5. **Troubleshooting**: Biết cách debug và fix issues

---

*Chuẩn bị kỹ những câu hỏi này sẽ giúp bạn tự tin trong phỏng vấn senior Frontend!*
