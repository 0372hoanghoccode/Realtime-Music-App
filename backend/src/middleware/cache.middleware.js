import NodeCache from 'node-cache';

// cache lưu trong 300s
const cache = new NodeCache({ stdTTL: 300 });

export const cacheMiddleware = (req, res, next) => {
  // qua cache cho request kp GET
  if (req.method !== 'GET') {
    return next();
  }

  // tạo khóa cache dựa trên đường dẫn và query params
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  // save response vào cache trước khi gửi về client
  const originalJson = res.json;
  res.json = function (body) {
    cache.set(key, body);
    return originalJson.call(this, body);
  };

  next();
};

// Middleware để xóa cache khi có thay đổi dữ liệu
export const clearCache = (pattern) => {
  return (req, res, next) => {
    // Thực thi các thao tác trước
    next();

    // Sau khi hoàn thành, xóa cache
    const keys = cache.keys();
    const matchedKeys = keys.filter(key => key.includes(pattern));
    matchedKeys.forEach(key => cache.del(key));
  };
};
