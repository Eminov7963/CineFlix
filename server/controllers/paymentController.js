const UserModel = require("../modules/userModel");
const jwt = require("jsonwebtoken");
const manualPaymentSuccess = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    console.log(paymentStatus);
    const token = req.headers.authorization?.split(" ")[1];

    if (!paymentStatus) {
      throw new Error("Eksik parametreler!");
    }

    const userId = req.userId; // Token'dan alınan kullanıcı ID'si
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token'ı doğrulama
    console.log(decoded);
    
    const updatedUser = await UserModel.findByIdAndUpdate(
      decoded.userId,
      { Ispremium: true }, // Premium üyeliği aktive etme
      { new: true }
    );
    console.log(updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı!" });
    }

    res.status(200).json({
      message: "Premium üyelik başarıyla aktif edildi.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Hata:", error.message);
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

module.exports = { manualPaymentSuccess };
