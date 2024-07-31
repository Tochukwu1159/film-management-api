
const validateAdminRole = (req, res, next) => {
    try {
      const role = req.user.payload.role;
  
      if (role === "admin") {
        next();
      } else {
        throw new Error("Invalid User Account Role, login as admin");
      }
    } catch (error) {
      res.status(401).json({
        status: false,
        message: "Invalid request",
        error: "Something went wrong",
      });
    }
  };
  
  export default validateAdminRole;
  