import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl, email, provider } = req.body;

    // Xác định provider nếu không được cung cấp
    let authProvider = provider;
    if (!authProvider && email) {
      // Cố gắng suy luận authProvider từ email (nếu có)
      if (email.endsWith('gmail.com')) {
        authProvider = 'google';
      } else if (email.includes('github')) {
        authProvider = 'github';
      } else {
        authProvider = 'email';
      }
    }

    const user = await User.findOne({ clerkId: id });

    if (!user) {
      // Đăng ký người dùng mới
      await User.create({
        clerkId: id,
        fullName: `${firstName || ""} ${lastName || ""}`.trim(),
        imageUrl,
        email: email || null,
        authProvider,
        lastLogin: new Date()
      });
    } else {
      // Cập nhật thông tin người dùng hiện có
      user.lastLogin = new Date();

      // Cập nhật các trường nếu chúng được cung cấp và khác với dữ liệu hiện tại
      if (email && !user.email) user.email = email;
      if (authProvider && !user.authProvider) user.authProvider = authProvider;
      if (imageUrl && imageUrl !== user.imageUrl) user.imageUrl = imageUrl;

      // Cập nhật fullName nếu có thay đổi
      const newFullName = `${firstName || ""} ${lastName || ""}`.trim();
      if (newFullName && newFullName !== user.fullName) user.fullName = newFullName;

      await user.save();
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in auth callback", error);
    next(error);
  }
};
