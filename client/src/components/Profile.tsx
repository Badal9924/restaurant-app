import { useRef, useState } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Loader2, LocateIcon, Mail, MapPin, MapPinnedIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useUserStore } from "../store/useUserStore"

function Profile() {
    const { user, updateProfile, loading } = useUserStore();
    const imageRef = useRef<HTMLInputElement | null>(null)

    const [profileData, setProfileData] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        city: user?.city || "",
        state: user?.state || "",
        pincode: user?.pincode || "",
        country: user?.country || "",
        profilePicture: user?.profilePicture || ""
    })

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }))
    }

    async function updateProfileHandler(e:any) {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("fullName", profileData.fullName);
            formData.append("email", profileData.email);
            formData.append("phone", profileData.phone);
            formData.append("address", profileData.address);
            formData.append("city", profileData.city);
            formData.append("state", profileData.state);
            formData.append("pincode", profileData.pincode);
            formData.append("country", profileData.country);

            if (profileData.profilePicture) {
                formData.append("profilePicture", profileData.profilePicture)
            }

            await updateProfile(formData);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen max-w-screen-2xl px-3 mx-auto">
            <div className="max-w-[1236px] mx-auto min-h-[500px] mt-11 px-3 py-3">
                <form action="" onSubmit={(e) => updateProfileHandler(e)}>
                    <div className="flex gap-5 items-center mb-2">
                        <label htmlFor="profile_pic">
                            <Avatar className="cursor-pointer h-[120px] w-[120px] bg-gray-200 max-sm:h-[80px] max-sm:w-[80px]">
                                <AvatarImage src={user?.profilePicture} className="h-[100%] w-[100%] object-cover rounded-full" />
                                <AvatarFallback>CN</AvatarFallback>
                                <Input
                                    ref={imageRef}
                                    className="hidden"
                                    id="profile_pic"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            profilePicture: e.target.files?.[0],
                                        })
                                    }
                                />
                            </Avatar>
                        </label>
                        <Input
                            value={profileData.fullName}
                            onChange={changeHandler}
                            type="text"
                            name="fullName"
                            placeholder="Enter Your Name"
                            className="bg-gray-200 font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
                        />
                    </div>

                    <div>
                        <div className="mb-3 flex items-center rounded-[7px] bg-gray-200 mt-3 pl-3 gap-3 h-[70px]">
                            <Mail className="h-[30px] w-[30px]" />
                            <div className="w-full relative h-full pl-1">
                                <Label className="absolute top-2 font-bold text-[18px]">Email</Label>
                                <input
                                    disabled
                                    name="email"
                                    value={profileData.email}
                                    onChange={changeHandler}
                                    type="text"
                                    className="w-full font-bold h-full bg-transparent text-gray-600 focus-visible:border-none text-xl pt-7 pl-0 border-none outline-none"

                                />
                            </div>

                        </div>

                        <div className="mb-3 flex items-center rounded-[7px] bg-gray-200 mt-3 pl-3 gap-3 h-[70px]">
                            <LocateIcon className="h-[30px] w-[30px]" />
                            <div className="w-full relative h-full pl-1">
                                <Label className="absolute top-2 font-bold text-[18px]">Address</Label>
                                <input
                                required
                                    name="address"
                                    value={profileData.address}
                                    onChange={changeHandler}
                                    placeholder="Enter your Address"
                                    type="text"
                                    className="w-full font-bold h-full bg-transparent text-gray-600 focus-visible:border-none text-xl pt-7 pl-0 border-none outline-none"

                                />
                            </div>

                        </div>

                        <div className="mb-3 flex justify-between max-lg:flex-col">

                            <div className="flex items-center rounded-[7px] bg-gray-200 mt-3 pl-3 gap-3 h-[70px]">
                                <MapPin className="h-[30px] w-[30px]" />
                                <div className="w-full relative h-full pl-1">
                                    <Label className="absolute top-2 font-bold text-[18px]">City</Label>
                                    <input
                                    required
                                        name="city"
                                        value={profileData.city}
                                        onChange={changeHandler}
                                        type="text"
                                        placeholder="Enter your City"
                                        className="w-full font-bold h-full bg-transparent text-gray-600 focus-visible:border-none text-xl pt-7 pl-0 border-none outline-none"

                                    />
                                </div>

                            </div>

                            <div className="flex items-center rounded-[7px] bg-gray-200 mt-3 pl-3 gap-3 h-[70px]">
                                <MapPin className="h-[30px] w-[30px]" />
                                <div className="w-full relative h-full pl-1">
                                    <Label className="absolute top-2 font-bold text-[18px]">State</Label>
                                    <input
                                    required
                                    placeholder="Enter Your State"
                                        name="state"
                                        value={profileData.state}
                                        onChange={changeHandler}
                                        type="text"
                                        className="w-full font-bold h-full bg-transparent text-gray-600 focus-visible:border-none text-xl pt-7 pl-0 border-none outline-none"

                                    />
                                </div>

                            </div>

                            <div className="flex items-center rounded-[7px] bg-gray-200 mt-3 pl-3 gap-3 h-[70px]">
                                <MapPin className="h-[30px] w-[30px]" />
                                <div className="w-full relative h-full pl-1">
                                    <Label className="absolute top-2 font-bold text-[18px]">Pincode</Label>
                                    <input
                                    required
                                    placeholder="Enter your pin"
                                        name="pincode"
                                        value={profileData.pincode}
                                        onChange={changeHandler}
                                        type="text"
                                        className="w-full font-bold h-full bg-transparent text-gray-600 focus-visible:border-none text-xl pt-7 pl-0 border-none outline-none"

                                    />
                                </div>

                            </div>


                        </div>

                        <div className="mb-3 flex items-center rounded-[7px] bg-gray-200 mt-3 pl-3 gap-3 h-[70px]">
                            <MapPinnedIcon className="h-[30px] w-[30px]" />
                            <div className="w-full relative h-full pl-1">
                                <Label className="absolute top-2 font-bold text-[18px]">Country</Label>
                                <input
                                required
                                placeholder="Enter Your Country Name"
                                    name="country"
                                    value={profileData.country}
                                    onChange={changeHandler}
                                    type="text"
                                    className="w-full font-bold h-full bg-transparent text-gray-600 focus-visible:border-none text-xl pt-7 pl-0 border-none outline-none"

                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-2">
                        {
                            loading ?
                                <Button disabled className="w-[60%] text-xl bg-orange hover:bg-hoverOrange">
                                    <Loader2 className="mr-3 animate-spin" /> Please Wait
                                </Button> :
                                <Button type="submit" className="w-[60%] text-xl bg-orange hover:bg-hoverOrange">Update</Button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile