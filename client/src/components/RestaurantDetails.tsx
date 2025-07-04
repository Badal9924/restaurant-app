import { Timer } from "lucide-react"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { useRestaurantStore } from "../store/useRestaurantStore"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useCartStore } from "../store/useCartStore"
import { AspectRatio } from "./ui/aspect-ratio"
import PageLoader from "./PageLoader"

function RestaurantDetails() {
  const { getSingleRestaurantDetails, singleRestaurant } = useRestaurantStore();
  const { addToCart, viewCartItems, FullPageLoader } = useCartStore();
  const params = useParams();

  useEffect(() => {
    getSingleRestaurantDetails(params?.id);
  }, [params?.id]);

  return (
    <div className="max-w-screen-2xl mx-auto min-h-screen px-3">
      <div className="mt-10 h-[300px] shadow-2xl max-md:h-[250px] max-sm:h-[150px]">
        <img src={singleRestaurant?.imageUrl} className="object-cover h-full w-full" />
      </div>
      <h1 className="font-bold text-2xl mt-5">{singleRestaurant?.restaurantName}</h1>
      <div className="flex gap-3 flex-wrap mt-3">
        {
          singleRestaurant?.cuisines.map((items: any, index: any) => {
            return (
              <Badge key={index} className="text-[18px] px-[10px] py-0">{items}</Badge>
            )
          })
        }
      </div>

      <div className="flex items-center mt-5">
        <Timer size={26} />
        <p className="text-xl ml-3">Delivery Time : {" "} <span className="text-orange font-bold text-xl">{singleRestaurant?.deliveryTime} mins</span></p>
      </div>

      <div>
        <h1 className="font-bold text-2xl mt-5">Available Menus</h1>
        <div className="flex flex-wrap justify-between max-md:justify-center gap-5">

          {
            singleRestaurant?.menus.map((eachMenu: any, index: any) => {
              return (
                <Card key={index} className="bg-white w-[340px] overflow-hidden dark:bg-gray-800 mt-5 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-slate-400">
                  <AspectRatio ratio={16 / 9} className="w-full">
                    <img src={eachMenu?.image} className="object-cover w-full h-full" />
                  </AspectRatio>

                  <CardContent className="mt-4 pl-3">
                    <h1 className="text-2xl font-bold">{eachMenu?.menuName} ( Dish )</h1>
                    <p className="font-semibold" >
                      {eachMenu?.description}
                    </p>
                    <h1 className="text-[17px] font-semibold">Price : <span className="text-orange font-bold">₹{" "}{eachMenu?.sellingPrice}</span></h1>
                    <h1 className="text-[17px] font-semibold">Restaurant : <span className="text-orange font-bold">{" "}{eachMenu?.restaurantName}</span></h1>

                  </CardContent>
                  <CardFooter className="flex justify-end mt-2">
                    {
                      FullPageLoader ? <><PageLoader /></> : <> <Button
                        className="text-xl bg-orange hover:bg-hoverOrange w-full"
                        onClick={async () => {
                          const addresponsesearchPage = await addToCart(eachMenu?._id);
                          if (addresponsesearchPage?.success) {
                            viewCartItems();
                          }
                        }}
                      >Add to Cart
                      </Button></>
                    }

                    {/* <Button
                      className="text-xl bg-orange hover:bg-hoverOrange w-full"
                      onClick={async () => {
                        const addresponse = await addToCart(eachMenu?._id);
                        if (addresponse.success) {
                          viewCartItems();
                        }
                      }}
                    >Add to Cart
                    </Button> */}

                  </CardFooter>
                </Card>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default RestaurantDetails