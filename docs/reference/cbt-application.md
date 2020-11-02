# 申请激活码

申请激活码需要已登录且未激活的用户。

## 申请

<Api method="POST" path="/users/@me/cbt-application" />

提交激活码申请

| 属性名    | 数据类型   | 是否可选 | 描述                   |
| --------- | ---------- | -------- | ---------------------- |
| `userId`  | `string`   | required | 已登录用户的 ID        |
| `email`   | `string`   | required | 用来获得激活码的 email |
| `source`  | `string[]` | required | 知悉 Tomon 的来源　    |
| `comment` | `string`   | optional | 还有什么想说的         |

#### 范例

```json
{
  "userId": "100000000000000004",
  "email": "test@example.com",
  "source": ["微博"],
  "comment": ""
}
```

#### 返回

- <HttpStatus code="200" />
