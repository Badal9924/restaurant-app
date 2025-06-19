import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Loader2, LocateIcon, Mail, MapPin, MapPinnedIcon, PhoneCall } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";
import { useOrderStore } from "../store/useOrderStore";

function CheckOutPopUp({ open, setOpenDialog }: { open: boolean, setOpenDialog: Dispatch<SetStateAction<boolean>> }) {
  const { createCheckOutSession } = useOrderStore();
  const { user } = useUserStore();
  const { cart } = useCartStore();
  const loading = false;

  const [input, setInput] = useState({
    name: user?.fullName || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
    country: user?.country || "",
    phone: user?.number || ""
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  const checkOutHandler = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const checkOutData = {
        cartItems: cart.map((eachCartItems: any) => ({
          menuId: eachCartItems?.menuId?._id,
          name: eachCartItems?.menuId?.menuName,
          image: eachCartItems?.menuId?.image,
          price: eachCartItems?.menuId?.sellingPrice,
          quantity: eachCartItems?.quantity,
          restaurantId: eachCartItems?.menuId?.restaurantId
        })),
        deliveryDetails: { ...input },
        totalAmount: cart?.reduce((accu: any, eachCartItem: any) => {
          return accu + (+eachCartItem?.menuId?.sellingPrice * eachCartItem?.quantity)
        }, 0)
      }
      await createCheckOutSession(checkOutData);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Your Order</DialogTitle>
          <DialogDescription className="text-center">
            Double-check your order details and ensure everything is right in order. When you are ready, hit confirm button to finalize your order.
          </DialogDescription>
        </DialogHeader>
        <form action="" onSubmit={checkOutHandler}>
          <div className="flex gap-5 items-center mb-2">
            <Input
              value={input.name}
              placeholder="Full Name"
              onChange={changeHandler}
              type="text"
              name="name"
              className="bg-gray-200 font-bold text-xl outline-none border-none focus-visible:ring-transparent max-md:text-[16px]"
            />
          </div>

          <div>

            <div className="mb-3 flex items-center rounded-[7px] bg-gray-200 mt-3 pl-3 gap-3 h-[70px] max-md:h-[58px]">
              <PhoneCall className="h-[30px] w-[30px]" />
              <div className="w-full relative h-full pl-1">
                <Label className="absolute top-2 font-bold text-[16px]">Contact</Label>
                <input
                  name="phone"
                  value={input.phone}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Enter your contact"
                  className="w-full font-bold h-full bg-transparent text-gray-600 focus-visible:border-none text-xl pt-7 pl-0 border-none outline-none max-md:text-[18px]"
                />
              </div>
            </div>

            <div className="mb-3 flex items-center rounded-[7px] bg-gray-200 mt-3 pl-3 gap-3 h-[70px] max-md:h-[58px]">
              <Mail className="h-[30px] w-[30px]" />
              <div className="w-full relative h-full pl-1">
                <Label className="absolute top-2 font-bold text-[18px]">Email</Label>
                <input
                  disabled
                  name="email"
                  value={input.email}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Enter your mail"
                  className="w-full font-bold h-full bg-transparent text-gray-600 focus-visible:border-none text-xl pt-7 pl-0 border-none outline-none max-md:text-[16px]"

                />
              </div>

            </div>

            <div className="mb-3 flex items-center rounded-[7px] bg-gray-200 mt-3 pl-3 gap-3 h-[70px] max-md:h-[58px]">
              <LocateIcon className="h-[30px] w-[30px]" />
              <div className="w-full relative h-full pl-1">
                <Label className="absolute top-2 font-bold text-[18px]">Address</Label>
                <input
                  name="address"
                  value={input.address}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Enter your address"
                  className="w-full font-bold h-full bg-transparent text-gray-600 focus-visible:border-none text-xl pt-7 pl-0 border-none outline-none max-md:text-[16px]"

                />
              </div>

            </div>

            <div className="flex items-center rounded-[7px] bg-gray-200 mt-3 pl-3 gap-3 h-[70px] max-md:h-[58px]">
              <MapPin className="h-[30px] w-[30px]" />
              <div className="w-full relative h-full pl-1">
                <Label className="absolute top-2 font-bold text-[18px]">City</Label>
                <input
                  name="city"
                  value={input.city}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Enter your city"
                  className="w-full font-bold h-full bg-transparent text-gray-600 focus-visible:border-none text-xl pt-7 pl-0 border-none outline-none max-md:text-[16px]"

                />
              </div>

            </div>

            <div className="flex items-center rounded-[7px] bg-gray-200 mt-3 pl-3 gap-3 h-[70px] max-md:h-[58px]">
              <MapPin className="h-[30px] w-[30px]" />
              <div className="w-full relative h-full pl-1">
                <Label className="absolute top-2 font-bold text-[18px]">State</Label>
                <input
                  name="state"
                  value={input.state}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Enter your state"
                  className="w-full font-bold h-full bg-transparent text-gray-600 focus-visible:border-none text-xl pt-7 pl-0 border-none outline-none max-md:text-[16px]"

                />
              </div>

            </div>

            <div className="flex items-center rounded-[7px] bg-gray-200 mt-3 pl-3 gap-3 h-[70px] max-md:h-[58px]">
              <MapPin className="h-[30px] w-[30px]" />
              <div className="w-full relative h-full pl-1">
                <Label className="absolute top-2 font-bold text-[18px]">Pincode</Label>
                <input
                  name="pincode"
                  value={input.pincode}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Enter your Pincode"
                  className="w-full font-bold h-full bg-transparent text-gray-600 focus-visible:border-none text-xl pt-7 pl-0 border-none outline-none max-md:text-[16px]"

                />
              </div>

            </div>

            <div className="mb-3 flex items-center rounded-[7px] bg-gray-200 mt-3 pl-3 gap-3 h-[70px] max-md:h-[58px]">
              <MapPinnedIcon className="h-[30px] w-[30px]" />
              <div className="w-full relative h-full pl-1">
                <Label className="absolute top-2 font-bold text-[16px]">Country</Label>
                <input
                  name="country"
                  value={input.country}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Enter your country"
                  className="w-full font-bold h-full bg-transparent text-gray-600 focus-visible:border-none text-xl pt-7 pl-0 border-none outline-none max-md:text-[18px]"

                />
              </div>
            </div>

          </div>

          <div className="flex justify-center mt-2">
            {
              loading ? <Button disabled className="w-[60%] text-xl bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-3 animate-spin" /> Please Wait
              </Button> : <Button
                className="w-[100%] text-xl bg-orange hover:bg-hoverOrange">Continue To Payment</Button>
            }
          </div>
        </form>
      </DialogContent>
    </Dialog>


  )
}

export default CheckOutPopUp;