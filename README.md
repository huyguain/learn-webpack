# Learn Webpack - Senior Frontend Interview Preparation

## 📚 Tổng quan

Project này được thiết kế để ôn tập và thực hành Webpack cho phỏng vấn Senior Frontend Developer. Bao gồm:

- ✅ Cấu hình Webpack hoàn chỉnh (Development & Production)
- ✅ Code splitting và optimization
- ✅ Tree shaking và bundle analysis
- ✅ Tài liệu ôn tập chi tiết
- ✅ Bài tập thực hành
- ✅ Câu hỏi phỏng vấn và đáp án

## 🚀 Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run serve

# Build cho development
npm run build

# Build cho production
npm run build:prod

# Phân tích bundle
npm run analyze

# Tạo bundle report
npm run bundle-report
```

## 📁 Cấu trúc project

```
learn-webpack/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── reducers/          # Redux reducers
│   ├── actions/           # Redux actions
│   ├── utils/             # Utility functions
│   └── index.js           # Entry point
├── webpack.config.js       # Development config
├── webpack.prod.config.js  # Production config
├── package.json           # Dependencies & scripts
└── README.md              # This file
```

## 📖 Tài liệu ôn tập

### 1. [WEBPACK_INTERVIEW_PREP.md](./WEBPACK_INTERVIEW_PREP.md)
Tài liệu tổng hợp các khái niệm cốt lõi về Webpack:
- Entry & Output
- Loaders & Plugins
- Code Splitting
- Performance Optimization
- Development vs Production

### 2. [WEBPACK_PRACTICE_EXERCISES.md](./WEBPACK_PRACTICE_EXERCISES.md)
Bài tập thực hành với các ví dụ cụ thể:
- Code Splitting với Dynamic Imports
- Tree Shaking
- CSS Modules
- Bundle Analysis
- Performance Optimization

### 3. [WEBPACK_INTERVIEW_QA.md](./WEBPACK_INTERVIEW_QA.md)
Câu hỏi phỏng vấn thường gặp với đáp án chi tiết:
- 15 câu hỏi senior level
- Giải thích chi tiết
- Ví dụ thực tế
- Best practices

## 🎯 Các tính năng Webpack được implement

### 1. Multiple Entry Points
```javascript
entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
}
```

### 2. Code Splitting
```javascript
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

### 3. Asset Management
- CSS processing với MiniCssExtractPlugin
- Image handling với file-loader
- Font handling

### 4. Development Tools
- Hot Module Replacement
- Source maps
- Dev server với proxy

### 5. Production Optimization
- Minification với TerserPlugin
- CSS minification
- Tree shaking
- Content hashing

## 🔧 Scripts có sẵn

| Script | Mô tả |
|--------|-------|
| `npm run serve` | Chạy development server |
| `npm run build` | Build cho development |
| `npm run build:prod` | Build cho production |
| `npm run analyze` | Phân tích bundle size |
| `npm run bundle-report` | Tạo detailed bundle report |
| `npm run clean` | Xóa thư mục build |

## 📊 Bundle Analysis

Để phân tích bundle size và dependencies:

```bash
npm run analyze
```

Hoặc tạo detailed report:

```bash
npm run bundle-report
```

## 🎯 Các khái niệm quan trọng cần nắm

### 1. Module Bundling
- Hiểu cách webpack xây dựng dependency graph
- Entry points và output configuration
- Module resolution

### 2. Loaders & Plugins
- Sự khác biệt giữa loader và plugin
- Cách hoạt động của babel-loader, css-loader
- Custom loader development

### 3. Code Splitting
- Dynamic imports
- SplitChunks plugin
- Lazy loading với React.lazy

### 4. Performance Optimization
- Tree shaking
- Bundle size optimization
- Caching strategies
- Minification

### 5. Development Experience
- Hot Module Replacement
- Source maps
- Dev server configuration

## 🚀 Tips cho phỏng vấn

1. **Thực hành**: Chạy và thử nghiệm với các cấu hình webpack
2. **Hiểu sâu**: Không chỉ biết cách sử dụng mà cần hiểu nguyên lý
3. **Performance**: Biết cách đo và tối ưu performance
4. **Troubleshooting**: Có thể debug và fix issues
5. **Best Practices**: Tuân thủ webpack best practices

## 📚 Tài liệu tham khảo

- [Webpack Official Documentation](https://webpack.js.org/)
- [Webpack 5 Migration Guide](https://webpack.js.org/migrate/5/)
- [Webpack Performance](https://webpack.js.org/guides/build-performance/)
- [Code Splitting](https://webpack.js.org/guides/code-splitting/)

---

*Project này giúp bạn chuẩn bị tốt cho phỏng vấn Senior Frontend với kiến thức Webpack sâu rộng!*
