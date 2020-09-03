# 表情

## 数据定义

### 表情

|    属性名    |  数据类型   | 是否必要 | 描述         |
| :----------: | :---------: | :------: | ------------ |
|     `id`     | `snowflake` |    -     | 表情 id      |
|   `alias`    |  `number`   |    -     | 表情别名     |
| `author_id`  | `snowflake` |    -     | 作者 id      |
|  `position`  |  `number`   |    -     | 表情排序坐标 |
|    `hash`    |  `string`   |    -     | 哈希(md5)    |
|  `animated`  |   `bool`    |    -     | 是否为动图   |
|    `url`     |  `string`   |    -     | 链接         |
|   `width`    |  `number`   |    -     | 宽           |
|   `height`   |  `number`   |    -     | 高           |
| `updated_at` | `timestamp` |    -     | 更新于       |

### 表情包

|    属性名    |  数据类型   | 是否必要 | 描述                   |
| :----------: | :---------: | :------: | ---------------------- |
| `author_id`  | `snowflake` |    -     | 作者 id（对应用户 ID） |
|    `name`    |  `string`   |    -     | 表情别名               |
|    `type`    |  `number`   |    -     | 表情包类型（见下方）   |
|   `stamps`   |   `array`   |    -     | 表情包内所属的表情     |
| `updated_at` | `timestamp` |    -     | 更新于                 |

## 用户表情

### 添加表情

<api method="POST" path="/stamps" />

`multipart/form-data`

|     键名     |            数值            |
| :----------: | :------------------------: |
|    (任意)    | 二进制文件(非 base64 编码) |
|     ...      |            ...             |
| payload_json |          (见下方)          |

其中 `payload_json` 的格式为：

```json
{
  "alias": "123",
  "position": "123"
}
```

|   属性名   | 数据类型 | 是否必要 | 描述         |
| :--------: | :------: | :------: | ------------ |
|  `alias`   | `string` |    -     | 表情别名     |
| `position` | `number` |    -     | 表情排序坐标 |

#### 返回

- <httpstatus code="200" />

```json
[
  {
    "id": "136375988190711808",
    "alias": "123",
    "author_id": "132700396123000000",
    "pack_id": "132700396123000000",
    "position": 123,
    "hash": "cd4767ebdd83acd6e64f0c5d55a20c44",
    "animated": true,
    "url": "https://cdn.tomon.co/stamps/cd4767ebdd83acd6e64f0c5d55a20c44.gif",
    "width": 131,
    "height": 138,
    "updated_at": null
  }
]
```

### 列出表情

<api method="GET" path="/stamps/{stampId}" />

#### 返回

- <httpstatus code="200" />

```json
{
  "id": "135376747842506752",
  "alias": "123",
  "author_id": "132700396123000000",
  "pack_id": "132700396123000000",
  "position": 123,
  "hash": "08be868367e6310c2c73b933b8fa0b91",
  "animated": false,
  "url": "https://cdn.tomon.co/stamps/08be868367e6310c2c73b933b8fa0b91.png",
  "width": 240,
  "height": 240,
  "updated_at": null
}
```

### 更新表情

<api method="PATCH" path="/stamps/{stampId}" />

请求：

```json
{
  "alias": "456",
  "position": "0"
}
```

#### 返回

- <httpstatus code="204" /> 无内容

### 删除表情

<api method="DELETE" path="/stamps/{stampId}" />

请求:(空)

#### 返回

- <httpstatus code="204" /> 无内容

---

## 用户表情包

### 列出表情包

<api method="GET" path="/stamps/{stampId}" />

`{stampId}`接受两种参数：

|   属性名    | 数据类型 | 是否必要 | 描述                                   |
| :---------: | :------: | :------: | -------------------------------------- |
|    `@me`    | `string` |    -     | 为此参数时，返回个人的表情包详情       |
| `{stampId}` | `number` |    -     | 为此参数时，返回指定的表情包 ID 的详情 |

#### 返回

- <httpstatus code="200" />

```json
{
  "id": "132700396123000000",
  "name": "tomon test pack",
  "type": 0,
  "author_id": "132700396123000000",
  "stamps": [],
  "updated_at": null
}
```
