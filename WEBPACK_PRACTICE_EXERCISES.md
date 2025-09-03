# Webpack Practice Exercises

## 🎯 Bài tập thực hành Webpack

### Bài tập 1: Code Splitting với Dynamic Imports

Tạo một component lazy loading trong React:

```javascript
// src/components/LazyComponent.js
import React from 'react';

const LazyComponent = () => {
    return (
        <div>
            <h2>This is a lazy loaded component</h2>
            <p>This component is loaded only when needed!</p>
        </div>
    );
};

export default LazyComponent;
```

```javascript
// src/components/App.js
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
    const [showLazy, setShowLazy] = React.useState(false);

    return (
        <div>
            <button onClick={() => setShowLazy(!showLazy)}>
                {showLazy ? 'Hide' : 'Show'} Lazy Component
            </button>
            
            {showLazy && (
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyComponent />
                </Suspense>
            )}
        </div>
    );
}
```

### Bài tập 2: Tối ưu hóa Bundle với Tree Shaking

Tạo một utility file với named exports:

```javascript
// src/utils/math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => a / b;

// Chỉ sử dụng một số function
export const unusedFunction = () => {
    console.log('This function is never used');
};
```

```javascript
// src/index.js
// Chỉ import những function cần thiết
import { add, multiply } from './utils/math';

console.log(add(5, 3)); // 8
console.log(multiply(4, 2)); // 8
// unusedFunction sẽ bị loại bỏ bởi tree shaking
```

### Bài tập 3: Cấu hình Source Maps

Thêm cấu hình source maps vào webpack:

```javascript
// webpack.config.js
module.exports = {
    // ... other config
    devtool: 'source-map', // Cho development
    // devtool: 'hidden-source-map', // Cho production
}
```

### Bài tập 4: Tối ưu hóa Images

Tạo một component sử dụng images với webpack:

```javascript
// src/components/ImageComponent.js
import React from 'react';
import testImage from '../test-image.png';

const ImageComponent = () => {
    return (
        <div>
            <h3>Image Optimization</h3>
            <img 
                src={testImage} 
                alt="Test Image"
                style={{ maxWidth: '300px' }}
            />
        </div>
    );
};

export default ImageComponent;
```

### Bài tập 5: CSS Modules

Tạo CSS module để tránh CSS conflicts:

```css
/* src/components/Button.module.css */
.button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.primary {
    background-color: #007bff;
    color: white;
}

.secondary {
    background-color: #6c757d;
    color: white;
}
```

```javascript
// src/components/Button.js
import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, variant = 'primary', ...props }) => {
    return (
        <button 
            className={`${styles.button} ${styles[variant]}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
```

Cập nhật webpack config để hỗ trợ CSS modules:

```javascript
{
    test: /\.css$/,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                modules: {
                    auto: true, // Chỉ áp dụng cho .module.css
                    localIdentName: '[name]__[local]--[hash:base64:5]'
                }
            }
        }
    ]
}
```

### Bài tập 6: Environment Variables

Tạo file .env và sử dụng trong webpack:

```bash
# .env
REACT_APP_API_URL=https://api.example.com
REACT_APP_ENV=development
```

```javascript
// webpack.config.js
const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

module.exports = {
    // ... other config
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(env)
        })
    ]
}
```

### Bài tập 7: Bundle Analysis

Cài đặt và sử dụng webpack-bundle-analyzer:

```bash
npm install --save-dev webpack-bundle-analyzer
```

```javascript
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // ... other config
    plugins: [
        // Chỉ sử dụng khi cần phân tích
        // new BundleAnalyzerPlugin()
    ]
}
```

Thêm script vào package.json:

```json
{
    "scripts": {
        "analyze": "webpack --config webpack.config.js --profile --json > stats.json && webpack-bundle-analyzer stats.json"
    }
}
```

### Bài tập 8: Performance Optimization

Tạo một component với heavy computation:

```javascript
// src/components/HeavyComponent.js
import React, { useMemo } from 'react';

const HeavyComponent = ({ data }) => {
    const processedData = useMemo(() => {
        // Simulate heavy computation
        return data.map(item => ({
            ...item,
            processed: item.value * 2,
            timestamp: Date.now()
        }));
    }, [data]);

    return (
        <div>
            <h3>Heavy Component</h3>
            <ul>
                {processedData.map((item, index) => (
                    <li key={index}>
                        {item.name}: {item.processed}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HeavyComponent;
```

### Bài tập 9: Webpack Dev Server với Proxy

Cấu hình proxy cho API calls:

```javascript
// webpack.config.js
module.exports = {
    // ... other config
    devServer: {
        // ... other devServer config
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
```

### Bài tập 10: Custom Loader

Tạo một custom loader để xử lý text files:

```javascript
// loaders/text-loader.js
module.exports = function(source) {
    const callback = this.async();
    
    // Transform the source
    const transformed = source
        .toUpperCase()
        .replace(/HELLO/g, 'HI');
    
    callback(null, `module.exports = ${JSON.stringify(transformed)}`);
};
```

Sử dụng trong webpack config:

```javascript
{
    test: /\.txt$/,
    use: path.resolve(__dirname, 'loaders/text-loader.js')
}
```

## 🎯 Câu hỏi thực hành

1. **Bundle Size**: Làm thế nào để giảm bundle size từ 2MB xuống 500KB?
2. **Build Time**: Tại sao build time tăng từ 30s lên 2 phút?
3. **HMR**: Tại sao Hot Module Replacement không hoạt động?
4. **Caching**: Làm thế nào để tối ưu caching cho production?
5. **Performance**: Cách phân tích và tối ưu performance của webpack build?

## 📊 Metrics để theo dõi

- **Bundle Size**: Tổng kích thước bundle
- **Build Time**: Thời gian build
- **Chunk Count**: Số lượng chunks được tạo
- **Cache Hit Rate**: Tỷ lệ cache hit
- **Tree Shaking Effectiveness**: Hiệu quả của tree shaking

---

*Hãy thực hành từng bài tập và quan sát kết quả để hiểu sâu hơn về webpack!*
