import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const { email, password } = await useBody(event);

  if (!email || !password)
    return sendError(event, createError({ statusCode: 400 }));

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return sendError(event, createError({ statusCode: 400 }));

  const match = await bcrypt.compare(password, user.password);

  if (!match) return sendError(event, createError({ statusCode: 400 }));

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  setCookie(event, "jwt", token, {
    secure: true,
    sameSite: true,
    httpOnly: true,
    path: "/",
    expires: new Date(new Date().getTime() + 1 * 60 * 60 * 1000), // Current time plus 1 hour
  });

  const refreshToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "4h" }
  );

  setCookie(event, "jwtRefresh", refreshToken, {
    secure: true,
    sameSite: true,
    httpOnly: true,
    path: "/",
    expires: new Date(new Date().getTime() + 4 * 60 * 60 * 1000), // Current time plus 4 hour
  });

  return event.res.end();
});
