# 群组

## 数据定义

### 群组`Guild`

群组是频道的集合，用户可以加入若干群组。

| 属性名                          | 数据类型     | 是否可选 | 描述                                      |
| ------------------------------- | ------------ | -------- | ----------------------------------------- |
| `id`                            | `snowflake`  | required | 群组的 ID                                 |
| `name`                          | `string`     | required | 群组的名称                                |
| `icon`                          | `string?`    | required | 群组的图标 hash                           |
| `background`                    | `string?`    | required | 群组的背景图 hash                         |
| `background_props`              | `string?`    | required | 群组背景图的属性                          |
| `position`                      | `number`     | required | 群组的位置，自己群组的排序                |
| `joined_at`                     | `string`     | required | 群组的加入时间, ISO 8601 格式             |
| `owner_id`                      | `snowflake`  | required | 群组的所有者 ID                           |
| `system_channel_id`             | `snowflake?` | required | 群组的系统频道 ID                         |
| `system_channel_flags`          | `number`     | required | 群组的系统频道 Flag, 控制是否发送系统消息 |
| `default_message_notifications` | `number`     | required | 群组的默认通知类型                        |

例如：

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
  "joined_at": "2020-06-11T10:14:09.646Z",
  "position": 14,
  "default_message_notifications": 1,
  "system_channel_flags": 0,
  "system_channel_id": "136412396142460928",
  "banned": false,
  "updated_at": "2020-06-11T10:14:09.663Z"
}
```

### 群组成员`Guild Member`

用户在群组内的身份信息。

| 属性名      | 数据类型      | 是否可选 | 描述                          |
| ----------- | ------------- | -------- | ----------------------------- |
| `user`      | `User`        | required | 成员的用户信息                |
| `nick`      | `string?`     | required | 成员的群昵称                  |
| `joined_at` | `string`      | required | 群组的加入时间, ISO 8601 格式 |
| `roles`     | `snowflake[]` | required | 成员的角色列表                |

例如：

```json
{
  "user": {
    "id": "77431520989548544",
    "username": "monoceros",
    "discriminator": "0990",
    "avatar": "5d3ca10119f069727fe3b6ddd0998296.png",
    "name": "monoceros",
    "avatar_url": "https://cdn.tomon.co/avatars/5d3ca10119f069727fe3b6ddd0998296.png",
    "updated_at": "2020-05-23T12:17:19.189Z",
    "type": 0
  },
  "guild_id": "136412396083740672",
  "nick": null,
  "joined_at": "2020-06-11T10:14:09.646Z",
  "mute": false,
  "deaf": false,
  "roles": []
}
```

## 群组

### 获取群组信息

<Api method="GET" path="/guilds/{guildId}" />

获取群组信息

#### 响应

HTTP 状态码：<HttpStatus code="200" />

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
  "joined_at": "2020-06-11T10:14:09.646Z",
  "position": 14,
  "default_message_notifications": 1,
  "system_channel_flags": 0,
  "system_channel_id": "136412396142460928",
  "banned": false,
  "updated_at": "2020-06-11T10:14:09.663Z"
}
```

### 创建群组

<Api method="POST" path="/guilds" />

创建群组

#### JSON 参数

| 属性名     | 数据类型           | 是否必要 | 描述            |
| ---------- | ------------------ | -------- | --------------- |
| `name`     | `string`           | required | 群组名称        |
| `icon`     | `string?`          | optional | 群组图标 base64 |
| `channels` | `channel_options?` | optional | 预置群组的频道  |

`channel_options`定义

| 属性名     | 数据类型             | 是否必要 | 描述                                                         |
| ---------- | -------------------- | -------- | ------------------------------------------------------------ |
| `name`     | `string`             | required | 频道名称                                                     |
| `type`     | `string`             | required | 频道类型，可以是<br/>- `text`<br/>- `voice`<br/>- `category` |
| `children` | `channel_options[]?` | optional | 如果`type`是`category`，可以定义子频道                       |

例如：

```json
{
  "name": "abc",
  "icon": "data:image/jpeg;base64,/9j/4AA...",
  "channels": [
    {
      "name": "文字频道",
      "type": "category",
      "children": [{ "name": "通用", "type": "text" }]
    }
  ]
}
```

#### 响应

