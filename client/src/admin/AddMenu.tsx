import { Loader2, Plus } from "lucide-react";
import { RiUploadCloudFill } from "react-icons/ri";
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useEffect, useState } from "react";
import EditMenu from "./EditMenu";
import { useMenuStore } from "../store/useMenuStore";
import { useRestaurantStore } from "../store/useRestaurantStore";
import { Link } from "react-router-dom";

type inputData = {
    restaurantName: string;
    cuisine : string;
    menuName: string;
    description: string;
    sellingPrice: string;
    costPrice: string;
    image?: File;
};

function AddMenu() {
    const { restaurant, getRestaurantData } = useRestaurantStore();
    const { loading, createMenu, Editloading } = useMenuStore()
    const [editOpen, setEditOpen] = useState<boolean>(false)

    const [input, setInput] = useState<inputData>({
        menuName: "",
        restaurantName: "",
        cuisine : "",
        description: "",
        sellingPrice: "",
        costPrice: "",
        image: undefined
    });
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }))
    }

    const submitHandler = async (e: any) => {
        try {
            e.preventDefault();
            // API implementation :)
            const formData = new FormData();
            formData.append("restaurantName", input.restaurantName);
            formData.append("menuName", input.menuName);
            formData.append("description", input.description);
            formData.append("sellingPrice", input.sellingPrice);
            formData.append("costPrice", input.costPrice);
            formData.append("cuisine", input.cuisine);

            if (input.image) {
                formData.append("image", input.image);
            }
            await createMenu(formData);
            await getRestaurantData();

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRestaurantData();
    }, [])

    return (
        <div className="min-h-screen max-w-screen-2xl mx-auto px-3">
            <div className="mt-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold max-md:text-[18px]">Available Menus</h1>
                {
                    loading ? <Button disabled className="bg-orange hover:bg-hoverOrange text-xl max-md:text-[16px]">
                        <Loader2 className="mr-3 animate-spin max-md:mr-1" /> Please Wait
                    </Button> :
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-orange hover:bg-hoverOrange text-xl max-md:text-[16px]">
                                    <Plus className="mr-1" /> Add Menus
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-center">Add a new Menu</DialogTitle>
                                    <DialogDescription className="text-center">
                                        Create a Menu that will make your restaurant stand out.
                                    </DialogDescription>
                                </DialogHeader>
                                <form action="" onSubmit={submitHandler}>
                                    <div className="mb-5">
                                        <Label htmlFor="menuName" className="text-xl mb-3 max-sm:text-[17px]">Name</Label>
                                        <Input
                                            type="text"
                                            name="menuName"
                                            placeholder="Enter Menu name"
                                            value={input.menuName}
                                            onChange={changeHandler}
                                            id="menuName"
                                            className="text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[17px]"
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <Label htmlFor="restaurantName" className="text-xl mb-3 max-sm:text-[17px]">Restaurant Name</Label>
                                        <Input
                                            type="text"
                                            name="restaurantName"
                                            placeholder="Enter Menu name"
                                            value={input.restaurantName}
                                            onChange={changeHandler}
                                            id="restaurantName"
                                            className="text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[17px]"
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <Label htmlFor="cuisine" className="text-xl mb-3 max-sm:text-[17px]">Cuisine Name</Label>
                                        <Input
                                            type="text"
                                            name="cuisine"
                                            placeholder="Enter Cuisine name"
                                            value={input.cuisine}
                                            onChange={changeHandler}
                                            id="cuisine"
                                            className="text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[17px]"
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <Label htmlFor="costPrice" className="text-xl mb-3 max-sm:text-[17px]">Cost Price</Label>
                                        <Input
                                            type="number"
                                            name="costPrice"
                                            placeholder="Enter the Cost Price"
                                            value={input.costPrice}
                                            onChange={changeHandler}
                                            id="menuName"
                                            className="text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[17px]"
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <Label htmlFor="sellingPrice" className="text-xl mb-3 max-sm:text-[17px]">Selling Price</Label>
                                        <Input
                                            type="number"
                                            name="sellingPrice"
                                            placeholder="Enter the Cost Price"
                                            value={input.sellingPrice}
                                            onChange={changeHandler}
                                            id="sellingPrice"
                                            className="text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[17px]"
                                        />
                                    </div>

                                    <div className="flex flex-col mb-5">
                                        <label htmlFor="description" className="text-xl cursor-pointer">
                                            Description :
                                        </label>
                                        <textarea
                                            name="description"
                                            id="description"
                                            value={input.description}
                                            placeholder="enter product description..."
                                            onChange={changeHandler}
                                            className="resize-none bg-slate-200 h-28 text-xl p-[7px]"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xl mb-[4px]">Menu Image :</label>
                                        <label htmlFor="upload_image">
                                            <div className="bg-slate-200 h-[160px] cursor-pointer flex justify-center items-center">
                                                <div className="flex flex-col justify-center items-center">
                                                    <RiUploadCloudFill size={50} color="grey" />
                                                    <p className="text-center">Upload Product Image</p>
                                                    <input
                                                        type="file"
                                                        id="upload_image"
                                                        className="hidden"
                                                        onChange={(e) =>
                                                            setInput({
                                                                ...input,
                                                                image: e.target.files?.[0],
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="flex overflow-x-auto gap-4 mt-4">
                                        {
                                            !input.image ? (
                                                <p className="text-sm text-red-700 text-bold">
                                                    *Please Upload Menu Image
                                                </p>
                                            ) : (
                                                ""
                                               

                                            )
                                        }
                                    </div>

                                    <Button className="mt-4 bg-orange hover:bg-hoverOrange text-xl w-full">Submit</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                }
            </div>

            <div className="flex justify-between gap-5 flex-wrap mt-4 max-md:justify-center">
                {
                    restaurant?.menus?.map((card :any, index :any) => {
                        return (

                            <Card key={index} className="bg-white w-[340px] overflow-hidden dark:bg-gray-800 mt-5 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-slate-400 max-md:w-[90%]">
                                <div className="w-full h-[190px] max-md:h-[150px]">
                                    <img src={card.image} className="object-cover w-full h-full" />
                                </div>

                                <CardContent className="mt-4 pl-3">
                                    <h1 className="text-2xl font-bold">{card.menuName}</h1>
                                    <p className="font-semibold" >
                                        {card.description}
                                    </p>
                                    <h1 className="text-2xl font-semibold">Price : <span className="text-orange font-bold">₹{" "}{card.sellingPrice}</span></h1>

                                </CardContent>
                                <CardFooter className="flex justify-end mt-2">
                                    {
                                        Editloading ? <Button disabled className="text-xl bg-orange hover:bg-hoverOrange w-full "><Loader2 className="mr-4 animate-spin" /> Please Wait</Button> :
                                            <Link to={`/admin/menu/?id=${card?._id}`} className="block text-xl bg-orange hover:bg-hoverOrange w-full" onClick={async () => setEditOpen(true)

                                            }>
                                                <Button
                                                    className="text-xl bg-orange hover:bg-hoverOrange w-full">
                                                    Edit
                                                </Button>
                                            </Link>
                                    }
                                </CardFooter>
                            </Card>
                        )
                    })
                }
            </div>

            <EditMenu
                editOpen={editOpen}
                setEditOpen={setEditOpen}
            />
        </div>
    )
}

export default AddMenu