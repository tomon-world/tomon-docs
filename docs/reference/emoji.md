# 表情符号

## 数据定义

| 属性名     | 数据类型     | 是否可选 | 描述                          |
| ---------- | ------------ | -------- | ----------------------------- |
| `id`       | `snowflake`  | required | Emoji ID                      |
| `guild_id` | `snowflake?` | required | 群组 ID。                     |
| `name`     | `string`     | required | Emoji 名字                    |
| `img`      | `string`     | required | Emoji 图片                    |
| `img_url`  | `string`     | required | Emoji 图片链接（过时）        |
| `user`     | `User`       | required | 用户[数据结构](user#数据定义) |
| `managed`  | -            | -        |                               |
| `animated` | -            | -        | 是否为动图                    |

## 表情操作

### 列出群组 Emoji

<Api method="GET" path="/guilds/{guildId}/emojis" />

列出群组内现在使用的 Emoji

#### 返回

- <HttpStatus code="200" />

```json
[
  {
    "id": "138989862392172544",
    "guild_id": "138989862123456789",
    "name": "mmtest",
    "img": "138989862392172544.png",
    "img_url": "https://cdn.tomon.co/emojis/138989862392172544.png",
    "user": {
      "id": "138000000123456789",
      "username": "tomon",
      "discriminator": "0001",
      "avatar": null,
      "name": "tomon",
      "avatar_url": null,
      "created_at": "2020-06-01T04:23:59.891Z",
      "updated_at": "2020-06-01T04:24:40.027Z",
      "type": 0
    },
    "managed": null,
    "animated": null
  }
]
```

### 取出一个 Emoji

<Api method="GET" path="/guilds/{guildId}/emojis/{emojiId}" />

取出群组内的一个 Emoji 的相关信息

#### 返回

- <HttpStatus code="200" />

```json
{
  "id": "138989862392172544",
  "guild_id": "138989862123456789",
  "name": "mmtest",
  "img": "138989862392172544.png",
  "img_url": "https://cdn.tomon.co/emojis/138989862392172544.png",
  "user": {
    "id": "138000000123456789",
    "username": "tomon",
    "discriminator": "0001",
    "avatar": null,
    "name": "tomon",
    "avatar_url": null,
    "created_at": "2020-06-01T04:23:59.891Z",
    "updated_at": "2020-06-01T04:24:40.027Z",
    "type": 0
  },
  "managed": null,
  "animated": null
}
```

### 添加 Emoji

<Api method="POST" path="/guilds/{guildId}/emojis" />

向指定的群组内添加一个 Emoji

| 属性名  | 数据类型 | 是否可选 | 描述                         |
| ------- | -------- | -------- | ---------------------------- |
| `name`  | `string` | required | Emoji 的名称                 |
| `image` | `string` | required | Emoji 图像的`base64`二进制流 |

#### 范例

```json
{
  "name": "mmtest",
  "image": "data:image/png;base64,iVBORw0KGgoAAAAN...."
}
```

#### 返回

- <HttpStatus code="200" />

参见[数据定义](#数据定义)

### 更新 Emoji

<Api method="PATCH" path="/guilds/{guildId}/emojis/{emojiId}" />

更新一个 Emoji 的名称

#### 范例

```json
{
  "name": "tomon"
}
```

#### 返回

- <HttpStatus code="200" />

参见[数据定义](#数据定义)

### 移除 Emoji

<Api method="DELETE" path="/guilds/{guildId}/emojis/{emojiId}" />

移除一个指定的 Emoji

#### 返回

- <HttpStatus code="204" /> 无内容
