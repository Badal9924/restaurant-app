import { Link } from "react-router-dom";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    // MenubarShortcut,
    MenubarTrigger,
} from "./ui/menubar";

import {
    Sheet,
    // SheetClose,
    SheetContent,
    SheetDescription,
    // SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";


import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { Button } from "./ui/button";
import { HandPlatter, Loader2, Menu, PackageCheck, ShoppingCart, SquareMenu, User, User2, UtensilsCrossed } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";
import { useEffect } from "react";

function Navbar() {
    const { user, loading, logout } = useUserStore();
    const { cart, viewCartItems } = useCartStore();

    useEffect(() => {
        viewCartItems();
    }, [])

    return (
        <nav id="navbar" className="shadow-xl max-w-screen-2xl px-3 mx-auto flex justify-between items-center py-2">
            <Link to="/">
                <h1 className="text-2xl font-bold">Fomato</h1>
            </Link>
            <div className="flex gap-3">
                <div className="flex items-center gap-5 text-xl max-lg:gap-3 max-lg:text-[18px] max-md:hidden">
                    <Link to="/">Home</Link>
                    <Link to="/profile">
                        <Avatar>
                            <AvatarImage src={user?.profilePicture} className="h-[100%] w-[100%] object-cover rounded-full"/>
                            <AvatarFallback className="bg-slate-300">
                                <User2/>
                            </AvatarFallback>
                        </Avatar>
                    </Link>
                    <Link to="/order/status">Order</Link>

                    {/* Admin Dashboard */}
                    <div>
                        {
                            user?.admin && (
                                <Menubar>
                                    <MenubarMenu>
                                        <MenubarTrigger className="text-xl">Dashboard</MenubarTrigger>
                                        <MenubarContent>
                                            <MenubarItem className="text-xl cursor-pointer"><Link to='/admin/restaurant'>Restaurant</Link></MenubarItem>
                                            <MenubarSeparator />
                                            <MenubarItem className="text-xl cursor-pointer"><Link to='/admin/menu'>Menu</Link></MenubarItem>
                                            <MenubarSeparator />
                                            <MenubarItem className="text-xl cursor-pointer"><Link to='/admin/orders'>Restaurant Orders</Link></MenubarItem>
                                            <MenubarSeparator />
                                        </MenubarContent>
                                    </MenubarMenu>
                                </Menubar>

                            )
                        }
                    </div>


                    {/* Theme dropdown */}
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Sun className="h-6" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="text-xl">Light</DropdownMenuItem>
                            <DropdownMenuItem className="text-xl">Dark</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}

                    {/* Cart Logo */}
                    <Link to="/cart" className="relative">
                        <ShoppingCart />
                        {
                            cart.length > 0 ?
                                <Button size={"icon"} className="bg-red-500 absolute top-[-17px] rounded-[50%] h-[22px] w-[22px] left-1 text-center p-1">
                                    {cart.length}
                                </Button> : ""
                        }

                    </Link>

                    {/* Logout Button */}
                    {
                        loading ? <Button disabled className="bg-orange hover:bg-hoverOrange text-xl h-[35px] w-[90px]">
                            <Loader2 className="animate-spin" />
                        </Button> : <Button className="bg-orange hover:bg-hoverOrange text-xl h-[35px]" onClick={logout}>Logout</Button>
                    }
                </div>

                {/* Sidebar :) */}
                <div className="hidden max-md:block">
                    <Sheet>
                        <SheetTrigger>
                            <Menu />
                        </SheetTrigger>
                        <SheetContent className="flex flex-col">
                            <SheetHeader className="mt-2 px-2 flex flex-row justify-between items-center">
                                <SheetTitle className="text-xl">Fomato</SheetTitle>
                                {/* <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">
                                            <Sun className="h-6" />
                                        </Button>

                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem className="text-xl">Light</DropdownMenuItem>
                                        <DropdownMenuItem className="text-xl">Dark</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu> */}
                            </SheetHeader>
                            <hr className="border-solid border-slate-400"></hr>
                            <SheetDescription>
                                <Link to="/profile" className="text-xl flex gap-4 hover:bg-gray-200 rounded-[7px] py-2 px-2 items-center hover:text-gray-900">
                                    <User />
                                    <span>Profile</span>
                                </Link>
                                <Link to="/order/status" className="text-xl flex gap-4 hover:bg-gray-200 rounded-[7px] py-2 px-2 items-center hover:text-gray-900">
                                    <HandPlatter />
                                    <span>Order</span>
                                </Link>
                                <Link to="/cart" className="text-xl flex gap-4 hover:bg-gray-200 rounded-[7px] py-2 px-2 items-center hover:text-gray-900">
                                    <ShoppingCart />
                                    <span>Cart ({ cart.length})</span>
                                </Link>
                                {
                                    user.admin && (<>
                                        <Link to="/admin/menu" className="text-xl flex gap-4 hover:bg-gray-200 rounded-[7px] py-2 px-2 items-center hover:text-gray-900">
                                            <SquareMenu />
                                            <span>Menu</span>
                                        </Link>

                                        <Link to="/admin/restaurant" className="text-xl flex gap-4 hover:bg-gray-200 rounded-[7px] py-2 px-2 items-center hover:text-gray-900">
                                            <UtensilsCrossed />
                                            <span>Restaurant</span>
                                        </Link>
                                        <Link to="/admin/orders" className="text-xl flex gap-4 hover:bg-gray-200 rounded-[7px] py-2 px-2 items-center hover:text-gray-900">
                                            <PackageCheck />
                                            <span>Restaurant Orders</span>
                                        </Link>
                                    </>)
                                }

                            </SheetDescription>
                            <div className="flex flex-1 justify-end flex-col gap-2">
                                <div>
                                    {/* <div className="flex items-center gap-4 mb-2">
                                        <Avatar>
                                            <AvatarImage />
                                            <AvatarFallback className="bg-slate-200">CN</AvatarFallback>
                                        </Avatar>
                                    </div> */}

                                    <div>
                                        {loading ? (
                                            <Button className="bg-orange hover:bg-hoverOrange w-full">
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Please wait
                                            </Button>
                                        ) : (
                                            <Button
                                                className="bg-orange hover:bg-hoverOrange w-full"
                                                onClick={logout}
                                            >
                                                Logout
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/*  */}
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}

export default Navbar