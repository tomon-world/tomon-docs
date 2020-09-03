# 频道

## 数据定义

### 频道`Channel`

频道用于承载消息，消息只能在频道内发送和接收。

| 属性名                  | 数据类型      | 是否可选 | 描述                                                                                       |
| ----------------------- | ------------- | -------- | ------------------------------------------------------------------------------------------ |
| `id`                    | `snowflake`   | required | 频道 ID                                                                                    |
| `type`                  | `number`      | required | 频道类型：<br/>- 文字(仅群组)`0`<br/>- 语音(仅群组)`1`<br/>- 私聊`2`<br/>- 分类(仅群组)`4` |
| `guild_id`              | `snowflake?`  | required | 频道的所属群组 ID。_仅群组内频道_                                                          |
| `name`                  | `string`      | required | 频道的名称。_仅群组内频道_                                                                 |
| `position`              | `number`      | optional | 频道在群组内的位置 _仅群组内频道_                                                          |
| `parent_id`             | `snowflake?`  | optional | 频道在群组内所属的分类 _仅群组内频道_                                                      |
| `permission_overwrites` | `Overwrite[]` | optional | 频道的权限覆盖 _仅群组内频道_                                                              |
| `topic`                 | `string`      | optional | 频道的主题 _仅群组文字频道_                                                                |
| `last_message_id`       | `snowflake?`  | optional | 频道的最后一条消息 ID _仅群组文字频道或私聊频道_                                           |

#### 权限覆盖`Overwrite`

频道级别的权限控制信息。

| 属性名  | 数据类型    | 是否可选 | 描述                                       |
| ------- | ----------- | -------- | ------------------------------------------ |
| `id`    | `snowflake` | required | 设置的目标 ID                              |
| `type`  | `string`    | required | 设置的目标类型，角色`role`或者成员`member` |
| `allow` | `uint64`    | required | 允许的权限                                 |
| `deny`  | `uint64`    | required | 拒绝的权限                                 |

例如：

```json
{
  "id": "125137348689137664",
  "type": 0,
  "name": "闲聊",
  "guild_id": "125136423165628416",
  "position": 0,
  "permission_overwrites": [],
  "parent_id": "125186630427348992",
  "topic": null,
  "last_message_id": "136720329443151872",
  "last_pin_timestamp": "2020-05-22T08:44:46.525Z",
  "default_message_notifications": 3
}
```

## 频道

### 获取频道

<api method="GET" path="/channels/{channelId}" />

获取频道信息

#### 响应

HTTP 状态码：<httpstatus code="200" />

```json
{
  "id": "125137348689137664",
  "type": 0,
  "name": "闲聊",
  "guild_id": "125136423165628416",
  "position": 0,
  "permission_overwrites": [],
  "parent_id": "125186630427348992",
  "topic": null,
  "last_message_id": "136720329443151872",
  "last_pin_timestamp": "2020-05-22T08:44:46.525Z",
  "default_message_notifications": 3
}
```

### 修改频道

<api method="PATCH" path="/channels/{channelId}" />

修改频道信息

#### JSON 参数

| 属性名                          | 数据类型      | 是否必要 | 描述               |
| ------------------------------- | ------------- | -------- | ------------------ |
| `name`                          | `string`      | optional | 频道名称，不能为空 |
| `topic`                         | `string`      | optional | 文字频道主题       |
| `permission_overwrites`         | `Overwrite[]` | optional | 群组频道的权限覆盖 |
| `default_message_notifications` | `number`      | optional | 频道的默认通知类型 |

例如：

```json
{ "topic": "123", "default_message_notifications": 3 }
```

#### 响应

HTTP 状态码：<httpstatus code="200" />

```json
{
  "id": "136412396142460928",
  "type": 0,
  "name": "庆祝",
  "guild_id": "136412396083740672",
  "position": 0,
  "permission_overwrites": [],
  "parent_id": "136412396129878016",
  "topic": null,
  "last_message_id": "136460582265589760",
  "ack_message_id": "136460582265589760",
  "last_pin_timestamp": null,
  "default_message_notifications": 3,
  "unread_count": 0
}
```

### 删除频道

<api method="DELETE" path="/channels/{channelId}" />

删除频道，群组频道需要有管理频道的权限。

#### 响应

HTTP 状态码：<httpstatus code="204" />

### 同步频道打字状态

<api method="POST" path="/channels/{channelId}/typing" />

同步其他客户端自己正在输入的状态。

#### 响应

HTTP 状态码：<httpstatus code="204" />
