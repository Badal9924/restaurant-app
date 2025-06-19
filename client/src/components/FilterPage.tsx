import { useRestaurantStore } from "../store/useRestaurantStore";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export type FilterOptionState = {
  id: string;
  label: string;
}
const filterOptions: FilterOptionState[] = [
  { id: "Indian", label: "Indian" },  
  { id: "South Indian", label: "South Indian" },  
  { id: "Italian", label: "Italian" },  
  { id: "Chinese", label: "Chinese" },   
  { id: "Japanese", label: "Japanese" },
  { id: "American", label: "American" },
  { id: "Thai", label: "Thai" },
]

function FilterPage() {

  const { setAppliedFilter, resetAppliedFilter } = useRestaurantStore();

  function appliedFilterHandler(filterData: string) {
    setAppliedFilter(filterData);
  }

  return (
    <div className="w-72 px-[10px] max-xl:w-[100%]">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Filter by cuisines</p>
        <Button variant={"link"} className="text-xl" onClick={resetAppliedFilter}>Reset</Button>
      </div>
      <div className="mt-5">
        {
          filterOptions.map((items, index) => {
            return (
              <div className="flex mb-4 items-center gap-2" key={index}>
                <Checkbox
                  onClick={() => appliedFilterHandler(items?.label)}
                checked={
                  JSON.parse(localStorage.getItem("appliedFilter") || "")?.includes(items?.label)
                }
                />
                <Label className="text-xl">{items.label}</Label>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default FilterPage