# AboutPage API 数据格式规范

## API 端点
```
GET https://rambot.ai-mindflicker.com/api/user-info
```

## 请求头
```
Content-Type: application/json
```

## 响应格式

### 成功响应 (200)
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "张三",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "我是一名充满热情的全栈开发者，热爱创造美观直观的用户体验。这个聊天应用展示了现代Web开发技术，专注于简洁的设计和流畅的交互。",
    "skills": [
      "React",
      "TypeScript", 
      "Tailwind CSS",
      "Node.js",
      "UI/UX 设计"
    ],
    "contact": {
      "email": "hello@example.com",
      "github": "https://github.com/username"
    },
    "funFacts": [
      "热爱极简主义设计",
      "咖啡爱好者 ☕",
      "持续学习新技术"
    ],
    "additionalInfo": {
      "location": "北京",
      "website": "https://example.com",
      "linkedin": "https://linkedin.com/in/username",
      "twitter": "https://twitter.com/username"
    }
  },
  "message": "用户信息获取成功"
}
```

### 错误响应 (400/500)
```json
{
  "success": false,
  "data": null,
  "message": "用户信息获取失败"
}
```

## 字段说明

### 必需字段
- `id`: 用户唯一标识符 (string)
- `name`: 用户姓名 (string)
- `bio`: 用户简介 (string)
- `skills`: 技能列表 (string[])
- `contact.email`: 邮箱地址 (string)
- `contact.github`: GitHub链接 (string)
- `funFacts`: 有趣事实列表 (string[])

### 可选字段
- `avatar`: 头像图片URL (string)
- `additionalInfo.location`: 所在地 (string)
- `additionalInfo.website`: 个人网站 (string)
- `additionalInfo.linkedin`: LinkedIn链接 (string)
- `additionalInfo.twitter`: Twitter链接 (string)

## 注意事项

1. 所有URL字段应该包含完整的协议前缀 (https://)
2. 邮箱地址应该包含@符号
3. 技能和有趣事实数组可以为空，但不应为null
4. 头像URL如果提供，应该指向可访问的图片资源
5. 响应应该使用UTF-8编码以支持中文内容
6. 建议添加适当的缓存头以提高性能

## 示例实现

### Node.js/Express 示例
```javascript
app.get('/api/user-info', (req, res) => {
  try {
    const userInfo = {
      id: "user_123",
      name: "张三",
      avatar: "https://example.com/avatar.jpg",
      bio: "我是一名充满热情的全栈开发者...",
      skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "UI/UX 设计"],
      contact: {
        email: "hello@example.com",
        github: "https://github.com/username"
      },
      funFacts: [
        "热爱极简主义设计",
        "咖啡爱好者 ☕", 
        "持续学习新技术"
      ],
      additionalInfo: {
        location: "北京",
        website: "https://example.com"
      }
    };

    res.json({
      success: true,
      data: userInfo,
      message: "用户信息获取成功"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "服务器内部错误"
    });
  }
});
```
