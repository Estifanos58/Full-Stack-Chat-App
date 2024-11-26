import User from "../models/UserModel.js";

export const searchContacts = async (req, res) => {
    try {
      const {searchTerm} = req.body;
      console.log(searchTerm)
      if(searchTerm === undefined || searchTerm === null){
        return res.status(400).send("Searchterm is required");
      }

      const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}{}|[\]\\]/g, "\\$&");

      const regex = new RegExp(sanitizedSearchTerm, "i");

      if (!req.userId) {
        return res.status(400).send("User ID is required");
      }

      const contacts = await User.find({
        $and: [
            { _id: { $ne: req.userId} },
            {
                $or: [{ firstName: regex }, { lastName: regex }, {email: regex}]
            }
        ],
      });

      return res.status(200).json({contacts})
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  };
  