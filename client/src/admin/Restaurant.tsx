import { FormEvent, useEffect, useState } from "react"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { Loader2 } from "lucide-react";
import { useRestaurantStore } from "../store/useRestaurantStore";
type RestaurantData = {
    restaurantName: string;
    country: string;
    cuisines: string[];
    city: string;
    deliveryTime: string;
    contact: string;
    email: string;
    state: string;
    pinCode: string;
    imageFile?: File;
};

function Restaurant() {
    const { loading, restaurant, updateRestaurant, getRestaurantData, ceateRestaurantData } = useRestaurantStore()
    const [restaurantData, setRestaurantData] = useState<RestaurantData>({
        restaurantName: "",
        country: "",
        cuisines: [],
        city: "",
        deliveryTime: "",
        contact: "",
        email: "",
        state: "",
        pinCode: "",
        imageFile: undefined
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRestaurantData((prev) => ({ ...prev, [name]: value }))
    }

    const submitHandler = async (e: FormEvent) => {
        try {
            e.preventDefault();

            // API implementation :)
            const formData = new FormData();
            formData.append("restaurantName", restaurantData.restaurantName);
            formData.append("city", restaurantData.city);
            formData.append("country", restaurantData.country);
            formData.append("deliveryTime", restaurantData.deliveryTime.toString());
            formData.append("contact", restaurantData.contact);
            formData.append("email", restaurantData.email);
            formData.append("state", restaurantData.state);
            formData.append("pinCode", restaurantData.pinCode);
            formData.append("cuisines", JSON.stringify(restaurantData.cuisines));

            if (restaurantData.imageFile) {
                formData.append("imageFile", restaurantData.imageFile);
            }

            if (restaurant) {
                // Update
                await updateRestaurant(formData);
            } else {
                // create
                await ceateRestaurantData(formData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchRestaurant = async () => {
            await getRestaurantData();
        }
        fetchRestaurant();
    }, []);

    useEffect(() => {
        if (!restaurant) {
            return
        } else {
            setRestaurantData((prev) => ({
                ...prev,
                restaurantName: restaurant?.restaurantName || "",
                country: restaurant?.country || "",
                cuisines: restaurant?.cuisines ? restaurant.cuisines?.map((eachCuisines: any) => eachCuisines) : [],
                city: restaurant?.city || "",
                deliveryTime: restaurant?.deliveryTime || "",
                contact: restaurant?.contact || "",
                email: restaurant?.email || "",
                state: restaurant?.state || "",
                pinCode: restaurant?.pinCode || "",
                imageFile: undefined
            }))
        }
    }, [restaurant]);

    return (
        <div className="min-h-screen max-w-screen-2xl mx-auto px-3">
            <div className="text-center mt-10 mb-4">
                <h1 className="text-2xl font-bold">
                    {
                        restaurant ? "Update Your Restaurant" : "Add Restaurant"
                    }
                </h1>
            </div>
            <form action="" onSubmit={submitHandler}>
                <div className="flex justify-center gap-10 max-lg:gap-5 max-md:flex-col max-md:items-center">
                    <div className="w-[45%] max-lg:w-[50%] max-md:w-[95%]">
                        <div className="mb-5">
                            <Label htmlFor="restaurant_name" className="text-xl max-sm:text-[17px]">Restaurant Name</Label>
                            <Input
                                type="text"
                                name="restaurantName"
                                placeholder="Enter the name of your restaurant.."
                                value={restaurantData.restaurantName}
                                onChange={changeHandler}
                                id="restaurant_name"
                                className="text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[17px]"
                            />
                        </div>

                        <div className="mb-5">
                            <Label htmlFor="contact" className="text-xl max-sm:text-[17px]">Contact</Label>
                            <Input
                                type="number"
                                name="contact"
                                placeholder="Enter your number.."
                                value={restaurantData.contact}
                                onChange={changeHandler}
                                id="contact"
                                className="text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[17px]"
                            />
                        </div>

                        <div className="mb-5">
                            <Label htmlFor="country" className="text-xl max-sm:text-[17px]">Country</Label>
                            <Input
                                type="text"
                                name="country"
                                placeholder="Enter your country name"
                                value={restaurantData.country}
                                onChange={changeHandler}
                                id="country"
                                className="text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[17px]"
                            />
                        </div>



                        <div className="mb-5">
                            <Label htmlFor="pinCode" className="text-xl max-sm:text-[17px]">Pin Code</Label>
                            <Input
                                type="text"
                                name="pinCode"
                                placeholder="Enter your Pin Code"
                                value={restaurantData.pinCode}
                                onChange={changeHandler}
                                id="pinCode"
                                className="text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[17px]"
                            />
                        </div>




                        <div className="mb-5">
                            <Label htmlFor="cuisines" className="text-xl max-sm:text-[17px]">Cuisines</Label>
                            <Input
                                type="text"
                                name="cuisines"
                                placeholder="Enter your cuisines.."
                                value={restaurantData.cuisines}
                                // onChange={changeHandler}
                                onChange={(e) =>
                                    setRestaurantData({ ...restaurantData, cuisines: e.target.value.split(",") })
                                }
                                id="cuisines"
                                className="text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[17px]"
                            />
                        </div>
                    </div>

                    <div className="w-[45%] max-lg:w-[50%] max-md:mt-[-19px] max-md:w-[95%]">
                        <div className="mb-5">
                            <Label htmlFor="city" className="text-xl max-sm:text-[17px]">City</Label>
                            <Input
                                type="text"
                                name="city"
                                placeholder="Enter your city.."
                                value={restaurantData.city}
                                onChange={changeHandler}
                                id="city"
                                className="text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[17px]"
                            />
                        </div>


                        <div className="mb-5">
                            <Label htmlFor="state" className="text-xl max-sm:text-[17px]">State</Label>
                            <Input
                                type="text"
                                name="state"
                                placeholder="Enter your State Name.."
                                value={restaurantData.state}
                                onChange={changeHandler}
                                id="state"
                                className="text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[17px]"
                            />
                        </div>


                        <div className="mb-5">
                            <Label htmlFor="cuisines" className="text-xl max-sm:text-[17px]">Email</Label>
                            <Input
                                type="text"
                                name="email"
                                placeholder="Enter your email.."
                                value={restaurantData.email}
                                onChange={changeHandler}
                                id="email"
                                className="text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[17px]"
                            />
                        </div>

                        <div className="mb-5">
                            <Label htmlFor="deliveryTime" className="text-xl max-sm:text-[17px]">Delivery Time</Label>
                            <Input
                                type="number"
                                name="deliveryTime"
                                placeholder="Time Taken for Delivery"
                                value={restaurantData.deliveryTime}
                                onChange={changeHandler}
                                id="deliveryTime"
                                className="text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[17px]"
                            />
                        </div>

                        <div className="mb-5">
                            <Label htmlFor="upload_banner" className="text-xl max-sm:text-[17px]">Upload Restaurant Banner</Label>
                            <Input
                                type="file"
                                name="imageFile"
                                // value={restaurantData.imageFile}
                                onChange={(e) =>
                                    setRestaurantData({
                                        ...restaurantData,
                                        imageFile: e.target.files?.[0],
                                    })
                                }
                                id="upload_banner"
                                accept="image/*"
                                className="text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[17px]"
                            />
                        </div>
                    </div>

                </div>
                <div className="text-center mt-3">
                    {
                        loading ? <Button disabled className="text-xl bg-orange hover:bg-hoverOrange"><Loader2 className="mr-4 animate-spin" /> Please Wait</Button> :
                            <Button className="text-xl bg-orange hover:bg-hoverOrange">
                                {
                                    restaurant ? "Update Your Restaurant" : "Add Restaurant"
                                }
                            </Button>
                    }
                </div>
            </form>
        </div>
    )
}

export default Restaurant