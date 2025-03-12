const messageService = require("./message.service");

module.exports.socketConnect = () => {
  return (socket) => {
    // Lắng nghe sự kiện "joinRoom" từ client để tham gia room cụ thể
    socket.on("joinRoom", ({ room_id }) => {
      socket.join(room_id);
    });

    // Nhận thông báo người dùng đang gõ
    socket.on("userTyping", (data) => {
      const { room_id } = data;
      _io.to(room_id).emit("userTyping", data); // Phát lại thông báo cho tất cả các client trong room
    });

    // Lắng nghe sự kiện "sendMessage" từ client
    socket.on("sendMessage", async (data) => {
      try {
        // Lưu vào database trước
        const mesData = {
          senderId: data.sender._id,
          roomId: data.room,
          content: data.content,
        };
        const res = await messageService.sendMessage(mesData);
        if (res.status !== 201) {
          throw new Error(`Error sending message`);
        }
        _io.emit("sendMessage", res.newMessage);
      } catch (error) {
        // Gửi sự kiện lỗi về client
        _io.emit("messageError", {
          data: data,
          error: "Error sending message!",
          details: error.message, // Đính kèm lỗi chi tiết (nếu cần)
        });
      }
    });

    socket.on("updateMessage", (data) => {
      try {
        _io.emit("updateMessage", {});
      } catch (error) {}
    });

    // gửi thông báo
    socket.on("newNotification", (data) => {
      // Sau đó gửi tin nhắn đến tất cả các người dùng kết nối
      _io.emit("notification", { data });
    });

    // Lắng nghe sự kiện "leaveRoom" từ client để thoát room cụ thể

    // disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  };
};
