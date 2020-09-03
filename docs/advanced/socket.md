# 实时推送

## WebSocket

Tomon 需要建立长链接来接收来自服务器的实时通知，除了接收群组变化、消息等业务数据，还会有信令功能，例如心跳包、语音等。

## 连接地址

```
https://gateway.tomon.co
```

支持 zlib 压缩，如果使用 zlib，需要在地址后面增加参数`?compress=zlib-stream`。

## Payload 格式

Payload 格式如下：

| 字段 | 数据类型 | 是否可选 | 描述                                                 |
| ---- | -------- | -------- | ---------------------------------------------------- |
| `op` | `number` | required | 操作码，不同的操作对应不同的                         |
| `d`  | `object` | optional | payload 的数据                                       |
| `e`  | `string` | optional | 事件类型。对于`DISPATCH`类型的操作，有细分的事件类型 |

```json
{
  "op": 0,
  "d": { ... },
  "e": "MESSAGE_CREATE"
}
```

payload 在不同事件下，对应的数据不同。具体可以参看[dispatch 事件描述](./socket#dispatch)。

### ⚠️ 特殊说明

目前 gateway 传输的数据类型还存在一些问题，无法有效将 optional 的数据在空数据时表示为`null`。我们会尽快纠正这个问题。

## 操作码

| 名称                 | 值  | 传输方向   | 描述                            |
| -------------------- | --- | ---------- | ------------------------------- |
| `DISPATCH`           | `0` | 接收       | 业务事件的分发                  |
| `HEARTBEAT`          | `1` | 发送、接收 | 心跳包发起，即 ping             |
| `IDENTITY`           | `2` | 发送、接收 | 鉴权，socket 建立后确定用户身份 |
| `HELLO`              | `3` | 接收       | 服务器发来的初始化信息          |
| `HEARTBEAT_ACK`      | `4` | 发送、接收 | 心跳包响应，即 pong             |
| `VOICE_STATE_UPDATE` | `5` | 发送、接收 | 语音服务信令                    |

### DISPATCH

群组和聊天相关的事件分发，事件类型有：

| 名称                          | 描述             | payload 内容                                 |
| ----------------------------- | ---------------- | -------------------------------------------- |
| `GUILD_CREATE`                | 创建或加入群组   | [群组信息](./guild#数据定义)                 |
| `GUILD_DELETE`                | 删除或离开群组   | [群组信息](./guild#数据定义)                 |
| `GUILD_UPDATE`                | 群组更新         | [群组信息](./guild#数据定义)                 |
| `GUILD_POSITION`              | 群组位置变化     | _稍后给出定义_                               |
| `CHANNEL_CREATE`              | 新建频道         | [频道信息](./channel#数据定义)               |
| `CHANNEL_DELETE`              | 删除频道         | [频道信息](./channel#数据定义)               |
| `CHANNEL_UPDATE`              | 频道更新         | [频道信息](./channel#数据定义)               |
| `CHANNEL_POSITION`            | 频道位置变化     | _稍后给出定义_                               |
| `GUILD_ROLE_CREATE`           | 新建群组角色     | [角色信息](./role#数据定义)                  |
| `GUILD_ROLE_DELETE`           | 删除群组角色     | [角色信息](./role#数据定义)                  |
| `GUILD_ROLE_UPDATE`           | 群组角色更新     | [角色信息](./role#数据定义)                  |
| `GUILD_ROLE_POSITION`         | 群组角色位置变化 | _稍后给出定义_                               |
| `GUILD_MEMBER_ADD`            | 新增群组成员     | [群组成员信息](./guild#群组成员guild-member) |
| `GUILD_MEMBER_REMOVE`         | 删除群组成员     | [群组成员信息](./guild#群组成员guild-member) |
| `GUILD_MEMBER_UPDATE`         | 群组成员更新     | [群组成员信息](./guild#群组成员guild-member) |
| `MESSAGE_CREATE`              | 新建消息         | [消息信息](./message#数据定义)               |
| `MESSAGE_DELETE`              | 删除消息         | [消息信息](./message#数据定义)               |
| `MESSAGE_UPDATE`              | 消息更新         | [消息信息](./message#数据定义)               |
| `MESSAGE_REACTION_ADD`        | 增加消息反应     | _稍后给出定义_                               |
| `MESSAGE_REACTION_REMOVE`     | 删除消息反应     | _稍后给出定义_                               |
| `MESSAGE_REACTION_REMOVE_ALL` | 删除所有消息反应 | _稍后给出定义_                               |
| `EMOJI_CREATE`                | 新建群组 Emoji   | [Emoji 信息](./emoji#数据定义)               |
| `EMOJI_DELETE`                | 删除群组 Emoji   | [Emoji 信息](./emoji#数据定义)               |
| `EMOJI_UPDATE`                | 群组 Emoji 更新  | [Emoji 信息](./emoji#数据定义)               |
| `VOICE_STATE_UPDATE`          | 语音状态更新     | _稍后给出定义_                               |
| `USER_TYPING`                 | 打字状态         | _稍后给出定义_                               |
| `USER_PRESENCE_UPDATE`        | 在线状态更新     | _稍后给出定义_                               |

### HEARTBEAT

发送心跳包，一般由客户端发起。

### HEARTBEAT_ACK

响应心跳包，一般由服务端回应。

### IDENTITY

和服务端建立连接后，需要发送认证消息才能确定客户端身份。需要携带登录给定的 Token。例如：

```json
{
  "op": 2,
  "d": {
    "token": "eyJhxxx.xxx.xxxxx"
  }
}
```

认证成功后，服务端会发来初始化数据，包含所有加入的群组信息、私聊信息和群组设置信息。

例如：

```json
{
  "op": 2,
  "d": {
    "dm_channels": [
      {
        "id": "xxx",
        "default_message_notifications": 0,
        "last_message_id": "xxx",
        "last_pin_timestamp": "",
        "recipients": [
          {
            "avatar": "xxx.png",
            "avatar_url": "https://cdn.tomon.co/avatars/xxx.png",
            "discriminator": "xxxx",
            "id": "xxx",
            "name": "xxx",
            "type": 0,
            "username": "xxx"
          }
        ],
        "type": 2
      }
    ],
    "guild_settings": [
      {
        "channel_overrides": [],
        "guild_id": "xxx",
        "message_notifications": 0,
        "muted": false,
        "suppress_everyone": false
      }
    ],
    "guilds": [
      {
        "id": "xxx",
        "name": "欢迎使用",
        "icon": "",
        "icon_url": "",
        "joined_at": "2020-01-01T17:59:48.000Z",
        "background": "",
        "background_props": "",
        "background_url": "",
        "owner_id": "xxx",
        "position": 3,
        "system_channel_flags": 0,
        "system_channel_id": "xxx",
        "channels": [
          {
            "default_message_notifications": 3,
            "guild_id": "xxx",
            "id": "xxx",
            "last_message_id": "0",
            "last_pin_timestamp": "",
            "name": "欢迎参与内测",
            "parent_id": "0",
            "permission_overwrites": [],
            "position": 0,
            "recipients": [],
            "topic": "",
            "type": 0
          }
        ],
        "emojis": [
          {
            "guild_id": "xxx",
            "id": "xxx",
            "img": "xxx.png",
            "img_url": "https://cdn.tomon.co/emojis/xxx.png",
            "name": "abc",
            "user": {
              "avatar": "xxx.png",
              "avatar_url": "https://cdn.tomon.co/avatars/xxx.png",
              "discriminator": "xxxx",
              "id": "xxx",
              "name": "xxx",
              "type": 0,
              "username": "xxx"
            }
          }
        ],
        "members": [
          {
            "deaf": false,
            "guild_id": "xxx",
            "joined_at": "2020-01-01T17:59:48.000Z",
            "mute": false,
            "nick": "",
            "roles": [],
            "user": {
              "avatar": "xxx.png",
              "avatar_url": "https://cdn.tomon.co/avatars/xxx.png",
              "discriminator": "xxxx",
              "id": "xxx",
              "name": "xxx",
              "type": 0,
              "username": "xxx"
            }
          }
        ],
        "roles": [
          {
            "color": 0,
            "guild_id": "xxx",
            "hoist": false,
            "id": "xxx",
            "mentionable": false,
            "name": "xxx",
            "permissions": "70769729",
            "position": 6
          },
          {
            "color": 0,
            "guild_id": "xxx",
            "hoist": false,
            "id": "xxx",
            "mentionable": false,
            "name": "@everyone",
            "permissions": "70769729",
            "position": 0
          }
        ],
        "presences": [{ "status": "online", "user_id": "xxx" }],
        "voice_states": []
      }
    ],
    "stamp_packs": []
  }
}
```

### HELLO

服务端发来的初始化数据，包含心跳包时长，和会话 ID。

例如：

```json
{
  "op": 3,
  "d": {
    "heartbeat_interval": 40000,
    "session_id": "b422921cad2411eabbc700163e1021e7"
  }
}
```

在指定的心跳包间隔内，需要客户端发送心跳包，否则服务器会主动断开连接。

### VOICE_STATE_UPDATE

语音控制信令，暂不开放使用。
