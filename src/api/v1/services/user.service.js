const userRepository = require("../repository/user.repository");
const jwtUtils = require("../utils/iwtUtils");
const CryptoJS = require("crypto-js");

module.exports.getMyInfo = async (accessToken) => {
  try {
    const { userId } = jwtUtils.verifyToken(accessToken);

    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      status: 200,
      user,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.createPersonnel = async (body) => {
  try {
    const { encryptedData } = body;

    // Giải mã dữ liệu
    const bytes = CryptoJS.AES.decrypt(
      encryptedData,
      process.env.VITE_SECRET_KEY
    );
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const newPersonnel = await userRepository.createUser(decryptedData);

    return {
      status: 201,
      message: "Personnel created successfully",
      newPersonnel,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllPersonnel = async (cookie) => {
  try {
    const { userId } = jwtUtils.verifyToken(cookie);
    const adminId = await userRepository.getAdminId(userId);
    const personnels = await userRepository.getAllPersonnel(userId, adminId);
    return {
      status: 200,
      personnels,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllPersonelChart = async (cookie) => {
  try {
    // Lấy tất cả người dùng thuộc admin cụ thể
    const { userId } = jwtUtils.verifyToken(cookie);
    const adminId = await userRepository.getAdminId(userId);
    const users = await userRepository.getAllPersonnel(userId, adminId);
    console.log("🚀 ~ module.exports.getAllPersonelChart= ~ users:", users);

    // Khởi tạo các mảng để lưu trữ dữ liệu
    const organizationData = [];
    const unassignedMembers = [];
    const unassignedLeaders = [];

    // Tạo một map để lưu trữ các PM và Leader
    const pmMap = new Map();
    const leaderMap = new Map();

    // Lặp qua tất cả người dùng
    users.forEach((user) => {
      if (user.role === "PM") {
        // Nếu là PM, thêm vào pmMap
        pmMap.set(user._id.toString(), {
          id: `PM${pmMap.size + 1}`,
          label: `PM ${user.name}`,
          children: [],
        });
      } else if (user.role === "Lead") {
        // Nếu là Leader, thêm vào leaderMap
        leaderMap.set(user._id.toString(), {
          id: `L${leaderMap.size + 1}`,
          label: `Leader ${user.name}`,
          children: [],
        });
      } else if (user.role === "Member") {
        // Nếu là Member, thêm vào unassignedMembers tạm thời
        unassignedMembers.push({
          id: `M${unassignedMembers.length + 1}`,
          label: `Member ${user.name}`,
        });
      }
    });

    // Lặp lại để gán Members vào Leaders và Leaders vào PMs
    users.forEach((user) => {
      if (user.role === "Member" && user.leader) {
        const leader = leaderMap.get(user.leader.toString());
        if (leader) {
          leader.children.push({
            id: `M${leader.children.length + 1}`,
            label: `Member ${leader.children.length + 1}`,
          });
        }
      } else if (user.role === "Lead" && user.PM) {
        const pm = pmMap.get(user.PM.toString());
        if (pm) {
          pm.children.push(leaderMap.get(user._id.toString()));
        }
      }
    });

    // Thêm các PM vào organizationData
    pmMap.forEach((pm) => {
      organizationData.push(pm);
    });

    // Thêm các Leader không được gán vào unassignedLeaders
    leaderMap.forEach((leader) => {
      if (!organizationData.some((pm) => pm.children.includes(leader))) {
        unassignedLeaders.push(leader);
      }
    });

    // Thêm các Member không được gán vào unassignedMembers
    unassignedMembers.forEach((member) => {
      if (
        !organizationData.some((pm) =>
          pm.children.some((leader) => leader.children.includes(member))
        )
      ) {
        unassignedMembers.push(member);
      }
    });

    return {
      status: 200,
      dataChart: {
        organizationData,
        unassignedMembers,
        unassignedLeaders,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
};
