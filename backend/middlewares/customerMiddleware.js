
const validateCustomerRole = (req, res, next) => {
    try {
      const role = req.user.role;
    
      if (role === "customer") {
        next();
      } else {
        throw new Error("Invalid User Account Role, login as customer");
      }
    } catch (error) {
      res.status(401).json({
        status: false,
        message: "Invalid request",
        error: "Something went wrong",
      });
    }
  };
  
  export default validateCustomerRole;
  