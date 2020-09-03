# 角色

## 数据定义

### 角色`Role`

| 属性名        | 数据类型    | 是否可选 | 描述                                        |
| ------------- | ----------- | -------- | ------------------------------------------- |
| `id`          | `snowflake` | required | 角色的 ID，如果是`@所有人`，则 ID 是群组 ID |
| `guild_id`    | `snowflake` | required | 角色的所属群组 ID                           |
| `name`        | `string`    | required | 角色的名称                                  |
| `color`       | `number`    | required | 角色的颜色，默认为 0                        |
| `position`    | `number`    | required | 角色的位置                                  |
| `hoist`       | `bool`      | required | 角色是否在成员列表里单独显示                |
| `permissions` | `uint64`    | required | 角色的权限                                  |

例如：

```json
{
  "id": "136448282880151552",
  "guild_id": "136448282880151552",
  "name": "@everyone",
  "color": 0,
  "permissions": 70769729,
  "position": 0,
  "hoist": null,
  "mentionable": null,
  "updated_at": null
}
```

## 群组角色

### 获取群组所有角色

<api method="GET" path="/guilds/{guildId}/roles" />

获取群组的所有角色。

#### 响应

HTTP 状态码：<httpstatus code="200" />

```json
[
  {
    "id": "128804296564359168",
    "guild_id": "120158745794711552",
    "name": "23",
    "color": 16777215,
    "permissions": 70769729,
    "position": 3,
    "hoist": false,
    "mentionable": null
  },
  {
    "id": "123358822415732736",
    "guild_id": "120158745794711552",
    "name": "admin",
    "color": 16711680,
    "permissions": 70769737,
    "position": 2,
    "hoist": false,
    "mentionable": null
  },
  {
    "id": "120158745794711552",
    "guild_id": "120158745794711552",
    "name": "@所有人",
    "color": 16777215,
    "permissions": 70769729,
    "position": 0,
    "hoist": false,
    "mentionable": null
  }
]
```

### 创建群组角色

<api method="POST" path="/guilds/{guildId}/roles" />

创建群组角色。

#### JSON 参数

| 属性名 | 数据类型 | 是否必要 | 描述   |
| ------ | -------- | -------- | ------ |
| `name` | `string` | required | 角色名 |

例如：

```json
{ "name": "abc" }
```

#### 响应

HTTP 状态码：<httpstatus code="200" />

```json
{
  "id": "136467165372522496",
  "guild_id": "120158745794711552",
  "name": "abc",
  "color": 0,
  "permissions": 70769729,
  "position": 0,
  "hoist": false,
  "mentionable": null
}
```

### 删除群组角色

<api method="DELETE" path="/guilds/{guildId}/roles/{roleId}" />

删除群组角色。

#### 响应

HTTP 状态码：<httpstatus code="204" />

### 修改群组角色

<api method="PATCH" path="/guilds/{guildId}/roles/{roleId}" />

修改群组角色。

### JSON 参数

| 属性名        | 数据类型 | 是否必要 | 描述                       |
| ------------- | -------- | -------- | -------------------------- |
| `name`        | `string` | optional | 角色名                     |
| `color`       | `number` | optional | 角色颜色                   |
| `permissions` | `number` | optional | 角色权限                   |
| `hoist`       | `bool`   | optional | 角色是否在成员列表分类显示 |

例如：

```json
{ "name": "abcd", "color": 7995282, "hoist": false, "permissions": 70769761 }
```

#### 响应

HTTP 状态码：<httpstatus code="200" />

```json
{
  "id": "136467165372522496",
  "guild_id": "120158745794711552",
  "name": "abcd",
  "color": 7995282,
  "permissions": 70769761,
  "position": 0,
  "hoist": false,
  "mentionable": null
}
```

### 给群组成员添加角色

<api method="PUT" path="/guilds/{guildId}/members/{userId}/roles/{roleId}" />

给群组成员添加角色。

#### 响应

HTTP 状态码：<httpstatus code="204" />

### 从群组成员移除角色

<api method="DELETE" path="/guilds/{guildId}/members/{userId}/roles/{roleId}" />

从群组成员移除角色。

#### 响应

HTTP 状态码：<httpstatus code="204" />
