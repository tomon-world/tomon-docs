# 邀请

## 数据定义

### 邀请`invite`

目前群组邀请是基于频道的。

| 属性名     | 数据类型         | 是否可选 | 描述                             |
| ---------- | ---------------- | -------- | -------------------------------- |
| `code`     | `string`         | required | 邀请码                           |
| `guild`    | `PartialGuild`   | required | 邀请的群组，只含有名称和图标信息 |
| `channel`  | `PartialChannel` | required | 邀请的频道，只含有频道名称和类型 |
| `inviter`  | `User`           | required | 邀请者                           |
| `uses`     | `number`         | required | 使用的次数                       |
| `max_age`  | `number`         | required | 有效时长，0 是永久有效           |
| `max_uses` | `number`         | required | 最多使用的次数，0 是无次数限制   |

例如：

```json
{
  "code": "N4Kbi9",
  "guild": {
    "id": "136412396083740672",
    "name": "bears🍻",
    "member_count": 1,
    "icon": "f3ae596c9234d1b5a14c5a1658a55331.png",
    "icon_url": "https://cdn.tomon.co/icons/f3ae596c9234d1b5a14c5a1658a55331.png"
  },
  "channel": { "id": "136412396142460928", "name": "庆祝", "type": 0 },
  "inviter": {
    "id": "77431520989548544",
    "username": "monoceros",
    "discriminator": "0990",
    "avatar": "5d3ca10119f069727fe3b6ddd0998296.png",
    "name": "monoceros",
    "avatar_url": "https://cdn.tomon.co/avatars/5d3ca10119f069727fe3b6ddd0998296.png",
    "type": 0
  },
  "uses": 0,
  "created_at": "2020-06-12T11:02:52.723Z",
  "max_age": 86400,
  "max_uses": 0,
  "temporary": false
}
```

## 邀请管理

### 列出邀请信息

<Api method="GET" path="/channels/{channelId}/invites" />

列出一个频道的所有邀请。

#### 响应

HTTP 状态码：<HttpStatus code="200" />

```json
[
  {
    "code": "N4Kbi9",
    "guild": {
      "id": "136412396083740672",
      "name": "bears🍻",
      "member_count": null,
      "icon": "f3ae596c9234d1b5a14c5a1658a55331.png",
      "icon_url": "https://cdn.tomon.co/icons/f3ae596c9234d1b5a14c5a1658a55331.png"
    },
    "channel": { "id": "136412396142460928", "name": "庆祝", "type": 0 },
    "inviter": {
      "id": "77431520989548544",
      "username": "monoceros",
      "discriminator": "0990",
      "avatar": "5d3ca10119f069727fe3b6ddd0998296.png",
      "name": "monoceros",
      "avatar_url": "https://cdn.tomon.co/avatars/5d3ca10119f069727fe3b6ddd0998296.png",
      "type": 0
    },
    "uses": 0,
    "max_age": 86400,
    "max_uses": 0,
    "temporary": false
  }
]
```

### 新增邀请

<Api method="POST" path="/channels/{channelId}/invites" />

 创建邀请。

#### JSON 参数

| 属性名     | 数据类型 | 是否可选 | 描述                           |
| ---------- | -------- | -------- | ------------------------------ |
| `max_age`  | `number` | optional | 有效时长，0 是永久有效         |
| `max_uses` | `number` | optional | 最多使用的次数，0 是无次数限制 |

例如：

```json
{ "max_age": 86400, "max_uses": 0 }
```

#### 响应

HTTP 状态码：<HttpStatus code="200" />

```json
{
  "code": "y5gRxd",
  "guild": {
    "id": "136412396083740672",
    "name": "bears🍻",
    "member_count": 1,
    "icon": "f3ae596c9234d1b5a14c5a1658a55331.png",
    "icon_url": "https://cdn.tomon.co/icons/f3ae596c9234d1b5a14c5a1658a55331.png"
  },
  "channel": { "id": "136455413704466432", "name": "abc", "type": 0 },
  "inviter": {
    "id": "77431520989548544",
    "username": "monoceros",
    "discriminator": "0990",
    "avatar": "5d3ca10119f069727fe3b6ddd0998296.png",
    "name": "monoceros",
    "avatar_url": "https://cdn.tomon.co/avatars/5d3ca10119f069727fe3b6ddd0998296.png",
    "type": 0
  },
  "uses": 0,
  "max_age": 86400,
  "max_uses": 0,
  "temporary": false
}
```

### 删除邀请

<Api method="DELETE" path="/invites/{inviteCode}" />

删除邀请

#### 响应

HTTP 状态码：<HttpStatus code="204" />

## 使用邀请

### 获取邀请信息

<Api method="GET" path="/invites/{inviteCode}" />

#### 响应

HTTP 状态码：<HttpStatus code="200" />

```json
{
  "code": "y5gRxd",
  "guild": {
    "id": "136412396083740672",
    "name": "bears🍻",
    "member_count": 1,
    "icon": "f3ae596c9234d1b5a14c5a1658a55331.png",
    "icon_url": "https://cdn.tomon.co/icons/f3ae596c9234d1b5a14c5a1658a55331.png"
  },
  "channel": { "id": "136455413704466432", "name": "abc", "type": 0 },
  "inviter": {
    "id": "77431520989548544",
    "username": "monoceros",
    "discriminator": "0990",
    "avatar": "5d3ca10119f069727fe3b6ddd0998296.png",
    "name": "monoceros",
    "avatar_url": "https://cdn.tomon.co/avatars/5d3ca10119f069727fe3b6ddd0998296.png",
    "type": 0
  },
  "uses": 0,
  "max_age": 86400,
  "max_uses": 0,
  "temporary": false
}
```

### 接收邀请

<Api method="POST" path="/invites/{inviteCode}" />

接收邀请，如果已经加入也会正常返回结果。

#### 响应

HTTP 状态码：<HttpStatus code="200" />

返回群组信息。

```json
{
  "id": "136412396083740672",
  "name": "bears🍻",
  "icon": "f3ae596c9234d1b5a14c5a1658a55331.png",
  "icon_url": "https://cdn.tomon.co/icons/f3ae596c9234d1b5a14c5a1658a55331.png",
  "background": null,
  "background_url": null,
  "background_props": null,
  "description": null,
  "owner_id": "77431520989548544",
  "position": 14,
  "system_channel_id": "136412396142460928",
  "system_channel_flags": 0,
  "default_message_notifications": 1,
  "joined_at": "2020-06-11T10:14:09.646Z",
  "banned": false
}
```
