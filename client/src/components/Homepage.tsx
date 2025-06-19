import { Button } from "./ui/button"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useCityStore } from "../store/useCityStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


function Homepage() {
  const { getAllCityList, cityList } = useCityStore();
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    getAllCityList();
  }, []);
  return (
    <div className="min-h-screen max-w-screen-2xl px-3 mx-auto py-2 flex justify-center mt-[50px] gap-9 max-md:flex-col max-md:items-center">

      <div className="max-h-[500px] flex flex-col justify-center max-w-[500px]">
        <h1 className="text-5xl font-bold max-md:text-4xl max-sm:text-3xl">Order Food anytime & anywhere..</h1>
        <p className="mt-4 text-xl text-slate-600 max-sm:text-[16px] max-sm:mt-1">
          Hey our Delicious food is waiting for you, we are always near to you.
        </p>

        <div className="relative mt-4 flex items-center gap-2">

          <Select onValueChange={(value) => {
            setSearch(value);
          }}>
            <SelectTrigger className="w-[220px] text-xl border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <SelectValue className="" placeholder="Select Your City" />
            </SelectTrigger>
            <SelectContent>
              {
                cityList?.map((eachCity: any, index: any) => (
                  <SelectItem className="text-xl" key={index} value={eachCity?.city}>{eachCity?.city}</SelectItem>
                ))
              }
              <SelectItem className="text-xl" value="India">India</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => navigate(`/search/${search}`)}
            className="bg-orange hover:bg-hoverOrange text-xl">
            Search
          </Button>
        </div>
      </div>

      <div className="max-h-[500px] flex items-center">
        <img src={assets.pizza} className="border-blue-500 max-w-[480px] w-[100%] min-w-[335px] max-md:max-w-[390px]" />
      </div>

    </div>
  )
}

export default Homepage;