# 用户

## 个人信息

### 数据定义

| 属性名           | 数据类型    | 是否可选 | 描述                 |
| ---------------- | ----------- | -------- | -------------------- |
| `id`             | `snowflake` | required | 角色的 ID            |
| `username`       | `string`    | required | 用户名               |
| `discriminator`  | `string`    | required | 用户后缀             |
| `name`           | `string`    | required | 用户名（备用字段）   |
| `avatar`         | `string`    | required | 用户头像文件名       |
| `avatar_url`     | `string`    | required | 用户头像链接（过时） |
| `updated_at`     | `timestamp` | required | 更新于               |
| `type`           | `number`    | required | 用户类型             |
| `email`          | `string`    | required | 用户邮箱             |
| `email_verified` | `bool`      | required | 用户是否已验证       |
| `phone`          | `number`    | required | 用户手机号           |
| `phone_verified` | `bool`      | required | 用户手机号是否已验证 |
| `banned`         | `bool`      | required | 用户是否被封禁       |
| `activated`      | `bool`      | required | 用户是否已激活       |

### 查看个人资料

<Api method="GET" path="/users/@me" />

列出用户个人资料

#### 返回

```json
{
  "id": "132700396123668480",
  "username": "tomon",
  "discriminator": "1234",
  "avatar": null,
  "name": "tomon",
  "avatar_url": null,
  "updated_at": "2020-06-01T04:24:40.027Z",
  "type": 0,
  "email": null,
  "email_verified": false,
  "phone": "13812345678",
  "phone_verified": true,
  "banned": false
}
```

### 编辑个人资料

<Api method="PATCH" path="/users/@me" />

编辑用户个人资料

```json
{
  "discriminator": "0001",
  "email": "admin@tomon.co",
  "password": "123456"
}
```

| 属性名          | 数据类型 | 是否必要 | 描述             |
| --------------- | -------- | -------- | ---------------- |
| `discriminator` | `string` | required | 用户后缀         |
| `email`         | `string` | required | 用户邮箱         |
| `password`      | `string` | required | 用户要修改的密码 |

#### 返回

