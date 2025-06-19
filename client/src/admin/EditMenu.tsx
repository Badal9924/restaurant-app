import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Button } from "../components/ui/button";
import { RiUploadCloudFill } from "react-icons/ri";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { DeleteIcon, Loader2 } from "lucide-react";
import { useMenuStore } from "../store/useMenuStore";
import { useRestaurantStore } from "../store/useRestaurantStore";
// import { useParams } from "react-router-dom";

function EditMenu({ editOpen, setEditOpen }: {
    editOpen: boolean;
    setEditOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const urlParams = new URLSearchParams(window.location.search);
    const { editMenu } = useMenuStore();
    const { getRestaurantData } = useRestaurantStore()
    const loading = false;
    const [input, setInput] = useState<{
        menuName: string;
        restaurantName: string;
        description: string;
        sellingPrice: string;
        costPrice: string;
        cuisine: string;
        image: File | undefined;
    }>({
        menuName: "",
        restaurantName: "",
        description: "",
        sellingPrice: "",
        costPrice: "",
        cuisine: "",
        image: undefined
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }))
    }

    const submitHandler = async (e: any) => {
        e.preventDefault();
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

        await editMenu(urlParams?.get('id') || "", formData);
        await getRestaurantData();
    }

    return (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Edit Menu</DialogTitle>
                    <DialogDescription className="text-center">
                        Update your menu to keep your offerings fresh and exciting!
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
                                    *No image Uploaded
                                </p>
                            ) : (

                                <div
                                    className="relative shrink-0 h-[160px] w-[140px] mb-3 border-solid border-slate-300 rounded-[10px] overflow-hidden group"
                                    id="product_img"
                                >
                                    <img
                                        src={input.image ? URL.createObjectURL(input.image) : ""}
                                        className="max-w-[100%] max-h-[100%] bg-slate-200 cursor-pointer"

                                    />
                                    <div
                                        className="bg-red-600 text-white absolute bottom-1 right-1 h-[40px] w-[40px] rounded-full flex justify-center items-center transition-all scale-0 duration-300 group-hover:scale-100 cursor-pointer"
                                    >
                                        <DeleteIcon size={25} />
                                    </div>
                                </div>

                            )
                        }
                    </div>
                    {
                        loading ? <Button disabled className="mt-4 bg-orange hover:bg-hoverOrange text-xl w-full">
                            <Loader2 className="mr-3 animate-spin" />  Please wait</Button>
                            : <Button className="mt-4 bg-orange hover:bg-hoverOrange text-xl w-full">Update</Button>

                    }
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditMenu;