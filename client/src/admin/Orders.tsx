import React, { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { useRestaurantStore } from "../store/useRestaurantStore"

function Orders() {
  const { getRestaurantOrders, restaurantOrder, updateRestaurantOrderStatus, getRestaurantData, restaurant } = useRestaurantStore();
  const filterOrder = restaurantOrder.map((ele: any) => {
    const filteredItems = ele.cartItems.filter((singleMenu: any) => {
      return singleMenu?.restaurantId?._id === restaurant?._id
    })
    return {
      ...ele,
      cartItems: filteredItems
    }
  }).flat();

  const HandleStatusChange = async (order: any, status: any, cartItemId: any) => {
    await updateRestaurantOrderStatus(order, status, cartItemId);
  }

  useEffect(() => {
    getRestaurantOrders();
  }, []);

  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurantData();
    }
    fetchRestaurant();
  }, []);

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto px-3">
      <div className="flex flex-col mt-5 items-center">
        <h1 className="text-[27px] font-extrabold">Orders Overview</h1>

        {
          filterOrder?.map((order: any, i: any) => (
            <React.Fragment key={i}>
              {
                order?.cartItems?.map((eachCartItems: any, ind: number) => (
                  <div key={ind} className="w-[90%] mt-5 mb-5 flex gap-8 px-4 py-4 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-[1px] border-solid border-slate-400 rounded-[15px] max-md:flex-col max-md:items-center">
                    <div className="h-[100px] w-[100px] shrink-0">
                      <img src={eachCartItems?.image} className="h-[100%] w-[100%] object-cover rounded-full" />
                    </div>
                    <div className="flex flex-col w-full justify-center max-lg:flex-row max-lg:gap-4 max-sm:flex-col max-sm:items-center">

                      <div className="">

                        <div className="flex justify-between items-center w-full max-lg:flex-col max-lg:items-start max-sm:items-center">
                          <h1 className="text-xl font-bold max-sm:text-[16px]">{eachCartItems?.name}</h1>
                          <p className="text-xl max-sm:text-[16px]"><span>Items : {eachCartItems?.quantity}</span></p>
                          <p className="text-xl max-sm:text-[16px]">Total : {" "} <span>₹ {+eachCartItems?.quantity * eachCartItems?.price}</span></p>

                          <Select
                            onValueChange={(e) => HandleStatusChange(order?._id, e, eachCartItems?._id)}
                            defaultValue={eachCartItems?.status}
                          >
                            <SelectTrigger className="w-[250px] text-xl max-lg:w-[190px] focus-visible:ring-1 focus:border-none border-slate-400 mt-2 max-sm:text-[16px]">
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending" className="text-xl max-sm:text-[16px]">Pending</SelectItem>
                              <SelectItem value="Confirmed" className="text-xl max-sm:text-[16px]">Confirmed</SelectItem>
                              <SelectItem value="Preparing" className="text-xl max-sm:text-[16px]">Preparing</SelectItem>
                              <SelectItem value="Out for Delivery" className="text-xl max-sm:text-[16px]">Out For Delivery</SelectItem>
                              <SelectItem value="Delivered" className="text-xl max-sm:text-[16px]">Delivered</SelectItem>
                            </SelectContent>
                          </Select>

                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-xl font-semibold max-sm:text-center max-sm:text-[16px]">{order?.deliveryDetails?.name}</p>
                        <p className="text-xl font-semibold min-w-[250px] max-sm:text-center max-sm:text-[16px]">{order?.deliveryDetails?.address}</p>
                        <p className="text-xl font-semibold min-w-[250px] max-sm:text-center max-sm:text-[16px]">{order?.deliveryDetails?.city}, {order?.deliveryDetails?.state}</p>
                        <p className="text-xl font-semibold max-sm:text-center max-sm:text-[16px]">{order?.deliveryDetails?.pincode}, {order?.deliveryDetails?.country}</p>
                        <p className="text-xl font-semibold max-sm:text-center max-sm:text-[16px]">{order?.deliveryDetails?.phone}</p>
                      </div>
                    </div>
                  </div>))
              }
            </React.Fragment>
          ))
        }
      </div>
    </div>
  )
}

export default Orders;