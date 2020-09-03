# 消息

## 数据定义

### 消息`Message`

| 属性名             | 数据类型       | 是否可选 | 描述                                                                                         |
| ------------------ | -------------- | -------- | -------------------------------------------------------------------------------------------- |
| `id`               | `snowflake`    | required | 消息 ID                                                                                      |
| `type`             | `number`       | required | 消息类型                                                                                     |
| `channel_id`       | `snowflake`    | required | 消息的频道 ID                                                                                |
| `guild_id`         | `snowflake`    | optional | 消息的群组 ID，如果是`null`则是私聊。\*现在后台推送数据结构需要优化，目前`null`会表示为`"0"` |
| `author`           | `User?`        | required | 消息的发送方，如果是`null`，则是系统消息                                                     |
| `member`           | `Member?`      | optional | 消息发送方的群组成员信息，如果是私聊则为`null`                                               |
| `content`          | `string?`      | required | 消息的内容                                                                                   |
| `nonce`            | `snowflake`    | required | 用于去重的字段                                                                               |
| `timestamp`        | `string`       | required | 消息的发送时间，ISO 8601 格式                                                                |
| `edited_timestamp` | `string?`      | required | 消息的修改时间，ISO 8601 格式                                                                |
| `pinned`           | `bool`         | required | 是否置顶                                                                                     |
| `attachments`      | `Attachment[]` | required | 消息附带的文件                                                                               |
| `mentions`         | `User[]`       | required | 消息提及的人                                                                                 |
| `reactions`        | `Reaction[]`   | required | 消息的反应                                                                                   |
| `stamp`            | `Stamp[]`      | required | 消息的表情                                                                                   |
| `reply`            | `Message[]`    | required | 消息的回复                                                                                   |

#### 消息附件`Attachment`

| 属性名     | 数据类型    | 是否可选 | 描述               |
| ---------- | ----------- | -------- | ------------------ |
| `id`       | `snowflake` | required | 消息附件 ID        |
| `filename` | `string`    | required | 附件文件名         |
| `hash`     | `string`    | required | 附件文件的 hash 值 |
| `width`    | `number`    | required | 附件图片的宽度     |
| `height`   | `number`    | required | 附件图片的高度     |
| `size`     | `number`    | required | 附件文件的大小     |
| `url`      | `string`    | required | 附件文件的链接     |

#### 消息反应`Reaction`

| 属性名  | 数据类型       | 是否可选 | 描述               |
| ------- | -------------- | -------- | ------------------ |
| `emoji` | `PartialEmoji` | required | Emoji 信息         |
| `count` | `number`       | required | 反应数量           |
| `me`    | `bool`         | required | 自己是否参与了反应 |

#### 消息反应 Emoji`PartialEmoji`

| 属性名 | 数据类型    | 是否可选 | 描述                                              |
| ------ | ----------- | -------- | ------------------------------------------------- |
| `id`   | `snowflake` | optional | 群组定义 Emoji 的 ID，如果是系统 Emoji，则没有 ID |
| `name` | `string`    | optional | Emoji 名称，或者系统 Emoji 的字符                 |

#### 消息表情`Stamp`

