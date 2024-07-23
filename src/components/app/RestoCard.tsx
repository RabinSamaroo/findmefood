import { Bell, Check } from "@phosphor-icons/react"
import Image from "next/image"
import { Button } from "~/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel"
import { cn } from "~/lib/utils"

import { Place } from "~/types/Place"

const notifications = [
    {
        title: "Your call has been confirmed.",
        description: "1 hour ago",
    },
    {
        title: "You have a new message!",
        description: "1 hour ago",
    },
    {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },
    {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },
]

type CardProps = React.ComponentProps<typeof Card> & { place: Place }

export function RestoCard({ className, place, ...props }: CardProps) {
    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
                <CardTitle>{place.name}</CardTitle>
                {place.editorial_summary?.overview && <CardDescription>{place.editorial_summary?.overview}</CardDescription>}
            </CardHeader>
            <CardContent className="grid gap-4">
                <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                        {place.photos && place.photos.map((photo, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <Image src={`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photo.photo_reference}`} alt="p" width={100} height={100} className="text-4xl font-semibold">{index + 1}</Image>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* <CarouselPrevious />
                    <CarouselNext /> */}
                </Carousel>
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <Bell className="h-6 w-6" weight="bold" />
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Push Notifications
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Send notifications to device.
                        </p>
                    </div>
                </div>
                <div>
                    {notifications.map((notification, index) => (
                        <div
                            key={index}
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {notification.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    <Check className="mr-2 h-4 w-4" weight="bold" /> Mark all as read
                </Button>
            </CardFooter>
        </Card>
    )
}