export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("session-id"), res.send({ message: "Logout successfully" });
  });
};
