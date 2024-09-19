const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const User = require('../models/userModel');

export const generateAccessToken = (user) => {
  console.log(process.env.ACCESS_TOKEN_EXPIRY);
  return jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};
export const generateVerificationToken = (user) => {
  return jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_VERIFICATION_SECRET, { expiresIn: process.env.VERIFICATION_TOKEN_EXPIRY });
};

export const generateRefreshToken = (user) => {
  // return jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "1d" });
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY } //1 week
)
};

export const loginService = async (email, password) => {
  // const user = await User.findOne({ username });
    const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Save or update refresh token in the database (optional, for tracking)
  // await saveRefreshTokenToDB(user._id, refreshToken);

  // delete all previously created templates
  const contacts = await prisma.template.findMany({
    where: { user_id: user.id },
  })
  if(contacts.length>0){
    console.log("contacts", contacts);
    await prisma.template.deleteMany({
      where: { user_id: user.id },
    })
  }

  return {name:user.name, email:user.email, verified:user.verified, accessToken, refreshToken};
};

export const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error('Refresh token is required');
  }

  try {
    // Verify and decode the refresh token
    console.log(refreshToken)
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    // const user = await User.findById(decoded.userId);
    // console.log("decoded", decoded);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    // console.log("user", user)

    if (!user) {
      throw new Error('User not found');
    }

    // Optionally check if the refresh token exists in the database
    // const validToken = await isRefreshTokenValid(user._id, refreshToken);
    // if (!validToken) throw new Error('Invalid refresh token');

    // Generate new tokens
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Optionally update the refresh token in the database
    // await updateRefreshTokenInDB(user._id, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.log(error)
    if (error.name === 'TokenExpiredError') {
      throw new Error('Refresh token expired');
    }
    throw new Error('Invalid refresh token');
  }
};
