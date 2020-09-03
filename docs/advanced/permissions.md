# 权限

## 权限用途

权限用于管理用户在群组里的行为。一般的即时通讯类 App 只将权限划分为三种：群主、管理员、一般群员。Tomon App 支持更细致的划分。具体如下：

| 权限名       | 代码                   | 值      | 描述                                 | 作用范围   |
| ------------ | ---------------------- | ------- | ------------------------------------ | ---------- |
| 创建邀请     | `CREATE_INVITE`        | `1<<0`  | 可以创建邀请                         | 频道       |
| 踢出成员     | `KICK_MEMBERS`         | `1<<1`  | 可以踢出成员                         | 群组       |
| 管理员       | `ADMINISTRATOR`        | `1<<3`  | 管理员具有所有权限，除了解散群组     | 群组       |
| 管理频道     | `MANAGE_CHANNELS`      | `1<<4`  | 可以设置频道的信息                   | 频道       |
| 管理群组     | `MANAGE_GUILD`         | `1<<5`  | 可以设置群组的信息                   | 群组       |
| 添加反应     | `ADD_REACTIONS`        | `1<<6`  | 可以给消息添加反应                   | 频道       |
| 查看频道     | `VIEW_CHANNEL`         | `1<<10` | 可以查看频道                         | 频道       |
| 发送消息     | `SEND_MESSAGES`        | `1<<11` | 可以在频道内发送消息                 | 频道       |
| 管理消息     | `MANAGE_MESSAGES`      | `1<<13` | 可以管理消息（删除，置顶）           | 频道       |
| 添加消息附件 | `ATTACH_FILES`         | `1<<15` | 可以添加附件                         | 频道       |
| 查看历史消息 | `READ_MESSAGE_HISTORY` | `1<<16` | 可以查看历史消息                     | 频道       |
| 语音连接     | `CONNECT`              | `1<<20` | 可以连接语音频道                     | 频道       |
| 语音讲话     | `SPEAK`                | `1<<21` | 可以在语音频道里讲话                 | 频道       |
| 更换群昵称   | `CHANGE_NICKNAME`      | `1<<26` | 可以更换群昵称                       | 群组       |
| 管理群昵称   | `MANAGE_NICKNAMES`     | `1<<27` | 可以更换其他人的群昵称               | 群组       |
| 管理角色     | `MANAGE_ROLES`         | `1<<28` | 可以管理角色，可以设置群组的权限覆盖 | 群组、频道 |
| 管理 Emoji   | `MANAGE_EMOJIS`        | `1<<30` | 可以管理 Emoji                       | 群组       |

权限的作用范围分为两种：群组和频道。群组是控制成员在群组内的行为，不涉及频道，频道是控制频道内的行为，不涉及群组。

作用范围是频道的，可以在频道的权限覆盖中进行覆盖设置。

频道的权限覆盖是指：成员在群组的权限基础上，针对频道范围的自定义权限。这样可以做到频道的管理多样性，不同频道针对不同的成员或角色具有不同的表现。

例如：

- 设置公告频道所有人不可以发言
- 设置仅管理员可见频道

## 使用

判断一个成员在群组内或频道内是否有权限，先将权限计算出来，再进行位运算得到布尔结果。

```javascript
function hasPermissionForGuild(guild, member, permissions) {
  return (getGuildPermissions(guild, member) & permissions) !== 0;
}

function hasPermissionForChannel(channel, member, permissions) {
  return (getChannelPermissions(guild, member) & permissions) !== 0;
}

const viewable = hasPermissionForChannel(
  channel,
  member,
  Permissions.VIEW_CHANNEL,
);
```

## 计算

成员针对群组和频道的权限是经过计算得来的。成员拥有多个角色，角色携带权限。角色的权限和频道的权限覆盖将成为

所有角色的权限总和成为该成员在群组范围内的权限。

```javascript
function getGuildPermissions(guild, member) {
  const everyone = guild.roles.everyone;
  let permissions = everyone.permissions;
  for (const role of member.roles) {
    permissions = permissions | role.permissions;
  }
  return permissions;
}
```

频道范围的权限需要进一步考虑频道的权限覆盖。权限覆盖分为三种：所有人、针对角色的覆盖和针对成员的覆盖。权限覆盖计算需要经过 6 步：

- 去掉所有人权限覆盖中设置的 deny 权限
- 增加所有人权限覆盖中设置的 allow 权限
- 去掉角色权限覆盖中设置的 deny 权限，要求成员具有覆盖指定的角色
- 增加角色权限覆盖中设置的 allow 权限，要求成员具有覆盖指定的角色
- 如果覆盖中指定了当前成员，去掉成员权限覆盖设置的 deny 权限
- 如果覆盖中指定了当前成员，增加成员权限覆盖设置的 allow 权限

```javascript
function getChannelPermissions(channel, member) {
  let permissions = getGuildPermissions(channel.guild, member);
  const everyoneOverwrite = channel.permissionOverwrites.everyone;
  permissions &= ~everyoneOverwrite.deny;
  permissions |= everyoneOverwrite.allow;
  let allow = 0;
  let deny = 0;
  for (const roleOverwrite of channel.permissionOverwrites.roles) {
    if (member.roles.has(roleOverwrite.role)) {
      allow |= roleOverwrite.allow;
      deny |= roleOverwrite.deny;
    }
  }
  permissions &= ~deny;
  permissions |= allow;
  if (channel.permissionOverwrites.members.has(member)) {
    const memberOverwrite = channel.permissionOverwrites.members.get(member);
    permissions &= ~memberOverwrite.deny;
    permissions |= memberOverwrite.allow;
  }
  return permissions;
}
```
