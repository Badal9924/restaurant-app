import { AspectRatio } from "./ui/aspect-ratio"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

function LoadingSkeleton() {
    return (
        <Card className="bg-white overflow-hidden dark:bg-gray-800 mt-5 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-slate-400">
            <div className="w-full relative">
                <AspectRatio ratio={16 / 7} className="w-full">
                    <Skeleton className="object-cover w-full h-full bg-gray-200 dark:bg-gray-600" />
                </AspectRatio>
                <Skeleton className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1 font-semibold w-[80px] h-[24px] bg-gray-200 dark:bg-gray-600" />
            </div>
            <CardContent className="mt-4 pl-3">
                <Skeleton className="w-[70%] h-[30px] mb-4 bg-gray-200 dark:bg-gray-600" />
                <div>
                    <p className="flex items-center mt-3">
                        <Skeleton className="w-[50%] h-[20px] bg-gray-200 dark:bg-gray-600" />
                    </p>
                    <p className="flex items-center mt-3">
                        <Skeleton className="w-[50%] h-[20px] bg-gray-200 dark:bg-gray-600" />
                    </p>
                </div>

                <div className="mt-3 flex gap-2 flex-wrap">
                    <Skeleton className="w-[70px] h-[30px] rounded-[20px] bg-gray-200 dark:bg-gray-600" />
                    <Skeleton className="w-[70px] h-[30px] rounded-[20px] bg-gray-200 dark:bg-gray-600" />
                    <Skeleton className="w-[70px] h-[30px] rounded-[20px] bg-gray-200 dark:bg-gray-600" />
                </div>
            </CardContent>

            <CardFooter className="flex justify-end mt-2">
                <Skeleton className="text-xl rounded-[20px] w-[100px] h-[40px] bg-gray-200 dark:bg-gray-600" />
            </CardFooter>
        </Card>
    )
}

export default LoadingSkeleton;