HTTP 状态码：<HttpStatus code="200" />

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
  "joined_at": "2020-06-11T10:14:09.646Z",
  "position": 14,
  "default_message_notifications": 1,
  "system_channel_flags": 0,
  "system_channel_id": "136412396142460928",
  "banned": false,
  "updated_at": "2020-06-11T10:14:09.663Z"
}
```

### 修改群组

<Api method="PATCH" path="/guilds/{guildId}" />

修改群组属性

#### JSON 参数

| 属性名 | 数据类型  | 是否必要 | 描述            |
| ------ | --------- | -------- | --------------- |
| `name` | `string`  | optional | 群组名称        |
| `icon` | `string?` | optional | 群组图标 base64 |

### 删除群组

<Api method="DELETE" path="/guilds/{guildId}" />

删除群组，即解散群组。

#### 响应

HTTP 状态码：<HttpStatus code="204" />

### 离开群组

<Api method="DELETE" path="/@me/guilds/{guildId}" />

#### 响应

HTTP 状态码：<HttpStatus code="204" />

---

## 群组频道

### 获取群组所有频道

<Api method="GET" path="/guilds/{guildId}/channels" />

获取群组的所有频道。

#### 响应

HTTP 状态码：<HttpStatus code="200" />

```json
[
  {
    "id": "136412396129878016",
    "type": 4,
    "name": "文字频道",
    "guild_id": "136412396083740672",
    "position": 0,
    "permission_overwrites": [],
    "parent_id": null
  },
  {
    "id": "136412396134072320",
    "type": 4,
    "name": "语音频道",
    "guild_id": "136412396083740672",
    "position": 0,
    "permission_overwrites": [],
    "parent_id": null
  },
  {
    "id": "136412396142460928",
    "type": 0,
    "name": "通用",
    "guild_id": "136412396083740672",
    "position": 0,
    "permission_overwrites": [],
    "parent_id": "136412396129878016",
    "topic": null,
    "last_message_id": null,
    "last_pin_timestamp": null,
    "default_message_notifications": 3
  },
  {
    "id": "136412396142460929",
    "type": 1,
    "name": "语音",
    "guild_id": "136412396083740672",
    "position": 0,
    "permission_overwrites": [],
    "parent_id": "136412396134072320"
  }
]
```

### 创建群组频道

<Api method="POST" path="/guilds/{guildId}/channels" />

在指定群组创建频道。

#### JSON 参数

| 属性名                  | 数据类型       | 是否必要 | 描述                                                    |
| ----------------------- | -------------- | -------- | ------------------------------------------------------- |
| `name`                  | `string`       | required | 频道名称                                                |
| `type`                  | `number`       | required | 频道类型: <br/>- 文字:`0`<br/>- 语音:`1`<br/>- 分类:`4` |
| `parent_id`             | `snowflake?`   | optional | 频道所属的分类 ID                                       |
| `permission_overwrites` | `overwrite[]?` | optional | 频道的权限覆盖                                          |

例如：

```json
{
  "name": "abc",
  "type": 0,
  "parent_id": null
}
```

#### 响应

HTTP 状态码：<HttpStatus code="200" />

```json
{
  "id": "136455413704466432",
  "type": 0,
  "name": "abc",
  "guild_id": "136412396083740672",
  "position": 1,
  "permission_overwrites": [],
  "parent_id": null,
  "topic": null,
  "last_message_id": null,
  "last_pin_timestamp": null,
  "default_message_notifications": 3
}
```

### 修改群组频道顺序

<Api method="PATCH" path="/guilds/{guildId}/channels" />

#### JSON 参数

是一个频道位置信息的数组，频道位置信息描述如下：

| 属性名      | 数据类型     | 是否必要 | 描述                                                             |
| ----------- | ------------ | -------- | ---------------------------------------------------------------- |
| `id`        | `snowflake`  | required | 频道 ID                                                          |
| `position`  | `number`     | required | 频道在分类里的排序                                               |
| `parent_id` | `snowflake?` | optional | 频道所移动到的分类，如果不填，则不移动分类，填 null 移动到无分类 |

例如：

```json
{
  "positions": [
    { "id": "136412396129878016", "position": 0 },
    { "id": "136412396134072320", "position": 1 },
    {
      "id": "136455413704466432",
      "position": 0,
      "parent_id": "136412396134072320"
    },
    { "id": "136412396142460929", "position": 1 }
  ]
}
```

#### 响应

HTTP 状态码：<HttpStatus code="204" />

---

## 群组成员

### 获取全部群组成员

<Api method="GET" path="/guilds/{guildId}/members" />

获取所有群组成员（WIP）

#### 响应

HTTP 状态码：<HttpStatus code="200" />

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
      "updated_at": "2020-05-23T12:17:19.189Z",
      "type": 0
    },
    "guild_id": "136412396083740672",
    "nick": null,
    "joined_at": "2020-06-11T10:14:09.646Z",
    "mute": false,
    "deaf": false,
    "roles": []
  }
]
```

### 获取单个群组成员信息

<Api method="GET" path="/guilds/{guildId}/members/{userId}" />

获取特定成员的信息

#### 响应

HTTP 状态码：<HttpStatus code="200" />

```json
{
  "user": {
    "id": "77431520989548544",
    "username": "monoceros",
    "discriminator": "0990",
    "avatar": "5d3ca10119f069727fe3b6ddd0998296.png",
    "name": "monoceros",
    "avatar_url": "https://cdn.tomon.co/avatars/5d3ca10119f069727fe3b6ddd0998296.png",
    "updated_at": "2020-05-23T12:17:19.189Z",
    "type": 0
  },
  "guild_id": "136412396083740672",
  "nick": null,
  "joined_at": "2020-06-11T10:14:09.646Z",
  "mute": false,
  "deaf": false,
  "roles": []
}
```

### 添加群组成员

<Api method="PUT" path="/guilds/{guildId}/members/{userId}" />

将用户加入到群组，要求有管理群组的权限。

#### 响应

HTTP 状态码：<HttpStatus code="204" />

### 移除群组成员

<Api method="DELETE" path="/guilds/{guildId}/members/{userId}" />

将用户从群组移除，要求有管理群组的权限。

#### 响应

HTTP 状态码：<HttpStatus code="204" />

### 修改群组成员

<Api method="PATCH" path="/guilds/{guildId}/members/{userId}" />

修改群组成员的信息，暂时只用于修改昵称。

#### JSON 参数

| 属性名 | 数据类型  | 是否必要 | 描述                  |
| ------ | --------- | -------- | --------------------- |
| `nick` | `string?` | required | 昵称，null 为清除昵称 |

例如：

```json
{ "nick": "fox" }
```

### 修改我的群昵称

<Api method="PATCH" path="/guilds/{guildId}/members/@me/nick" />

#### JSON 参数

| 属性名 | 数据类型  | 是否必要 | 描述                  |
| ------ | --------- | -------- | --------------------- |
| `nick` | `string?` | required | 昵称，null 为清除昵称 |

例如：

```json
{ "nick": "cat" }
```
