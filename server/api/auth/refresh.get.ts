import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);

  if (!cookies.jwtRefresh)
    return sendError(
      event,
      createError({ statusCode: 400, message: "No token provided" })
    );

  const decoded = jwt.verify(cookies.jwtRefresh, process.env.JWT_SECRET);

  if (!decoded)
    return sendError(
      event,
      createError({ statusCode: 400, message: "Invalid token" })
    );

  deleteCookie(event, "jwt");
  deleteCookie(event, "jwtRefresh");

  const token = jwt.sign(
    {
      userId: decoded.id,
      email: decoded.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  setCookie(event, "jwt", token, {
    secure: true,
    sameSite: true,
    httpOnly: true,
    expires: new Date(new Date().getTime() + 1 * 60 * 60 * 1000), // Current time plus 1 hour
  });

  const refreshToken = jwt.sign(
    {
      userId: decoded.id,
      email: decoded.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "4h" }
  );

  setCookie(event, "jwtRefresh", refreshToken, {
    secure: true,
    sameSite: true,
    httpOnly: true,
    expires: new Date(new Date().getTime() + 4 * 60 * 60 * 1000), // Current time plus 4 hour
  });

  return event.res.end();
});
