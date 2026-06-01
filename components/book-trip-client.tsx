"use client"

import React, { useEffect, useState } from 'react'
import { IconMoneybag, IconSparkles } from "@tabler/icons-react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { formSchema, cn } from "@/lib/utils"
import { fetchJourneyById, requestBooking } from "@/lib/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
    Check, X, House, Car, Loader2, Send,
    User, Mail, Phone, Globe, CalendarDays, Users, Baby, FileText,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import { Country, CountryDropdown } from "@/components/ui/country-dropdown";

// ─── Types ────────────────────────────────────────────────────────────────────
type FormValues = z.infer<typeof formSchema>

type PricingTier = {
    tier: "BUDGET" | "MIDRANGE" | "LUXURY"
    citizenPrice: number
    nonResidentPrice: number
    currency: string
    accommodation: string
    transportation: { type: string; description: string } | null
    inclusions: string[]
    exclusions: string[]
}


const formatPricingTier = (tier: string) =>
    tier
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

// ─── Main component ───────────────────────────────────────────────────────────
export default function BookTripClient({ tripId }: { tripId: string }) {
    const router = useRouter()
    const [journey, setJourney]           = useState<any>(null)
    const [loading, setLoading]           = useState(true)
    const [selectedTier, setSelectedTier] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(null);

    const today = new Date().toISOString().slice(0, 10)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName:         "",
            email:            "",
            phone:            "",
            journeyId:        tripId,
            travelDate:       "",
            numberOfAdults:   1,
            numberOfChildren: 0,
            pricingTier:      "",
            nationality:      "",
            specialRequests:  "",
        },
    })

    const { handleSubmit, setValue, control, formState: { isSubmitting } } = form

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchJourneyById(tripId)
                const d = data?.data ?? data
                setJourney(d)
                if (d?.pricing?.length) {
                    setSelectedTier(d.pricing[0].tier)
                    setValue("pricingTier", d.pricing[0].tier)
                }
            } catch (error) {
                console.error("Failed to fetch journey:", error)
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [tripId, setValue])

    const onSubmit = async (values: FormValues) => {
        try {
            await requestBooking({ ...values, pricingTier: selectedTier });

            toast.success("Booking request sent successfully!", {
                description: "We'll get back to you shortly.",
            });
            router.push('/book-trip/success')
        } catch (error) {
            console.error(error);
            toast.error("Failed to send booking request. Please try again.");
        }
    }

    if (loading) {
        return (
            <section className="container mx-auto px-4 pb-20">
                <div className="grid md:grid-cols-2 gap-16 animate-pulse">
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => <div key={i} className="h-64 bg-gray-100 rounded-2xl" />)}
                    </div>
                    <div className="space-y-4">
                        {[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded-xl" />)}
                    </div>
                </div>
            </section>
        )
    }

    const pricing: PricingTier[] = journey?.pricing ?? []

    return (
        <section className="container mx-auto px-4 pb-20">
            <div className="grid md:grid-cols-2 gap-12 md:gap-0">

                {/* ── Left: Pricing tiers ───────────────────────────────────────── */}
                <div className="space-y-5 md:pr-10">
                    <div>
                        <h2 className="text-3xl font-pangaia font-bold flex items-center gap-2">
                            <IconMoneybag size={24} /> Pricing Options
                        </h2>
                        <p className="font-medium mt-1 text-gray-600">Select the tier that matches your travel style</p>
                    </div>

                    {pricing.length > 0 ? (
                        <Tabs
                            value={selectedTier}
                            onValueChange={(tier) =>
                                form.setValue("pricingTier", tier, { shouldValidate: true })
                            }
                            className={'max-w-lg'}
                        >
                            {/* Tab triggers */}
                            <TabsList variant={'line'} className="w-full rounded-[40px] h-12 mb-4">
                                {pricing.map((price: any) => (
                                    <TabsTrigger
                                        key={price.tier}
                                        value={price.tier}
                                        className="flex-1 rounded-xl text-sm font-semibold"
                                    >
                                        {formatPricingTier(price.tier)}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {/* Tab content */}
                            {pricing.map((price: any) => (
                                <TabsContent key={price.tier} value={price.tier}>
                                    <Card className=" rounded-[40px] bg-white shadow-none border">
                                        <CardHeader className="flex items-center ">
                                            <h3 className="font-bold text-lg text-gray-800">
                                                {formatPricingTier(price.tier)}
                                            </h3>
                                        </CardHeader>

                                        <CardContent className="mt-2 text-sm text-gray-700 space-y-2">
                                            <div className="grid grid-cols-2 gap-3">
                                                <p className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border border-blue-200">
                                                    <strong>Citizen:</strong><br/>
                                                    <span className="text-lg font-bold text-gray-800">
                      {price.currency} {price.citizenPrice?.toLocaleString()}
                    </span>
                                                </p>
                                                <p className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl border border-purple-200">
                                                    <strong>Non-Resident:</strong><br/>
                                                    <span className="text-lg font-bold text-gray-800">
                      {price.currency} {price.nonResidentPrice?.toLocaleString()}
                    </span>
                                                </p>
                                            </div>

                                            <div className="bg-gray-200/20 p-4 rounded-2xl">
                                                <h3 className="text-gray-700 font-semibold flex items-center gap-x-1">
                                                    <House size={16} /> Accommodation
                                                </h3>
                                                <p className="mt-1 text-gray-600">{price.accommodation}</p>
                                            </div>

                                            {price.transportation && (
                                                <div className="bg-gray-200/20 p-4 rounded-2xl">
                                                    <h3 className="text-gray-700 font-semibold flex items-center gap-x-1">
                                                        <Car size={16} /> Transportation
                                                    </h3>
                                                    <p className="mt-1 text-gray-600">
                                                        {price.transportation.type} — {price.transportation.description}
                                                    </p>
                                                </div>
                                            )}

                                            {price.inclusions?.length > 0 ? (
                                                <div className="bg-gray-200/20 p-4 rounded-2xl">
                                                    <h3 className="text-emerald-700 font-semibold flex items-center gap-x-1">
                                                        <Check size={16} /> Inclusions
                                                    </h3>

                                                    <ul className="mt-2 space-y-1.5">
                                                        {price.inclusions.map((item: string, idx: number) => (
                                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                                <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : (
                                                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
                                                    <h3 className="text-emerald-700 font-semibold flex items-center gap-x-1">
                                                        <Check size={16} /> Inclusions
                                                    </h3>
                                                    <p className="mt-1 text-sm text-emerald-700">
                                                        Inclusion details are not available yet.
                                                    </p>
                                                </div>
                                            )}

                                            {price.exclusions?.length > 0 ? (
                                                <div className="bg-gray-200/20 p-4 rounded-2xl">
                                                    <h3 className="font-semibold text-red-500 flex items-center gap-x-1">
                                                        <X size={16} /> Exclusions
                                                    </h3>

                                                    <ul className="mt-2 space-y-1.5">
                                                        {price.exclusions.map((item: string, idx: number) => (
                                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                                <X className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : (
                                                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl">
                                                    <h3 className="font-semibold text-red-500 flex items-center gap-x-1">
                                                        <X size={16} /> Exclusions
                                                    </h3>
                                                    <p className="mt-1 text-sm text-red-500">
                                                        Exclusion details are not available yet.
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            ))}
                        </Tabs>
                    ) : (
                        <p className="text-sm text-gray-400">No pricing available for this journey.</p>
                    )}
                </div>

                {/* ── Right: Booking form ───────────────────────────────────────── */}
                <div className="space-y-5 md:pl-20 md:border-l max-w-xl">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-pangaia font-bold flex items-center gap-2">
                            <IconSparkles size={24} /> Book your adventure
                        </h2>
                        <p className="font-medium text-gray-600">
                            Fill in your details and we'll get back to you within 24 hours
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* Full name */}
                        <Controller
                            name="fullName"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <Input
                                            {...field}
                                            id={field.name}
                                            placeholder="Jane Doe"
                                            aria-invalid={fieldState.invalid}
                                            className="pl-10 h-12 rounded-xl"
                                        />
                                    </div>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <div className="grid lg:grid-cols-2 gap-4">
                            {/* Email */}
                            <Controller
                                name="email"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <Input
                                                {...field}
                                                id={field.name}
                                                type="email"
                                                placeholder="jane@example.com"
                                                aria-invalid={fieldState.invalid}
                                                className="pl-10 h-12 rounded-xl"
                                            />
                                        </div>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            {/* Phone */}
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <Input
                                                {...field}
                                                id={field.name}
                                                placeholder="+254700000000"
                                                aria-invalid={fieldState.invalid}
                                                className="pl-10 h-12 rounded-xl"
                                            />
                                        </div>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </div>

                        <div className="grid lg:grid-cols-2 gap-4">
                            {/* Nationality */}
                            <Controller
                                name="nationality"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Nationality</FieldLabel>
                                        <div className="relative">
                                            <CountryDropdown
                                                placeholder="Kenya"
                                                defaultValue={field.value}
                                                onChange={(country) => {
                                                    field.onChange(country.alpha3);
                                                }}
                                            />
                                        </div>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            {/* Travel date */}
                            <Controller
                                name="travelDate"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Travel date</FieldLabel>
                                        <div className="relative">
                                            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <Input
                                                {...field}
                                                id={field.name}
                                                type="date"
                                                min={today}
                                                aria-invalid={fieldState.invalid}
                                                className="pl-10 h-12 rounded-xl"
                                            />
                                        </div>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Adults */}
                            <Controller
                                name="numberOfAdults"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Adults</FieldLabel>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <Input
                                                {...field}
                                                id={field.name}
                                                type="number"
                                                min={1}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                aria-invalid={fieldState.invalid}
                                                className="pl-10 h-12 rounded-xl"
                                            />
                                        </div>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            {/* Children */}
                            <Controller
                                name="numberOfChildren"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Children</FieldLabel>
                                        <div className="relative">
                                            <Baby className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <Input
                                                {...field}
                                                id={field.name}
                                                type="number"
                                                min={0}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                aria-invalid={fieldState.invalid}
                                                className="pl-10 h-12 rounded-xl"
                                            />
                                        </div>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Pricing tier — hidden field with visual indicator */}
                        <Controller
                            name="pricingTier"
                            control={control}
                            render={({ fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    {selectedTier ? (
                                        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm">
                                            <Check size={16} className="text-emerald-600 shrink-0" />
                                            <span className="font-semibold text-emerald-800">Selected tier: {selectedTier}</span>
                                        </div>
                                    ) : null}
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* Special requests */}
                        <Controller
                            name="specialRequests"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Special requests{" "}
                                        <span className="font-normal text-gray-400">(optional)</span>
                                    </FieldLabel>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 text-gray-400" size={16} />
                                        <Textarea
                                            {...field}
                                            id={field.name}
                                            value={field.value ?? ""}
                                            placeholder="Dietary requirements, accessibility needs, celebrations..."
                                            aria-invalid={fieldState.invalid}
                                            className="pl-10 rounded-xl min-h-28 resize-none"
                                        />
                                    </div>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
                        >
                            {isSubmitting
                                ? <><Loader2 className="animate-spin mr-2" size={16} /> Submitting...</>
                                : <><Send size={16} className="mr-2" /> Submit Booking Request</>
                            }
                        </Button>

                    </form>
                </div>
            </div>
        </section>
    )
}