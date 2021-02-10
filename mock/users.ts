export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] },
  // GET 可忽略
  '/api/user': (req: any, res: any) => {
    setTimeout(() => {
      res.send({ id: 1, name: 'patrick' });
    }, 3000);
  },
  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req: any, res: any) => {
    console.log(req.body);
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send({ id: 1 });
  },
};