参考 [数据定义](#数据定义)

- <HttpStatus code="200" /> 成功返回
- <HttpStatus code="400" /> 用户名/邮箱冲突
- <HttpStatus code="401" /> 密码错误
- <HttpStatus code="422" /> 参数错误

---

## 群组操作

### 群组列表

<Api method="GET" path="/users/@me/guilds" />

列出当前加入的工会

#### 返回

```json
[
  {
    "id": "121979324558479360",
    "name": "欢迎使用",
    "icon": null,
    "icon_url": null,
    "background": null,
    "background_url": null,
    "background_props": null,
    "description": null,
    "owner_id": "121979324369735680",
    "position": null,
    "system_channel_id": "121979324583645184",
    "system_channel_flags": 0,
    "default_message_notifications": 1,
    "joined_at": "2020-05-02T14:22:17.241Z",
    "created_at": null,
    "updated_at": "2020-05-02T14:22:17.267Z",
    "banned": false
  }
]
```

详细字段参考 [群组数据定义](guild#数据定义)

- <HttpStatus code="200" /> 成功返回

### 群组排序

<Api method="PATCH" path="/users/@me/guilds" />

对用户个人的群组侧边栏进行排序

```json
{
  "positions": [
    {
      "id": "121979324558479360",
      "position": 0
    },
    {
      "id": "77601467623542784",
      "position": 1
    }
  ]
}
```

| 属性名     | 数据类型    | 是否必要 | 描述              |
| ---------- | ----------- | -------- | ----------------- |
| `id`       | `snowflake` | required | 需要排序的群组 id |
| `position` | `number`    | required | 排序的坐标        |

#### 返回

参考 [用户数据定义](#数据定义)

- <HttpStatus code="200" /> 成功返回

### 离开工会

<Api method="DELETE" path="/users/@me/guilds/{guildId}" />

其中`{guildId}`为工会 ID

#### 返回

- <HttpStatus code="204" /> 无返回内容

---

## 私聊

### 数据定义

| 属性名               | 数据类型    | 是否必要 | 描述                                       |
| -------------------- | ----------- | -------- | ------------------------------------------ |
| `id`                 | `snowflake` | required | 私聊群组 id                                |
| `type`               | `number`    | required | 类型                                       |
| `updated_at`         | `timestamp` | required | 更新于                                     |
| `last_message_id`    | `snowflake` | required | 最后返回消息的 ID                          |
| `last_pin_timestamp` | `snowflake` | required | 最后 PIN 消息的时间戳                      |
| `recipients`         | `array`     | required | 接收者，参考[表情包数据定义](stamp#表情包) |
| `ack_message_id`     | `snowflake` | required | 定位消息 ID                                |

### 获取私聊频道

<Api method="GET" path="/users/@me/channels" />

获取全部的私聊频道

#### 返回

- <HttpStatus code="200" />

```json
[
  {
    "id": "123622677616267264",
    "type": 2,
    "created_at": null,
    "updated_at": null,
    "last_message_id": null,
    "last_pin_timestamp": null,
    "recipients": [
      {
        "id": "102263796474580992",
        "username": "tomon",
        "discriminator": "0000",
        "avatar": "9e0b19c21debf009b2e5994798bc8ab9.png",
        "name": "tomon",
        "avatar_url": "https://cdn.tomon.co/avatars/9e0b19c21debf009b2e5994798bc8ab9.png",
        "created_at": null,
        "updated_at": "2020-05-22T03:26:23.055Z",
        "type": 0
      }
    ],
    "ack_message_id": null,
    "unread_count": 0
  }
]
```

### 创建私聊频道

<Api method="POST" path="/users/@me/channels" />

创建一个私聊频道

```json
{
  "recipients": ["77334868412862464"]
}
```

| 属性名       | 数据类型 | 是否必要 | 描述                       |
| ------------ | -------- | -------- | -------------------------- |
| `recipients` | `array`  | required | 私聊参加者 id (必须为数组) |

#### 返回

- <HttpStatus code="200" />

\*返回内容参照上述

---

## 个人设置

### 工会设置

<Api method="PATCH" path="/users/@me/guilds/@me/settings" />

## 邀请码

用户一周只能创建一次邀请码

### 数据定义

| 属性名     | 数据类型    | 是否必要 | 描述           |
| ---------- | ----------- | -------- | -------------- |
| code       | `string`    | -        | 邀请码 id      |
| user_id    | `snowflake` | -        | 用户 ID        |
| uses       | `number`    | -        | 已使用次数     |
| max_uses   | `number`    | -        | 最大使用次数   |
| users      | `array`     | -        | 已经邀请的用户 |
| created_at | `timestamp` | -        | 创建于         |

其中`users`字段参考 [用户数据定义](#数据定义)

### 列出邀请码

<Api method="GET" path="/users/@me/tickets" />

#### 返回

```json
[
  {
    "code": "tnT9Fn",
    "user_id": "121979324369730000",
    "uses": 1,
    "max_uses": 10,
    "users": [
      {
        "id": "131786267142000000",
        "username": "tomon",
        "discriminator": "0001",
        "avatar": null,
        "name": "tomon",
        "avatar_url": null,
        "created_at": "2020-05-29T15:51:34.557Z",
        "updated_at": "2020-05-29T15:51:42.491Z",
        "type": 0
      }
    ],
    "created_at": "2020-05-23T11:53:07.490Z"
  }
]
```

- <HttpStatus code="200" /> 如上

### 创建邀请码

<Api method="POST" path="/users/@me/tickets" />

\*注：如果本周内创建过，则返回本周之内创建的邀请码

- <HttpStatus code="200" /> 格式如上

---

## 表情包

### 数据定义

| 属性名       | 数据类型    | 是否必要 | 描述                                       |
| ------------ | ----------- | -------- | ------------------------------------------ |
| `user_id`    | `string`    | -        | 用户 ID                                    |
| `pack_id`    | `string`    | -        | 表情包 ID                                  |
| `stamp_pack` | `string`    | -        | 表情包详细信息参照[表情包数据定义](stamp/) |
| `add_at`     | `timestamp` | -        | 添加于                                     |

### 表情包列表

<Api method="GET" path="/users/@me/stamppacks" />

列出我使用的表情包

```json
[
  {
    "user_id": "132700396123000000",
    "pack_id": "132700396123000000",
    "stamp_pack": {
      "id": "132700396123000000",
      "name": "tomon self pack",
      "type": 0,
      "author_id": "132700396123668480",
      "stamps": [],
      "updated_at": null
    },
    "add_at": "2020-06-08T13:53:19.160Z"
  }
]
```

### 使用表情包

<Api method="PUT" path="/users/@me/stamppacks/{stampPackId}" />

使用一个表情包

#### 提交

无

#### 返回

- <HttpStatus code="204" /> 无内容

### 移除一个表情包

<Api method="PUT" path="/users/@me/stamppacks/{stampPackId}" />

从个人表情包列表内移除一个表情包

#### 提交

无

#### 返回

- <HttpStatus code="204" /> 无内容

---

## 举报

### 数据定义

| 属性名     | 数据类型    | 是否必要 | 描述             |
| ---------- | ----------- | :------: | ---------------- |
| id         | `snowflake` |    -     | 举报 id          |
| user_id    | `snowflake` |    -     | 用户 id          |
| target_id  | `snowflake` |    -     | 举报对象的 id    |
| type       | `number`    |    -     | 举报对象的类型值 |
| state      | `number`    |    -     | 举报处理的状态   |
| reason     | `number`    |    -     | 举报原因         |
| comment    | `string`    |    -     | 附加说明         |
| updated_at | timestamp   |    -     | 更新于           |

### 新增举报

<Api method="POST" path="/users/@me/reports" />

范例：

- 无图片证据提交时

```json
{
  "target_id": "123456",
  "type": 1,
  "state": 0,
  "reason": 1,
  "comment": "嗯嗯！"
}
```

- 有图片证据提交时

`multipart/form-data`

| 键名         | 数值                           |
| ------------ | ------------------------------ |
| (任意)       | 二进制图片文件(非 base64 编码) |
| ...          | ...                            |
| payload_json | (见上方)                       |

### 举报类型列表(Type)

| 类型 | 描述 |
| ---- | ---- |
| 0    | 其他 |
| 1    | 用户 |
| 2    | 群组 |

### 举报状态列表(State)

用户提交后，默认状态均为待处理

| 类型 | 描述   |
| ---- | ------ |
| 0    | 待处理 |
| 1    | 已解决 |
| 2    | 拒绝   |
| 3    | 删除   |

### 举报原因列表(Reason)

| 类型 | 描述           |
| ---- | -------------- |
| 0    | 其他           |
| 1    | 不合法         |
| 2    | 垃圾           |
| 3    | 骚扰           |
| 4    | 危害青少年权益 |

---
