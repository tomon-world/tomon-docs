# 转发

## 数据定义

### 返回的数据定义

| 属性名     | 数据类型    | 是否必要 | 描述           |
| ---------- | ----------- | -------- | -------------- |
| `id`       | `snowflake` | required | 转发快照 ID    |
| `guild`    | `Object`    | required | 转发的群组快照 |
| `channel`  | `Object`    | required | 转发的频道快照 |
| `messages` | `array`     | required | 转发的消息快照 |

### 转发的群组快照

| 属性名 | 数据类型    | 是否必要 | 描述                |
| ------ | ----------- | -------- | ------------------- |
| `id`   | `snowflake` | required | 转发的群组快照 ID   |
| `name` | `string`    | required | 转发的群组快照 名字 |

### 转发的频道快照

| 属性名 | 数据类型    | 是否必要 | 描述                |
| ------ | ----------- | -------- | ------------------- |
| `id`   | `snowflake` | required | 转发的频道快照 ID   |
| `name` | `string`    | required | 转发的频道快照 名字 |

### 转发消息快照`messages`

| 字段          | 数据类型                                   | 是否可选 | 描述           |
| ------------- | ------------------------------------------ | -------- | -------------- |
| `id`          | `snowflake`                                | required | 消息 ID        |
| `content`     | `string`                                   | required | 消息内容       |
| `attachments` | [Attachment[]](channel#消息附件attachment) | required | 消息附件       |
| `stamps`      | [Stamp[]](stamp#数据定义)                  | required | 消息表情       |
| `reply`       | [Message[]](channel#消息message)           | required | 消息回复       |
| `author`      | [Author](#转发作者author)                  | required | 消息的作者     |
| `timestamp`   | `timestamp`                                | required | 消息的发送时间 |

### 转发预览`thumb`

| 字段          | 数据类型                                   | 是否可选 | 描述           |
| ------------- | ------------------------------------------ | -------- | -------------- |
| `id`          | `snowflake`                                | required | 此条消息的 ID  |
| `content`     | `string`                                   | required | 此条消息的内容 |
| `author`      | [Author](#转发作者author)                  | required | 消息的作者信息 |
| `attachments` | [Attachment[]](channel#消息附件attachment) | optical  | 消息附件       |
| `stamps`      | [Stamp[]](stamp#数据定义)                  | optical  | 消息附件       |

### 转发作者`Author`

| 字段     | 数据类型    | 是否可选 | 描述                                    |
| -------- | ----------- | -------- | --------------------------------------- |
| `id`     | `snowflake` | required | 此条消息的作者 ID                       |
| `name`   | `string`    | required | 此条消息的作者的名字                    |
| `avatar` | `string`    | required | 此条消息的作者的头像链接                |
| `type`   | `number`    | required | 此条消息的作者的用户类型                |
| `dname`  | `string`    | required | 此条消息的作者的用户名组合（xxxx#nnnn） |

## 获取转发

### 获取一条转发消息

<api method="GET" path="/forwards/{forwardId}" />

获取一条转发消息

#### 返回

```json
{
  "id": "142621125854367744",
  "guild": {
    "id": "132700825212345678",
    "name": "tomon-test"
  },
  "channel": {
    "id": "132700825312345678",
    "name": "文字频道1"
  },
  "messages": [
    {
      "id": "141138732647452672",
      "content": "普通文本消息转发范例",
      "attachments": [],
      "stamps": [],
      "reply": null,
      "author": {
        "id": "132700396123456789",
        "username": "tomon",
        "avatar": "6cce5a77a0265308e0775952bd3edc0b.png",
        "type": 0,
        "dname": "tomon#0001"
      },
      "timestamp": "2020-06-24T11:14:56.094Z"
    },
    {
      "id": "141138749076541440",
      "content": "普通文本消息转发范例2",
      "attachments": [],
      "stamps": [],
      "reply": null,
      "author": {
        "id": "132700396123456789",
        "username": "tomon",
        "avatar": "6cce5a77a0265308e0775952bd3edc0b.png",
        "type": 0,
        "dname": "tomon#0001"
      },
      "timestamp": "2020-06-24T11:15:00.012Z"
    },
    {
      "id": "141138787882242048",
      "content": "带emoji的回复消息 的 转发范例 \n\n<@132700396123456789> <%mmtest:138991972512960512>",
      "attachments": [],
      "stamps": [],
      "reply": {
        "id": "141138749076541440",
        "channel_id": "132700825301630976",
        "author": {
          "id": "132700396123456789",
          "username": "tomon",
          "discriminator": "0001",
          "avatar": "6cce5a77a0265308e0775952bd3edc0b.png",
          "name": "tomon",
          "avatar_url": "https://cdn.tomon.co/avatars/6cce5a77a0265308e0775952bd3edc0b.png",
          "created_at": "2020-06-01T04:23:59.891Z",
          "updated_at": "2020-06-28T13:09:38.094Z",
          "type": 0
        },
        "type": 0,
        "content": "普通文本消息转发范例2",
        "timestamp": "2020-06-24T11:15:00.012Z",
        "nonce": "141138748825051136",
        "attachments": [],
        "reactions": [],
        "mentions": [],
        "stamps": [],
        "reply": null,
        "pinned": false,
        "edited_timestamp": null
      },
      "author": {
        "id": "132700396123456789",
        "username": "tomon",
        "avatar": "6cce5a77a0265308e0775952bd3edc0b.png",
        "type": 0,
        "dname": "tomon#0001"
      },
      "timestamp": "2020-06-24T11:15:09.263Z"
    },
    {
      "id": "141142683665043457",
      "content": "附件消息转发范例",
      "attachments": [
        {
          "id": "141142683665043456",
          "filename": "1436840.gif",
          "hash": "a972efcdbca687eb2d000f098b61728b",
          "type": "gif",
          "size": 202338,
          "height": 120,
          "width": 120,
          "url": "https://cdn.tomon.co/attachments/a972efcdbca687eb2d000f098b61728b.gif"
        }
      ],
      "stamps": [],
      "reply": null,
      "author": {
        "id": "132700396123456789",
        "username": "tomon",
        "avatar": "6cce5a77a0265308e0775952bd3edc0b.png",
        "type": 0,
        "dname": "tomon#0001"
      },
      "timestamp": "2020-06-24T11:30:38.090Z"
    },
    {
      "id": "142500951998074880",
      "content": "stamp消息转发范例",
      "attachments": [],
      "stamps": [
        {
          "id": "135704261513265152",
          "alias": "123",
          "author_id": "132700396123456789",
          "pack_id": "132700396123456789",
          "position": 123,
          "hash": "08be868367e6310c2c73b933b8fa0b91",
          "animated": false,
          "url": "https://cdn.tomon.co/stamps/08be868367e6310c2c73b933b8fa0b91.png",
          "width": 240,
          "height": 240,
          "updated_at": null
        }
      ],
      "reply": null,
      "author": {
        "id": "132700396123456789",
        "username": "tomon",
        "avatar": "6cce5a77a0265308e0775952bd3edc0b.png",
        "type": 0,
        "dname": "tomon#0001"
      },
      "timestamp": "2020-06-28T05:27:54.497Z"
    }
  ],
  "count": 5,
  "thumb": [
    {
      "id": "141138732647452672",
      "content": "普通文本消息转发范例",
      "author": {
        "id": "132700396123456789",
        "avatar": "6cce5a77a0265308e0775952bd3edc0b.png",
        "type": 0,
        "dname": "tomon#0001"
      }
    },
    {
      "id": "141138749076541440",
      "content": "普通文本消息转发范例2",
      "author": {
        "id": "132700396123456789",
        "avatar": "6cce5a77a0265308e0775952bd3edc0b.png",
        "type": 0,
        "dname": "tomon#0001"
      }
    },
    {
      "id": "141138787882242048",
      "content": "带emoji的回复消息 的 转发范例 \n\n<@132700396123456789> <%mmtest:138991972512960512>",
      "author": {
        "id": "132700396123456789",
        "avatar": "6cce5a77a0265308e0775952bd3edc0b.png",
        "type": 0,
        "dname": "tomon#0001"
      }
    },
    {
      "id": "141142683665043457",
      "content": "附件消息转发范例",
      "author": {
        "id": "132700396123456789",
        "avatar": "6cce5a77a0265308e0775952bd3edc0b.png",
        "type": 0,
        "dname": "tomon#0001"
      },
      "attachment": {
        "hash": "a972efcdbca687eb2d000f098b61728b",
        "type": "gif"
      }
    },
    {
      "id": "142500951998074880",
      "content": "stamp消息转发范例",
      "author": {
        "id": "132700396123456789",
        "avatar": "6cce5a77a0265308e0775952bd3edc0b.png",
        "type": 0,
        "dname": "tomon#0001"
      },
      "stamp": {
        "hash": "08be868367e6310c2c73b933b8fa0b91",
        "animated": false
      }
    }
  ]
}
```
