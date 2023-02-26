import Users from "../models/Users.js";

//UPDATE
export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await Users.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ); //by new true updated document will be shown in postman
    //and mongodb not the previous one with few updates
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
    // next(err);
  }
};

//DELETE
export const deleteUser = async (req, res, next) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted");
  } catch (err) {
    res.status(500).json(err);
    // next(err)
  }
};

//GET BY ID
export const singleUser = async (req, res, next) => {
  try {
    const singleUser = await Users.findById(req.params.id);
    res.status(200).json(singleUser);
  } catch (err) {
    res.status(500).json(err);
    // next(err)
  }
};

//GET ALL USERS
export const allUser = async (req, res, next) => {
  console.log("i am in usersroute");
  // next() //next means go to the enxt middle from
  //where this route is called index.js se

  // const failed=true;

  // if(failed) return next(createError(401,"you are not autheni"))
  try {
    const allUser = await Users.find();
    res.status(200).json(allUser);
  } catch (err) {
    res.status(500).json(err);
    // next(err)
  }
};
