import { useEffect } from "react";
import { useOrderStore } from "../store/useOrderStore"

function Success() {
  const { getOrderDetails, orders } = useOrderStore();
  useEffect(() => {
    getOrderDetails();
  }, [])
  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto px-3">
      <div className="flex justify-center">
        <h2 className="text-[26px] font-extrabold mx-auto mt-3">Order Summary</h2>
      </div>

      {
        orders?.map((order: any, index: any) => (
          <div key={index}>
            {
              order?.cartItems?.map((eachCartItem: any, index: any) => ((
                <div key={index} className="mt-7 w-[95%] mx-auto max-w-[950px] py-3 shadow-xl px-5 border-[1px] border-zinc-400 rounded-[15px] hover:shadow-2xl transition-shadow duration-300">
                  <h1 className="text-center text-[22px] font-bold max-sm:text-[18px]">Order Status : <span className="text-[#FF5A5A] text-[22px] font-bold max-sm:text-[16px]">{eachCartItem?.status}</span></h1>
                  <div className="flex">
                    <div className="h-[70px] w-[70px] max-sm:w-[35px] max-sm:h-[35px]">
                      <img src={eachCartItem?.image} className="object-cover h-full w-full rounded-full" />
                    </div>
                    <div className="flex justify-between items-center w-full px-3">
                      <p className="text-[20px] font-semibold max-sm:text-[14px] line-clamp-1">{eachCartItem?.name}</p>
                      <p className="text-[20px] font-semibold max-sm:text-[14px]">Qty : <span>{eachCartItem?.quantity}</span> </p>
                      <p className="text-[20px] font-semibold max-sm:text-[14px]">₹ {" "} {(+eachCartItem?.quantity * eachCartItem.price)}</p>
                    </div>
                  </div>
                  <hr className="border-zinc-400 mb-2" />
                  {/* <div className="text-right">
                    <Button className="text-xl !py-0 bg-orange hover:bg-hoverOrange max-sm:text-[16px] max-sm:px-2 max-sm:h-7">Cancel Order</Button>
                  </div> */}
                </div>)))
            }
          </div>
        ))
      }

    </div>
  )
}

export default Success