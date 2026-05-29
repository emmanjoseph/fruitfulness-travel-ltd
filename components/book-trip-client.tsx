"use client"

import React, { useEffect, useState } from 'react'
import { IconMoneybag, IconSparkles } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { formSchema, cn } from "@/lib/utils";
import { fetchJourneyById, requestBooking } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Check, X, House, Car, Loader2, Send,
    User, Mail, Phone, Globe, CalendarDays, Users, Baby, FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


// ─── Types ────────────────────────────────────────────────────────────────────
type FormValues = z.infer<typeof formSchema>;
type FieldName  = keyof FormValues;

type PricingTier = {
    tier: "BUDGET" | "MIDRANGE" | "LUXURY";
    citizenPrice: number;
    nonResidentPrice: number;
    currency: string;
    accommodation: string;
    transportation: { type: string; description: string } | null;
    inclusions: string[];
    exclusions: string[];
};

// ─── Validate a single field ──────────────────────────────────────────────────
function validateField<K extends FieldName>(
    name: K,
    value: FormValues[K]
): string | undefined {
    const shape = formSchema.shape[name] as z.ZodTypeAny | undefined;
    if (!shape) return undefined;
    const result = shape.safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
}

// ─── Shared primitives ────────────────────────────────────────────────────────
function FieldWrap({ label, error, children }: {
    label: string; error?: string; children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">{label}</label>
            {children}
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}

// ─── Pricing card ─────────────────────────────────────────────────────────────
function PricingCard({
                         pricing, selected, onSelect,
                     }: {
    pricing: PricingTier; selected: boolean; onSelect: () => void;
}) {
    const tierColors: Record<string, string> = {
        BUDGET:   "bg-blue-50 border-blue-200 text-blue-800",
        MIDRANGE: "bg-amber-50 border-amber-200 text-amber-800",
        LUXURY:   "bg-emerald-50 border-emerald-200 text-emerald-800",
    };

    return (
        <button
            type="button"
            onClick={onSelect}
            className={cn(
                "w-full rounded-2xl border-2 p-5 text-left transition-all duration-200",
                selected
                    ? "border-emerald-600 ring-4 ring-emerald-100"
                    : "border-gray-200 hover:border-gray-300"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className={cn("font-bold px-3 py-1", tierColors[pricing.tier])}>
                    {pricing.tier}
                </div>
                {selected && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                        <Check size={14} />
                    </span>
                )}
            </div>

            {/* Prices */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 font-medium mb-0.5">Citizen</p>
                    <p className="text-base font-bold text-gray-900">
                        {pricing.currency} {pricing.citizenPrice.toLocaleString()}
                    </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 font-medium mb-0.5">Non-Resident</p>
                    <p className="text-base font-bold text-gray-900">
                        {pricing.currency} {pricing.nonResidentPrice.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Accommodation */}
            <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
                <House size={15} className="mt-0.5 shrink-0 text-gray-400" />
                <span>{pricing.accommodation}</span>
            </div>

            {/* Transport */}
            {pricing.transportation && (
                <div className="flex items-start gap-2 text-sm text-gray-600 mb-4">
                    <Car size={15} className="mt-0.5 shrink-0 text-gray-400" />
                    <span>{pricing.transportation.type} — {pricing.transportation.description}</span>
                </div>
            )}

            {/* Inclusions */}
            {pricing.inclusions?.length > 0 && (
                <div className="mb-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 mb-2">Inclusions</p>
                    <ul className="space-y-1">
                        {pricing.inclusions.slice(0, 4).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                                <Check size={12} className="mt-0.5 text-emerald-500 shrink-0" />
                                {item}
                            </li>
                        ))}
                        {pricing.inclusions.length > 4 && (
                            <li className="text-xs text-gray-400 pl-4">+{pricing.inclusions.length - 4} more</li>
                        )}
                    </ul>
                </div>
            )}

            {/* Exclusions */}
            {pricing.exclusions?.length > 0 && (
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-red-500 mb-2">Exclusions</p>
                    <ul className="space-y-1">
                        {pricing.exclusions.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                                <X size={12} className="mt-0.5 text-red-400 shrink-0" />
                                {item}
                            </li>
                        ))}
                        {pricing.exclusions.length > 3 && (
                            <li className="text-xs text-gray-400 pl-4">+{pricing.exclusions.length - 3} more</li>
                        )}
                    </ul>
                </div>
            )}
        </button>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────
type Props = { tripId: string };

export default function BookTripClient({ tripId }: Props) {
    const router = useRouter();
    const [journey, setJourney] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedTier, setSelectedTier] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

    useEffect(() => {
        fetchJourneyById(tripId)
            .then((data) => {
                const d = data?.data ?? data;
                setJourney(d);
                if (d?.pricing?.length) setSelectedTier(d.pricing[0].tier);
            })
            .finally(() => setLoading(false));
    }, [tripId]);

    const form = useForm<FormValues>({
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            journeyId: tripId,
            travelDate: "",
            numberOfAdults: 1,
            numberOfChildren: 0,
            pricingTier: "",
            nationality: "",
            specialRequests: "",
        },
        onSubmit: async ({ value }) => {
            // Final validation
            const allFields = Object.keys(formSchema.shape) as FieldName[];
            const newErrs: Partial<Record<FieldName, string>> = {};
            let ok = true;
            for (const name of allFields) {
                const msg = validateField(name, value[name] as never);
                if (msg) { newErrs[name] = msg; ok = false; }
            }
            if (!ok) { setErrors(newErrs); return; }

            setSubmitting(true);
            try {
                await toast.promise(
                    requestBooking({ ...value, pricingTier: selectedTier }),
                    {
                        loading: "Submitting your booking request...",
                        success: "Booking request submitted! We'll be in touch shortly.",
                        error: (err) => err?.message || "Failed to submit booking request",
                    }
                );
                router.push("/plan-trip/success");
            } catch (error) {
                console.error(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const clearErr = (name: FieldName) => {
        setErrors((e) => { const n = { ...e }; delete n[name]; return n; });
    };

    const today = new Date().toISOString().slice(0, 10);

    if (loading) {
        return (
            <section className="container mx-auto px-4 pb-20">
                <div className="grid md:grid-cols-2 gap-16 animate-pulse">
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-64 bg-gray-100 rounded-2xl" />
                        ))}
                    </div>
                    <div className="space-y-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-12 bg-gray-100 rounded-xl" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    const pricing: PricingTier[] = journey?.pricing ?? [];

    return (
        <section className="container mx-auto px-4 pb-20">
            <div className="grid md:grid-cols-2 gap-12 md:gap-0">

                {/* ── Left: Pricing tiers ── */}
                <div className="space-y-5 md:pr-10">
                    <div>
                        <h1 className="text-3xl font-pangaia font-bold flex items-center gap-2">
                            <IconMoneybag size={24} />
                            Pricing Options
                        </h1>
                        <p className="font-medium mt-1">
                            Select the tier that matches your travel style
                        </p>
                    </div>

                    {pricing.length > 0 ? (
                        <div className="space-y-4">
                            {pricing.map((p) => (
                                <PricingCard
                                    key={p.tier}
                                    pricing={p}
                                    selected={selectedTier === p.tier}
                                    onSelect={() => {
                                        setSelectedTier(p.tier);
                                        form.setFieldValue("pricingTier", p.tier);
                                        clearErr("pricingTier");
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400">No pricing available for this journey.</p>
                    )}
                </div>

                {/* ── Right: Booking form ── */}
                <div className="space-y-5 md:pl-16 md:border-l space-y-5">
                    <div className={'space-y-5'}>
                        <h1 className="text-3xl font-pangaia font-bold flex items-center gap-2">
                            <IconSparkles size={24} />
                            Book your adventure
                        </h1>
                        <p className="font-medium">
                            Fill in your details and we'll get back to you within 24 hours
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="space-y-5"
                    >
                        {/* Full name */}
                        <form.Field name="fullName">
                            {(field) => (
                                <FieldWrap label="Full name" error={errors.fullName}>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <Input
                                            value={field.state.value}
                                            placeholder="Jane Doe"
                                            onChange={(e) => { field.handleChange(e.target.value); clearErr("fullName"); }}
                                            onBlur={field.handleBlur}
                                            className="pl-10 h-12 rounded-xl"
                                        />
                                    </div>
                                </FieldWrap>
                            )}
                        </form.Field>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Email */}
                            <form.Field name="email">
                                {(field) => (
                                    <FieldWrap label="Email" error={errors.email}>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <Input
                                                type="email"
                                                value={field.state.value}
                                                placeholder="jane@example.com"
                                                onChange={(e) => { field.handleChange(e.target.value); clearErr("email"); }}
                                                onBlur={field.handleBlur}
                                                className="pl-10 h-12 rounded-xl"
                                            />
                                        </div>
                                    </FieldWrap>
                                )}
                            </form.Field>

                            {/* Phone */}
                            <form.Field name="phone">
                                {(field) => (
                                    <FieldWrap label="Phone" error={errors.phone}>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <Input
                                                value={field.state.value}
                                                placeholder="+254700000000"
                                                onChange={(e) => { field.handleChange(e.target.value); clearErr("phone"); }}
                                                onBlur={field.handleBlur}
                                                className="pl-10 h-12 rounded-xl"
                                            />
                                        </div>
                                    </FieldWrap>
                                )}
                            </form.Field>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Nationality */}
                            <form.Field name="nationality">
                                {(field) => (
                                    <FieldWrap label="Nationality" error={errors.nationality}>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <Input
                                                value={field.state.value}
                                                placeholder="Kenyan"
                                                onChange={(e) => { field.handleChange(e.target.value); clearErr("nationality"); }}
                                                onBlur={field.handleBlur}
                                                className="pl-10 h-12 rounded-xl"
                                            />
                                        </div>
                                    </FieldWrap>
                                )}
                            </form.Field>

                            {/* Travel date */}
                            <form.Field name="travelDate">
                                {(field) => (
                                    <FieldWrap label="Travel date" error={errors.travelDate}>
                                        <div className="relative">
                                            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <Input
                                                type="date"
                                                min={today}
                                                value={field.state.value}
                                                onChange={(e) => { field.handleChange(e.target.value); clearErr("travelDate"); }}
                                                onBlur={field.handleBlur}
                                                className="pl-10 h-12 rounded-xl"
                                            />
                                        </div>
                                    </FieldWrap>
                                )}
                            </form.Field>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Adults */}
                            <form.Field name="numberOfAdults">
                                {(field) => (
                                    <FieldWrap label="Adults" error={errors.numberOfAdults}>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <Input
                                                type="number"
                                                min={1}
                                                value={field.state.value}
                                                onChange={(e) => { field.handleChange(Number(e.target.value)); clearErr("numberOfAdults"); }}
                                                className="pl-10 h-12 rounded-xl"
                                            />
                                        </div>
                                    </FieldWrap>
                                )}
                            </form.Field>

                            {/* Children */}
                            <form.Field name="numberOfChildren">
                                {(field) => (
                                    <FieldWrap label="Children" error={errors.numberOfChildren}>
                                        <div className="relative">
                                            <Baby className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <Input
                                                type="number"
                                                min={0}
                                                value={field.state.value}
                                                onChange={(e) => { field.handleChange(Number(e.target.value)); clearErr("numberOfChildren"); }}
                                                className="pl-10 h-12 rounded-xl"
                                            />
                                        </div>
                                    </FieldWrap>
                                )}
                            </form.Field>
                        </div>

                        {/* Selected tier indicator */}
                        {selectedTier && (
                            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm">
                                <Check size={16} className="text-emerald-600 shrink-0" />
                                <span className="font-semibold text-emerald-800">
                                    Selected tier: {selectedTier}
                                </span>
                            </div>
                        )}

                        {errors.pricingTier && (
                            <p className="text-xs text-red-500">{errors.pricingTier}</p>
                        )}

                        {/* Special requests */}
                        <form.Field name="specialRequests">
                            {(field) => (
                                <FieldWrap label="Special requests (optional)" error={errors.specialRequests}>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 text-gray-400" size={16} />
                                        <Textarea
                                            value={field.state.value ?? ""}
                                            placeholder="Dietary requirements, accessibility needs, celebrations..."
                                            onChange={(e) => { field.handleChange(e.target.value); clearErr("specialRequests"); }}
                                            onBlur={field.handleBlur}
                                            className="pl-10 rounded-xl min-h-28 resize-none"
                                        />
                                    </div>
                                </FieldWrap>
                            )}
                        </form.Field>

                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full h-12 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
                        >
                            {submitting
                                ? <><Loader2 className="animate-spin mr-2" size={16} />Submitting...</>
                                : <><Send size={16} className="mr-2" />Submit Booking Request</>
                            }
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}