# 数据定义

## Guild

<!--
  id: string;
  name: string;
  icon: string;
  icon_url: string;
  background: string;
  background_url: string;
  background_props: string;
  description: string;
  owner_id: string;
  joined_at: string;
  position: number;
  default_message_notifications: number;
  system_channel_flags: number;
  system_channel_id: string;
  banned: boolean;
  updated_at: string;
 -->

| 字段                          | 描述                                             | 类型                                              |
| ----------------------------- | ------------------------------------------------ | ------------------------------------------------- |
| id                            | ID                                               | string(snowflake)                                 |
| name                          | Guild 名称                                       | string                                            |
| icon                          | 图标文件名                                       | string                                            |
| icon_url                      | 图标地址                                         | string                                            |
| background                    | 背景文件名                                       | string                                            |
| background_url                | 背景地址                                         | string                                            |
| background_props              | 背景参数                                         | string(enum) 0 \| 1 \| 2                          |
| description                   | 描述 (未使用)                                    | string                                            |
| owner_id                      | Guild 所有者 User ID                             | string(snowflake)                                 |
| joined_at                     | 加入的时间戳 (相对于自己)                        | string (ISO string)                               |
| position                      | 当前 Guild 在所有 Guilds 中的排序 (start with 0) | number                                            |
| default_message_notifications | Guild 默认的通知权限 由管理员设定                | number([MessageNotificationTypes](#notification)) |
| system_channel_flags          |                                                  | number                                            |
| system_channel_id             | 系统频道 (Channel) 的 Channel ID                 | string(snowflake)                                 |
| banned                        | 该 Guild 是否被屏蔽(Ban)了                       | boolean                                           |
| updated_at                    | 何时 Guild 被更新                                | string (ISO string)                               |

## Channel

<!--
  id: string;
  type: number;
  name: string;
  guild_id: string;
  position: number;
  permission_overwrites: any[];
  parent_id: string;
  topic: string;
  last_message_id: string;
  last_pin_timestamp: string;
  default_message_notifications: number;
 -->

| 字段                          | 描述                                                                | 类型                                              |
| ----------------------------- | ------------------------------------------------------------------- | ------------------------------------------------- |
| id                            | ID                                                                  | string(snowflake)                                 |
| type                          | Channel 的类型                                                      | number([ChannelType](#channeltype))               |
| name                          | 名称                                                                | string                                            |
| guild_id                      | 所属的 Guild 的 ID                                                  | string(snowflake)                                 |
| position                      | 当前 Channel 在所有 Channels 中的排序 (start with 0)                | number                                            |
| permission_overwrites         | 该频道的通知权限复写设置, 相对于默认的通知设定, 优先级更高          | any[] \| null                                     |
| parent_id                     | 如果他有上级频道, 一般为该频道在某个子分类下, 获取父级的 Channel ID | string(snowflake) \| null                         |
| topic                         | 频道的话题, 相当于 Channel 的描述信息                               | string                                            |
| last_message_id               | 该频道此时最后一个消息的 ID                                         | string(snowflake) \|null                          |
| last_pin_timestamp            |                                                                     | string                                            |
| default_message_notifications | Channel 默认的通知权限 由管理员设定                                 | number([MessageNotificationTypes](#notification)) |

## Notification

```ts
enum MessageNotificationTypes {
  ALL, // 0 所有
  ONLY_MENTION, // 1 仅被 @
  SUPPRESS, // 2 不提醒
  DEFAULT, // 3 默认
}
```

## ChannelType

```ts
enum ChannelTypes {
  TEXT, // 文本频道
  VOICE, // 语音
  DM, // 私聊
  GROUP, //
  CATEGORY, // 分类
}
```

## Member

<!--
  user: User;
  guild_id: string;
  nick: string;
  joined_at: string;
  mute: boolean;
  deaf: boolean;
  roles: string[];
 -->

| 字段      | 描述                         | 类型                |
| --------- | ---------------------------- | ------------------- |
| user      | 用户                         | User                |
| guild_id  | 此用户所在的 Guild ID        | string(snowflake)   |
| nick      | 昵称 (在此 Guild 中优先显示) | string              |
| joined_at | 加入时间                     | string (ISO string) |
| mute      |                              | boolean             |
| deaf      |                              | boolean             |
| roles     | 角色                         | string[]            |

## User

| 字段          | 描述            | 类型                        |
| ------------- | --------------- | --------------------------- |
| avatar        | 图片文件名      | string                      |
| avatar_url    | 图片地址        | string                      |
| created_at    | 创建时间        | string(ISO string) \| null  |
| discriminator | 标识码 (#)      | string (length = 4, number) |
| id            | ID              | string(snowflake)           |
| is_bot        | 是否为 bot 账号 | boolean                     |
| name          | 名称            | string                      |
| type          | 类型            | number                      |
| update_at     | 资料更新于      | string(ISO string)          |
| username      | 用户名          | string                      |

**`${username}#${discriminator}` 的格式才是唯一用户标识哦**

## Role

WIP

## Emoji

<!--
  id: string;
  guild_id: string;
  name: string;
  img: string;
  img_url: string;
  user: User;
  managed: boolean | null;
  animated: boolean | null;
 -->

| 字段     | 描述            | 类型            |
| -------- | --------------- | --------------- |
| id       | ID              | string          |
| guild_id | 所属的 Guild ID | string          |
| name     | 名称            | string          |
| img      | 图片文件名称    | string          |
| img_url  | 图片地址        | string          |
| user     |                 | [User](#user)   |
| managed  |                 | boolean \| null |
| animated |                 | boolean \| null |

## Message

| 字段             | 描述               | 类型                        |
| ---------------- | ------------------ | --------------------------- |
| id               | ID                 | string(snowflake)           |
| channel_id       | 所属的 Channel ID  | string(snowflake)           |
| author           | 作者               | Author                      |
| type             | 类型               | number                      |
| content          | 内容               | string                      |
| timestamp        | 时间戳             | string (IOS string)         |
| nonce            |                    | string(snowflake)           |
| attachments      | 附件列表           | Attachment[]                |
| reactions        | 反应列表           | Reaction[]                  |
| mentions         | 提及 (@) 列表      | User[]                      |
| stamps           | 使用 Stamps 的列表 | string[]                    |
| pinned           | 是否置顶           | boolean                     |
| edited_timestamp | 编辑时的时间戳     | string (IOS string) \| null |
