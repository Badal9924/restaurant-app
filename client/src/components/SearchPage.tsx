import { Link, useParams } from "react-router-dom"
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { useRestaurantStore } from "../store/useRestaurantStore";
import { useCartStore } from "../store/useCartStore";
import PageLoader from "./PageLoader";

function SearchPage() {
    const { searchRestaurant, appliedFilter, setAppliedFilter, searchedRestaurant, searchedMenuList } = useRestaurantStore();
    const { addToCart, viewCartItems, FullPageLoader } = useCartStore();
    const params = useParams();
    const [Searchquery, SetsearchQuery] = useState<string>("");

    useEffect(() => {
        searchRestaurant(params?.searchText, Searchquery, appliedFilter);
    }, [appliedFilter, params?.searchText]);

    return (
        <div className="min-h-screen max-w-screen-2xl px-3 mx-auto py-2 flex gap-3 mt-10 max-lg:flex-col">
            <div>
                <FilterPage />
            </div>

            <div className="flex-1">
                <div className="flex gap-3 max-lg:justify-center">
                    <Input
                        value={Searchquery}
                        onChange={(e) => SetsearchQuery(e.target.value)}
                        placeholder="Search by restaurant & cuisines & menu"
                        className="pl-[20px] text-xl focus-visible:ring-1 focus:border-none border-slate-400"
                    />
                    <Button
                        onClick={() => {
                            searchRestaurant(params?.searchText, Searchquery, appliedFilter);
                        }}
                        className="bg-orange hover:bg-hoverOrange text-xl">
                        Search
                    </Button>
                </div>

                <div >
                    <h1 className="mt-4 text-xl">
                        {
                            searchedRestaurant?.length !== 0 ? `` : "No Result Found "
                        }
                    </h1>
                    <div className="mt-4 flex flex-wrap gap-5">
                        {
                            appliedFilter?.map((eachItem : any, Index : any) => (
                                <Badge
                                    key={Index}
                                    className="text-[#D19254] rounded-md cursor-pointer whitespace-nowrap text-[16px] border-slate-400" variant="outline">
                                    {eachItem}
                                    <X
                                        onClick={() => setAppliedFilter(eachItem)}
                                        size={16}
                                        className="text-[#D19254] cursor-pointer ml-1 hover:text-red-500" />
                                </Badge>
                            ))
                        }

                    </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-between max-lg:justify-center">

                    {
                        searchedRestaurant?.map((eachCard : any, index : any) => {
                            return (
                                <Card key={index} className="bg-white w-[340px] max-h-[430px] overflow-hidden dark:bg-gray-800 mt-5 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-slate-400">
                                    <div className="w-full relative">
                                        <AspectRatio ratio={16 / 7} className="w-full">
                                            <img src={eachCard.imageUrl} className="object-cover w-full h-full" />
                                        </AspectRatio>
                                        <p className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1 font-semibold">Featured</p>
                                    </div>

                                    <CardContent className="mt-1 pl-3">
                                        <h1 className="text-[20px] font-bold">{eachCard?.restaurantName} (Restaurant)</h1>
                                        <div>
                                            <p className="flex items-center mt-3  font-semibold" >
                                                <MapPin className="mr-2" />City : {eachCard?.city}
                                            </p>
                                            <p className="flex items-center mt-3  font-semibold">
                                                <Globe className="mr-2" />Country : {eachCard?.country}
                                            </p>
                                        </div>


                                        <div className="mt-3 flex gap-2 flex-wrap">
                                            {
                                                eachCard.cuisines?.map((eachItem : any, Index : any) => (
                                                    <Badge
                                                        key={Index}
                                                        className="cursor-pointer whitespace-nowrap text-[16px] border-slate-400 hover:bg-*">
                                                        {eachItem}
                                                    </Badge>
                                                ))
                                            }
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end mt-2">
                                        <Link to={`/restaurant/${eachCard?._id}`}>
                                            <Button className="text-xl rounded-[20px] bg-orange hover:bg-hoverOrange">View Menu</Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            )
                        })
                    }


                    {
                        searchedMenuList?.map((eachMenu :any, index :any) => {
                            return (
                                <Card key={index} className="bg-white w-[340px] overflow-hidden dark:bg-gray-800 mt-5 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-slate-400">

                                    <AspectRatio ratio={16 / 9} className="w-full">
                                        <img src={eachMenu?.image} className="object-cover w-full h-full" />
                                    </AspectRatio>

                                    <CardContent className="mt-4 pl-3">
                                        <h1 className="text-[20px] font-bold">{eachMenu?.menuName}  ( Dish )</h1>
                                        <p className="text-[16px]" >
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

export default SearchPage