参见[表情数据定义](stamp#表情)

例如：

```json
{
  "id": "136769608232771584",
  "channel_id": "136412396142460928",
  "author": {
    "id": "77431520989548544",
    "username": "monoceros",
    "discriminator": "0990",
    "avatar": "5d3ca10119f069727fe3b6ddd0998296.png",
    "name": "monoceros",
    "avatar_url": "https://cdn.tomon.co/avatars/5d3ca10119f069727fe3b6ddd0998296.png",
    "type": 0
  },
  "type": 0,
  "content": null,
  "timestamp": "2020-06-12T09:53:35.660Z",
  "nonce": "136769607095721984",
  "attachments": [
    {
      "id": "136769608220188672",
      "filename": "CF18499C35C281BB7647B20E0D26AC25.jpg",
      "hash": "cf18499c35c281bb7647b20e0d26ac25",
      "type": "jpg",
      "size": 29503,
      "height": 466,
      "width": 454,
      "url": "https://cdn.tomon.co/attachments/cf18499c35c281bb7647b20e0d26ac25.jpg"
    }
  ],
  "reactions": [],
  "mentions": [],
  "stamps": [],
  "reply": [],
  "pinned": false,
  "edited_timestamp": null,
  "member": { "nick": "cat", "roles": ["136460205348659200"] }
}
```

## 消息

### 获取频道消息列表

<api method="GET" path="/channels/{channelId}/messages" />

获取频道消息列表，需要有查看历史消息权限。

#### Query 参数

| 属性名   | 数据类型     | 是否必要 | 描述                                                            |
| -------- | ------------ | -------- | --------------------------------------------------------------- |
| `before` | `snowflake?` | optional | 拉取指定消息 ID 之前的消息，如果是 null，则从最晚的消息开始拉取 |
| `after`  | `snowflake?` | optional | 拉取指定消息 ID 之后的消息，如果是 null，则从最早的消息开始拉取 |
| `around` | `snowflake`  | optional | 拉取指定消息 ID 附近的消息                                      |
| `limit`  | `number`     | optional | 拉取的数量，1-100 条，默认 50 条                                |

#### 响应

HTTP 状态码：<httpstatus code="200" />

```json
[
  {
    "id": "136460577878351872",
    "channel_id": "136412396142460928",
    "author": {
      "id": "77431520989548544",
      "username": "monoceros",
      "discriminator": "0990",
      "avatar": "5d3ca10119f069727fe3b6ddd0998296.png",
      "name": "monoceros",
      "avatar_url": "https://cdn.tomon.co/avatars/5d3ca10119f069727fe3b6ddd0998296.png",
      "type": 0
    },
    "type": 0,
    "content": "wwerwr",
    "timestamp": "2020-06-11T13:25:37.081Z",
    "nonce": "136460577659854848",
    "attachments": [],
    "reactions": [
      { "emoji": { "name": "🙄" }, "count": 1, "me": true },
      { "emoji": { "name": "🤢" }, "count": 1, "me": true }
    ],
    "mentions": [],
    "stamps": [],
    "pinned": false,
    "edited_timestamp": null
  },
  {
    "id": "136460582265589760",
    "channel_id": "136412396142460928",
    "author": {
      "id": "77431520989548544",
      "username": "monoceros",
      "discriminator": "0990",
      "avatar": "5d3ca10119f069727fe3b6ddd0998296.png",
      "name": "monoceros",
      "avatar_url": "https://cdn.tomon.co/avatars/5d3ca10119f069727fe3b6ddd0998296.png",
      "type": 0
    },
    "type": 0,
    "content": "234234",
    "timestamp": "2020-06-11T13:25:38.127Z",
    "nonce": "136460582063874048",
    "attachments": [],
    "reactions": [],
    "mentions": [],
    "stamps": [],
    "pinned": false,
    "edited_timestamp": null
  }
]
```

### 获取频道单条消息

<api method="GET" path="/channels/{channelId}/messages/{messageId}" />

获取频道内的一条消息，需要有查看历史消息权限。

#### 响应

HTTP 状态码：<httpstatus code="200" />

```json
{
  "id": "136460582265589760",
  "channel_id": "136412396142460928",
  "author": {
    "id": "77431520989548544",
    "username": "monoceros",
    "discriminator": "0990",
    "avatar": "5d3ca10119f069727fe3b6ddd0998296.png",
    "name": "monoceros",
    "avatar_url": "https://cdn.tomon.co/avatars/5d3ca10119f069727fe3b6ddd0998296.png",
    "type": 0
  },
  "type": 0,
  "content": "234234",
  "timestamp": "2020-06-11T13:25:38.127Z",
  "nonce": "136460582063874048",
  "attachments": [],
  "reactions": [],
  "mentions": [],
  "stamps": [],
  "pinned": false,
  "edited_timestamp": null
}
```

### 发送消息

<api method="POST" path="/channels/{channelId}/messages" />

发送消息，支持发送文件（图片）。发送后 websocket 仍然会收到此条发送的消息，需要客户端根据`nonce`字段去重。

#### JSON 参数

支持`application/json`和`multipart/form-data`。multipart 支持文件发送，但是其他部分放到`payload_json`字段。
`content`可以包含 emoji、提及。

| 属性名    | 数据类型    | 是否必要 | 描述         |
| --------- | ----------- | -------- | ------------ |
| `content` | `string`    | optional | 消息内容     |
| `nonce`   | `snowflake` | required | 用于去重的值 |

例如：

```json
{ "content": "你好", "nonce": "136769231630016512" }
```

如果是 multipart：

| 属性名         | 数据类型 | 是否必要 | 描述           |
| -------------- | -------- | -------- | -------------- |
| `payload_json` | `string` | optional | 消息的其他字段 |
| `files`        | `File[]` | optional | 上传的文件     |

#### 响应

HTTP 状态码：<httpstatus code="200" />

```json
{
  "id": "136769608232771584",
  "channel_id": "136412396142460928",
  "author": {
    "id": "77431520989548544",
    "username": "monoceros",
    "discriminator": "0990",
    "avatar": "5d3ca10119f069727fe3b6ddd0998296.png",
    "name": "monoceros",
    "avatar_url": "https://cdn.tomon.co/avatars/5d3ca10119f069727fe3b6ddd0998296.png",
    "type": 0
  },
  "type": 0,
  "content": null,
  "timestamp": "2020-06-12T09:53:35.660Z",
  "nonce": "136769607095721984",
  "attachments": [
    {
      "id": "136769608220188672",
      "filename": "CF18499C35C281BB7647B20E0D26AC25.jpg",
      "hash": "cf18499c35c281bb7647b20e0d26ac25",
      "type": "jpg",
      "size": 29503,
      "height": 466,
      "width": 454,
      "url": "https://cdn.tomon.co/attachments/cf18499c35c281bb7647b20e0d26ac25.jpg"
    }
  ],
  "reactions": [],
  "mentions": [],
  "stamps": [],
  "pinned": false,
  "edited_timestamp": null,
  "member": { "nick": "cat", "roles": ["136460205348659200"] }
}
```

### 修改消息

<api method="PATCH" path="/channels/{channelId}/messages/{messageId}" />

修改消息，只能修改自己发送的消息

#### JSON 参数

| 属性名    | 数据类型 | 是否必要 | 描述     |
| --------- | -------- | -------- | -------- |
| `content` | `string` | optional | 消息内容 |

#### 响应

HTTP 状态码：<httpstatus code="200" />

```json
{
  "id": "136460582265589760",
  "channel_id": "136412396142460928",
  "author": {
    "id": "77431520989548544",
    "username": "monoceros",
    "discriminator": "0990",
    "avatar": "5d3ca10119f069727fe3b6ddd0998296.png",
    "name": "monoceros",
    "avatar_url": "https://cdn.tomon.co/avatars/5d3ca10119f069727fe3b6ddd0998296.png",
    "type": 0
  },
  "type": 0,
  "content": "abcdefg",
  "timestamp": "2020-06-11T13:25:38.127Z",
  "nonce": "136460582063874048",
  "attachments": [],
  "reactions": [],
  "mentions": [],
  "stamps": [],
  "pinned": false,
  "edited_timestamp": "2020-06-12T09:56:05.431Z"
}
```

### 删除消息

<api method="DELETE" path="/channels/{channelId}/messages/{messageId}" />

删除消息，可以删除自己的消息，如果有消息管理权限，可以删除其他人的消息。

#### 响应

HTTP 状态码：<httpstatus code="204" />

---

## 消息反应

### 添加反应

<api method="PUT" path="/channels/{channelId}/messages/{messageId}/reactions/{emojiId}/@me" />

给消息添加反应。如果是群组自定义 Emoji，则`emojiId`填写`name:id`，如果是系统 Emoji，则`emojiId`填写 Emoji 字符

#### 响应

HTTP 状态码：<httpstatus code="204" />

### 删除反应

<api method="DELETE" path="/channels/{channelId}/messages/{messageId}/reactions/{emojiId}/@me" />

删除消息的反应。

#### 响应

HTTP 状态码：<httpstatus code="204" />

### 删除用户的反应

<api method="DELETE" path="/channels/{channelId}/messages/{messageId}/reactions/{emojiId}/{userId}" />

删除指定用户的反应。需要有管理消息的权限。

#### 响应

HTTP 状态码：<httpstatus code="204" />

### 获取添加反应的用户列表

<api method="GET" path="/channels/{channelId}/messages/{messageId}/reactions/{emojiId}" />

获取添加反应的用户列表。

#### Query 参数

| 属性名   | 数据类型     | 是否必要 | 描述                                                          |
| -------- | ------------ | -------- | ------------------------------------------------------------- |
| `before` | `snowflake?` | optional | 拉取指定用户 ID 之前的反应，如果是 null，则从最晚的人开始拉取 |
| `after`  | `snowflake?` | optional | 拉取指定用户 ID 之后的反应，如果是 null，则从最早的人开始拉取 |
| `limit`  | `number`     | optional | 拉取的数量，1-100 条，默认 50 条                              |

#### 响应

HTTP 状态码：<httpstatus code="200" />

```json
[
  {
    "user": {
      "id": "77431520989548544",
      "username": "monoceros",
      "discriminator": "0990",
      "avatar": "5d3ca10119f069727fe3b6ddd0998296.png",
      "name": "monoceros",
      "avatar_url": "https://cdn.tomon.co/avatars/5d3ca10119f069727fe3b6ddd0998296.png",
      "type": 0
    },
    "createdAt": "2020-06-11T13:25:44.784Z"
  }
]
```

### 清除反应

<api method="DELETE" path="/channels/{channelId}/messages/{messageId}/reactions/{emojiId}" />

清除某个反应

#### 响应

HTTP 状态码：<httpstatus code="204" />

---

## 消息置顶

### 获取所有置顶消息

<api method="GET" path="/channels/{channelId}/pins" />

获取所有置顶消息

#### Query 参数

| 属性名   | 数据类型     | 是否必要 | 描述                                                            |
| -------- | ------------ | -------- | --------------------------------------------------------------- |
| `before` | `snowflake?` | optional | 拉取指定消息 ID 之前的消息，如果是 null，则从最晚的消息开始拉取 |
| `after`  | `snowflake?` | optional | 拉取指定消息 ID 之后的消息，如果是 null，则从最早的消息开始拉取 |
| `limit`  | `number`     | optional | 拉取的数量，1-100 条，默认 50 条                                |

#### 响应

HTTP 状态码：<httpstatus code="200" />

```json
[
  {
    "id": "136460577878351872",
    "channel_id": "136412396142460928",
    "author": {
      "id": "77431520989548544",
      "username": "monoceros",
      "discriminator": "0990",
      "avatar": "5d3ca10119f069727fe3b6ddd0998296.png",
      "name": "monoceros",
      "avatar_url": "https://cdn.tomon.co/avatars/5d3ca10119f069727fe3b6ddd0998296.png",
      "type": 0
    },
    "type": 0,
    "content": "wwerwr",
    "timestamp": "2020-06-11T13:25:37.081Z",
    "nonce": "136460577659854848",
    "attachments": [],
    "reactions": [
      { "emoji": { "name": "🙄" }, "count": 1, "me": true },
      { "emoji": { "name": "🤢" }, "count": 1, "me": true },
      { "emoji": { "id": "78344528964096000" }, "count": 1, "me": true }
    ],
    "mentions": [],
    "stamps": [],
    "pinned": true,
    "edited_timestamp": null
  }
]
```

### 添加置顶消息

<api method="PUT" path="/channels/{channelId}/pins/{messageId}" />

添加置顶消息

#### 响应

HTTP 状态码：<httpstatus code="204" />

### 删除置顶消息

<api method="DELETE" path="/channels/{channelId}/pins/{messageId}" />

删除置顶消息

#### 响应

HTTP 状态码：<httpstatus code="204" />

---

## 消息转发

### 转发消息

（API 与发送消息相同）

| 属性名            | 数据类型      | 是否必要 | 描述                               |
| ----------------- | ------------- | -------- | ---------------------------------- |
| `forward_channel` | `snowflake`   | required | 需要转发的原消息频道 ID            |
| `forwards`        | `snowflake[]` | required | 需要转发的消息 ID（对应此频道 ID） |

#### 请求范例

```json
{
  "content": "转发消息",
  "nonce": "6664377663014215680",
  "forward_channel": "132700825301630976",
  "forwards": [
    "141138732647452672",
    "141138749076541440",
    "141138787882242048",
    "141142683665043457",
    "142500951998074880"
  ]
}
```

#### 返回

参考 [转发数据定义](forward#数据定义)
