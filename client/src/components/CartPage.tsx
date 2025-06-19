import { Minus, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table"
import { useEffect, useState } from "react"
import CheckOutPopUp from "./CheckOutPopUp"
import { useCartStore } from "../store/useCartStore"

function CartPage() {
    const { cart, viewCartItems, IncreaseCartItems, decreaseCartItems, deleteCartItem } = useCartStore();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const totalAmount = cart.reduce((accu: any, eachItem: any) => {
        return accu + (+eachItem?.menuId?.sellingPrice * eachItem.quantity);
    }, 0);

    useEffect(() => {
        viewCartItems();
    }, []);

    return (
        <div className="min-h-screen max-w-screen-2xl mx-auto px-3">
            {
                cart.length === 0 ? <div className="text-4xl font-bold flex justify-center mt-6"><h1 className="">You have no any Item in Cart... </h1></div> : <>

                    <Table className="mt-4">
                        <TableHeader className="text-xl font-bold">
                            <TableRow>
                                <TableHead className="text-center">Items</TableHead>
                                <TableHead className="text-center">Title</TableHead>
                                <TableHead className="text-center">Price</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-center">Total</TableHead>
                                <TableHead className="text-center">Remove</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="text-xl text-center">
                            {
                                cart?.map((eachItem :any, index :any) => (
                                    <TableRow key={index}>
                                        <TableCell className="flex justify-center">
                                            <Avatar>
                                                <AvatarImage src={eachItem?.menuId?.image} className="object-cover w-full h-full" />
                                                <AvatarFallback className="bg-gray-200">CN</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>{eachItem?.menuId?.menuName}</TableCell>
                                        <TableCell>₹{" "}{eachItem?.menuId?.sellingPrice}</TableCell>
                                        <TableCell className="flex justify-center">
                                            <div className="flex justify-center items-center rounded-full w-fit shadow-lg border-[1px] border-solid border-slate-300">
                                                <Button
                                                    onClick={async () => {

                                                        if (eachItem.quantity == 1) {
                                                            const rs_del = await deleteCartItem(eachItem?._id);
                                                            if (rs_del.success) {
                                                                await viewCartItems();
                                                            }
                                                            return
                                                        }

                                                        const rs = await decreaseCartItems(eachItem?._id, eachItem?.quantity);
                                                        if (rs.success) {
                                                            viewCartItems();
                                                        }

                                                    }}
                                                    size={"icon"}
                                                    className="text-black rounded-full bg-gray-300 hover:bg-gray-400"
                                                >
                                                    <Minus />
                                                </Button>
                                                <Button
                                                    disabled
                                                    variant={"outline"} className="text-2xl"
                                                >
                                                    {eachItem?.quantity}
                                                </Button>
                                                <Button
                                                    size={"icon"}
                                                    className="text-black rounded-full bg-orange hover:bg-hoverOrange"
                                                    onClick={async () => {
                                                        const rs = await IncreaseCartItems(eachItem?._id, eachItem?.quantity);
                                                        if (rs.success) {
                                                            viewCartItems();
                                                        }
                                                    }}
                                                >
                                                    <Plus />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>₹{" "}{+eachItem?.quantity * +eachItem?.menuId?.sellingPrice}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={async () => {
                                                    const rs = await deleteCartItem(eachItem?._id);
                                                    if (rs.success) {
                                                        await viewCartItems();
                                                    }
                                                }}
                                                className="bg-orange hover:bg-hoverOrange text-xl">Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                        <TableFooter>
                            <TableCell colSpan={5} className="text-xl text-left">Total</TableCell>
                            <TableCell className="text-xl text-center">₹{" "}{totalAmount}</TableCell>
                        </TableFooter>
                    </Table>
                    <div className="flex justify-center mt-5">
                        <Button
                            onClick={() => setOpenDialog(true)}
                            className="bg-orange hover:bg-hoverOrange text-xl">
                            Proceed To Checkout
                        </Button>
                    </div>
                    <CheckOutPopUp open={openDialog} setOpenDialog={setOpenDialog} />
                </>
            }
        </div >
    )
}

export default CartPage