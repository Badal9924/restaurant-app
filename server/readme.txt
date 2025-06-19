##  const userWithoutPassword = await userModel.findOne({email}).select("-password");  -->> Removing password field.


##  const user = await userModel.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() }
    }).select("-password");
    
    -->> here $gt means that verificationTokenExpiresAt should be greater than Date.now();

##  const resetToken = crypto.randomBytes(40).toString("hex");
    -> helps us to create hashed link for reset the password 

##  .$or  -->> it is used to find anyOne of the conditions from the array of conditions.

##   $in  -->> 


##   const restaurant = await restaurantModel.findById(restaurantId).populate({
      path: "menus",
      options: { sort: { createdAt: -1 } },
    });

    
##   if (searchText) {
      query.$or = [
        { restaurantName: { $regex: searchText, $options: "i" } },
        { city: { $regex: searchText, $options: "i" } },
        { country: { $regex: searchText, $options: "i" } },
      ];
    }


##    const orders = await OrderModel.find({
      "cartItems.restaurantId": restaurant._id,
    })
      .populate("cartItems.restaurantId")
      .populate("user");


##    const order = await OrderModel.updateOne(
      { "cartItems._id": cartItemId },
      { $set: { "cartItems.$[elem].status": status } },
      { arrayFilters: [{ "elem._id": cartItemId }] }
    );

##    if (searchText) {
      query.$or = [
        { restaurantName: { $regex: searchText, $options: "i" } },
        { city: { $regex: searchText, $options: "i" } },
        { country: { $regex: searchText, $options: "i" } },
      ];
    }

    if (searchQuery) {
      query.$or = [
        { restaurantName: { $regex: searchQuery, $options: "i" } },
        { cuisines: { $regex: searchQuery, $options: "i" } },
      ];
    }