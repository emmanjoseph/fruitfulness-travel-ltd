import Link from "next/link";
import Image from "next/image";
import {CalendarFold, MapIcon, MapPinIcon, PlaneIcon, PlaneTakeoff, StarIcon, Volleyball} from "lucide-react";
// import {Badge} from "@/components/ui/badge";
;

export default function TripsGrid({ trips }: { trips: any[] }) {
    if (!trips?.length) return <p className="mt-10">No journeys found.</p>;

    // console.log('TripsGrid', trips);

    return (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-2.5 mt-8">
            {trips.map((trip) => (
                <Link href={`/destinations/${trip.id}`} key={trip.id}>
                    <div className="group bg-orange-100/15 rounded-[45px] overflow-hidden transition-all duration-300 border border-stone-300">
                        {/* Image */}
                        <div className="relative h-50 md:h-60  overflow-hidden">
                            <Image
                                src={trip.imgUrl}
                                alt={trip.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            {/*<div className="absolute z-10 p-6">*/}
                            {/*    <Badge className={'bg-emerald-600 font-semibold text-base'}>*/}
                            {/*        {trip.numberOfDays} days*/}
                            {/*    </Badge>*/}
                            {/*</div>*/}
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-3">
                            {/* Title and Price */}
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-bold font-pangaia text-xl text-gray-700 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                                    {trip.name}
                                </h3>
                            </div>


                            {/* Rating */}
                            <div className="flex items-center gap-1.5">
                                <span className="font-semibold font-pangaia text-gray-900">{trip.rating}</span>
                                <StarIcon className="fill-amber-400 text-amber-400" size={16} />
                                <span className="text-sm text-gray-600">
              {trip.rating >= 4.5 ? "Superb" : "Good"}
            </span>
                            </div>

                            {/* Description */}
                            {trip.description && (
                                <p className="text-sm font-medium text-gray-600 line-clamp-2">
                                    {trip.description}
                                </p>
                            )}
                        </div>
                    </div>
                </Link>

            ))}
        </div>
    );
}
