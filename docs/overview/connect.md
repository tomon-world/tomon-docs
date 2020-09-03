# 连接到 Tomon

## 实时推送

当你通过鉴权获取 Tomon 的 Token 后，需要建立 WebSocket 和 Tomon 保持连接，以接收来自 Tomon 服务器的实时推送。

实时推送可以保证你能够即时收到来自群组的消息。

具体可以参考文档[实时推送](../docs/socket)。

这里大致介绍一下连接流程。

1. 通过[鉴权](../docs/auth)获取 Token
2. 建立 WebSocket 连接：`gateway.tomon.co`，具体参看[实时推送](../docs/socket#连接地址)
3. 建立成功后，收到服务器的`HELLO`数据，按照心跳包时长启动心跳包计时器，在指定时间内持续发送心跳包，具体参看[HELLO](../docs/socket#hello)
4. 通过 WebSocket 发送 Token 到服务器，具体参看[IDENTITY](../docs/socket#identity)
5. 收到来自服务器的`IDENTITY`数据
6. 大功告成！ ٩(˃̶͈̀௰˂̶͈́)و 保持连接，你将会持续收到来自服务器的实时推送，具体事件参考[DISPATCH](../docs/socket#dispatch)
7. ちょっと待ってください！还有一点需要注意一下，WebSocket 因为网络问题可能会断卡，需要 bot 加入重连机制，每次重连暂时还是上面的流程。另外注意维持第 3 点说的心跳包，否则会丢失在线状态

觉得复杂？不用担心，我们正在准备各个语言支持的 Bot SDK，具体看下一页。
