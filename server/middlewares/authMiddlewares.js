const jwt = require("jsonwebtoken");

const authMiddleware = (roles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token

    if (!token) {
      return res.status(403).json({ message: "Token gereklidir." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token'ı doğrulama
      req.userId = decoded.userId; // Token'dan userId'yi alıyoruz
      console.log("Decoded Token:", decoded); // Token'ın doğru şekilde decode edilip edilmediğini kontrol etmek için log
      if (roles && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Yetkisiz erişim." });
      }
      next();
    } catch (error) {
      return res.status(403).json({ message: "Geçersiz token." });
    }
  };
};

module.exports = authMiddleware;
