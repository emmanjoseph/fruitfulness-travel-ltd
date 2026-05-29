"use client";

import {
    ArrowLeft, ArrowRight, CalendarDays, Check, CheckCircle2,
    Compass, Loader2, Send, Users, WalletCards, Minus, Plus,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type CustomizeTripFormValues, cn, customizeTripSchema } from "@/lib/utils";
import { z } from "zod";
import {RequestCustomBooking} from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────
type StepId      = "style" | "timing" | "budget" | "contact";
type SubmitState = "idle" | "submitting" | "success" | "error";

// ─── Config ───────────────────────────────────────────────────────────────────
const steps: { id: StepId; label: string; title: string; icon: React.ElementType }[] = [
    { id: "style",   label: "Style",  title: "Choose your trip style",   icon: Compass      },
    { id: "timing",  label: "Dates",  title: "Set dates and guests",     icon: CalendarDays },
    { id: "budget",  label: "Budget", title: "Match your comfort level", icon: WalletCards  },
    { id: "contact", label: "Review", title: "Confirm your request",     icon: Users        },
];

const stepFields: Record<StepId, (keyof CustomizeTripFormValues)[]> = {
    style:   ["destination", "activities"],
    timing:  ["preferredStartDate", "preferredEndDate", "numberOfDays", "numberOfAdults", "numberOfChildren"],
    budget:  ["preferredPricingTier", "budgetMin", "budgetMax", "currency", "accommodationPreference", "transportationPreference"],
    contact: ["fullName", "email", "phone", "specialRequests"],
};

const destinationOptions = [
    "Kenya", "Tanzania", "Uganda",
    "Kenya and Tanzania", "Uganda and Tanzania", "Not sure yet",
];
const activityOptions = [
    "Big Five safari", "Great Migration", "Beach extension", "Culture",
    "Photography", "Family travel", "Honeymoon", "Birding",
];
const pricingTiers: CustomizeTripFormValues["preferredPricingTier"][] = ["BUDGET", "MIDRANGE", "LUXURY"];

const defaultValues: CustomizeTripFormValues = {
    fullName: "", email: "", phone: "",
    destination: "Kenya and Tanzania",
    preferredStartDate: "", preferredEndDate: "",
    isDateFlexible: true,
    numberOfDays: 7, numberOfAdults: 2, numberOfChildren: 0,
    preferredPricingTier: "MIDRANGE",
    budgetMin: 1200, budgetMax: 3500, currency: "USD",
    accommodationPreference: "Lodge or tented camp",
    transportationPreference: "Private 4x4 safari vehicle",
    activities: ["Big Five safari", "Culture"],
    specialRequests: "",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().slice(0, 10);

const tripLength = (start: string, end: string) => {
    if (!start || !end) return null;
    const diff = new Date(`${end}T00:00:00`).getTime() - new Date(`${start}T00:00:00`).getTime();
    return Number.isNaN(diff) || diff < 0 ? null : Math.floor(diff / 86_400_000) + 1;
};

const formatTier = (t: string) => t.charAt(0) + t.slice(1).toLowerCase();

// ─── Validate a single field using zod ───────────────────────────────────────
function validateField<K extends keyof CustomizeTripFormValues>(
    name: K,
    value: CustomizeTripFormValues[K]
): string | undefined {
    const fieldSchema = customizeTripSchema.shape[name] as z.ZodTypeAny | undefined;
    if (!fieldSchema) return undefined;
    const result = fieldSchema.safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message; // 👈 issues not errors
}

// ─── Tiny shared primitives ───────────────────────────────────────────────────
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

function ChoiceBtn({ active, onClick, children }: {
    active: boolean; onClick: () => void; children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            aria-pressed={active}
            onClick={onClick}
            className={cn(
                "min-h-14 rounded-lg border px-4 py-3 text-left text-sm font-semibold transition",
                active
                    ? "border-emerald-700 bg-emerald-50 text-emerald-900 ring-4 ring-emerald-100"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50",
            )}
        >{children}</button>
    );
}

function NumStepper({ value, min, onChange }: {
    value: number; min: number; onChange: (v: number) => void;
}) {
    return (
        <div className="flex h-12 overflow-hidden rounded-lg border border-gray-300 bg-white">
            <button type="button" onClick={() => onChange(Math.max(min, value - 1))}
                    className="flex w-12 items-center justify-center text-gray-600 hover:bg-gray-50">
                <Minus size={16} />
            </button>
            <input
                type="number" min={min} value={value}
                onChange={(e) => onChange(Math.max(min, Number(e.target.value) || min))}
                className="w-full border-x border-gray-200 text-center text-base font-bold text-gray-900 outline-none"
            />
            <button type="button" onClick={() => onChange(value + 1)}
                    className="flex w-12 items-center justify-center text-gray-600 hover:bg-gray-50">
                <Plus size={16} />
            </button>
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CustomTripStepper() {
    const [activeStep,    setActiveStep]    = useState(0);
    const [highestStep,   setHighestStep]   = useState(0);
    const [submitState,   setSubmitState]   = useState<SubmitState>("idle");
    const [submitMessage, setSubmitMessage] = useState("");

    // Per-field error state managed separately — avoids all adapter issues
    const [errors, setErrors] = useState<Partial<Record<keyof CustomizeTripFormValues, string>>>({});

    const form = useForm<CustomizeTripFormValues>({
        defaultValues,
        onSubmit: async ({ value }) => {
            try {
                setSubmitState("submitting");
                await RequestCustomBooking(value);  // 👈 use the existing action
                setSubmitState("success");
                setSubmitMessage("Your request has been sent. We'll follow up with a tailored itinerary.");
            } catch (err) {
                setSubmitState("error");
                setSubmitMessage(err instanceof Error ? err.message : "Something went wrong");
            }
        },
    });

    const step     = steps[activeStep];
    const progress = Math.round(((activeStep + 1) / steps.length) * 100);

    // Validate all fields for the current step, populate errors state
    const validateCurrent = (): boolean => {
        const values  = form.state.values;
        const fields  = stepFields[step.id];
        const newErrs: Partial<Record<keyof CustomizeTripFormValues, string>> = { ...errors };
        let ok = true;

        for (const name of fields) {
            const msg = validateField(name, values[name] as never);
            if (msg) { newErrs[name] = msg; ok = false; }
            else delete newErrs[name];
        }

        setErrors(newErrs);
        return ok;
    };

    const next = () => {
        if (activeStep === steps.length - 1) return; // 👈 safety guard
        if (!validateCurrent()) return;
        setActiveStep((s) => {
            const n = Math.min(s + 1, steps.length - 1);
            setHighestStep((h) => Math.max(h, n));
            return n;
        });
    };

    const back = () => setActiveStep((s) => Math.max(s - 1, 0));

    const jumpTo = (i: number) => {
        if (i <= highestStep) { setActiveStep(i); return; }
        if (!validateCurrent()) return;
        const n = Math.min(i, activeStep + 1);
        setHighestStep((h) => Math.max(h, n));
        setActiveStep(n);
    };

    // Clear a field error when the user edits it
    const clearErr = (name: keyof CustomizeTripFormValues) => {
        setErrors((e) => { const next = { ...e }; delete next[name]; return next; });
    };

    // ── Step panels ───────────────────────────────────────────────────────────
    const renderStyle = () => (
        <div className="space-y-8">
            <form.Field name="destination">
                {(field) => (
                    <FieldWrap label="Destination" error={errors.destination}>
                        <div className="mt-1 grid gap-3 sm:grid-cols-2">
                            {destinationOptions.map((d) => (
                                <ChoiceBtn
                                    key={d}
                                    active={field.state.value === d}
                                    onClick={() => { field.handleChange(d); clearErr("destination"); }}
                                >{d}</ChoiceBtn>
                            ))}
                        </div>
                    </FieldWrap>
                )}
            </form.Field>

            <form.Field name="activities">
                {(field) => (
                    <FieldWrap label="Activities" error={errors.activities}>
                        <div className="mt-1 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {activityOptions.map((a) => (
                                <ChoiceBtn
                                    key={a}
                                    active={field.state.value.includes(a)}
                                    onClick={() => {
                                        const next = field.state.value.includes(a)
                                            ? field.state.value.filter((x: string) => x !== a)
                                            : [...field.state.value, a];
                                        field.handleChange(next);
                                        clearErr("activities");
                                    }}
                                >{a}</ChoiceBtn>
                            ))}
                        </div>
                    </FieldWrap>
                )}
            </form.Field>
        </div>
    );

    const renderTiming = () => (
        <div className="space-y-8">
            <div className="grid gap-5 md:grid-cols-2">
                <form.Field name="preferredStartDate">
                    {(field) => (
                        <FieldWrap label="Start date" error={errors.preferredStartDate}>
                            <Input
                                type="date" min={today()} value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => {
                                    field.handleChange(e.target.value);
                                    clearErr("preferredStartDate");
                                    const days = tripLength(e.target.value, form.state.values.preferredEndDate);
                                    if (days) form.setFieldValue("numberOfDays", days);
                                }}
                                className="mt-1 h-12"
                            />
                        </FieldWrap>
                    )}
                </form.Field>

                <form.Field name="preferredEndDate">
                    {(field) => (
                        <FieldWrap label="End date" error={errors.preferredEndDate}>
                            <Input
                                type="date"
                                min={form.state.values.preferredStartDate || today()}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => {
                                    field.handleChange(e.target.value);
                                    clearErr("preferredEndDate");
                                    const days = tripLength(form.state.values.preferredStartDate, e.target.value);
                                    if (days) form.setFieldValue("numberOfDays", days);
                                }}
                                className="mt-1 h-12"
                            />
                        </FieldWrap>
                    )}
                </form.Field>
            </div>

            <form.Field name="isDateFlexible">
                {(field) => (
                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
                        <Checkbox
                            checked={field.state.value}
                            onCheckedChange={(v) => field.handleChange(!!v)}
                            className="mt-0.5"
                        />
                        <span>
                            <span className="block font-semibold text-gray-900">My dates are flexible</span>
                            <span className="mt-0.5 block text-gray-500">We can suggest a better window for wildlife or weather.</span>
                        </span>
                    </label>
                )}
            </form.Field>

            <div className="grid gap-5 md:grid-cols-3">
                {(["numberOfDays", "numberOfAdults", "numberOfChildren"] as const).map((name) => (
                    <form.Field key={name} name={name}>
                        {(field) => (
                            <FieldWrap
                                label={name === "numberOfDays" ? "Days" : name === "numberOfAdults" ? "Adults" : "Children"}
                                error={errors[name]}
                            >
                                <NumStepper
                                    value={field.state.value}
                                    min={name === "numberOfChildren" ? 0 : 1}
                                    onChange={(v) => { field.handleChange(v); clearErr(name); }}
                                />
                            </FieldWrap>
                        )}
                    </form.Field>
                ))}
            </div>
        </div>
    );

    const renderBudget = () => (
        <div className="space-y-8">
            <form.Field name="preferredPricingTier">
                {(field) => (
                    <FieldWrap label="Pricing tier" error={errors.preferredPricingTier}>
                        <div className="mt-1 grid gap-3 sm:grid-cols-3">
                            {pricingTiers.map((t) => (
                                <ChoiceBtn
                                    key={t}
                                    active={field.state.value === t}
                                    onClick={() => { field.handleChange(t); clearErr("preferredPricingTier"); }}
                                >{formatTier(t)}</ChoiceBtn>
                            ))}
                        </div>
                    </FieldWrap>
                )}
            </form.Field>

            <div className="grid gap-5 md:grid-cols-[1fr_1fr_140px]">
                {(["budgetMin", "budgetMax"] as const).map((name) => (
                    <form.Field key={name} name={name}>
                        {(field) => (
                            <FieldWrap
                                label={name === "budgetMin" ? "Minimum budget" : "Maximum budget"}
                                error={errors[name]}
                            >
                                <Input
                                    type="number" min={0} value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => {
                                        field.handleChange(Math.max(0, Number(e.target.value)));
                                        clearErr(name);
                                    }}
                                    className="mt-1 h-12"
                                />
                            </FieldWrap>
                        )}
                    </form.Field>
                ))}

                <form.Field name="currency">
                    {(field) => (
                        <FieldWrap label="Currency" error={errors.currency}>
                            <Select value={field.state.value} onValueChange={(v) => { field.handleChange(v); clearErr("currency"); }}>
                                <div className={'w-full border p-1.5 rounded-xl'}>
                                    <SelectTrigger className="w-full border-none"><SelectValue /></SelectTrigger>
                                </div>
                                <SelectContent>
                                    {["USD", "KES", "EUR", "GBP"].map((c) => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FieldWrap>
                    )}
                </form.Field>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <form.Field name="accommodationPreference">
                    {(field) => (
                        <FieldWrap label="Accommodation" error={errors.accommodationPreference}>
                            <Select value={field.state.value} onValueChange={(v) => { field.handleChange(v); clearErr("accommodationPreference"); }}>
                                <div className={'w-full border p-1.5 rounded-xl'}>
                                    <SelectTrigger className="w-full border-none"><SelectValue /></SelectTrigger>
                                </div>
                                <SelectContent className={'p-4 rounded-4xl'}>
                                    {["Comfortable guest house", "Lodge or tented camp", "Luxury lodge", "Boutique beach resort"]
                                        .map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </FieldWrap>
                    )}
                </form.Field>

                <form.Field name="transportationPreference">
                    {(field) => (
                        <FieldWrap label="Transport" error={errors.transportationPreference}>
                            <Select value={field.state.value} onValueChange={(v) => { field.handleChange(v); clearErr("transportationPreference"); }}>
                                <div className={'w-full border p-1.5 rounded-xl'}>
                                    <SelectTrigger className="w-full border-none"><SelectValue /></SelectTrigger>
                                </div>
                                <SelectContent>
                                    {["Private 4x4 safari vehicle", "Shared safari vehicle", "Fly-in safari", "Mix of road and flights"]
                                        .map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </FieldWrap>
                    )}
                </form.Field>
            </div>
        </div>
    );

    const renderContact = () => (
        <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
                <form.Field name="fullName">
                    {(field) => (
                        <FieldWrap label="Full name" error={errors.fullName}>
                            <Input
                                value={field.state.value} placeholder="Your name"
                                onBlur={field.handleBlur}
                                onChange={(e) => { field.handleChange(e.target.value); clearErr("fullName"); }}
                                className="mt-1 h-12"
                            />
                        </FieldWrap>
                    )}
                </form.Field>

                <form.Field name="phone">
                    {(field) => (
                        <FieldWrap label="Phone" error={errors.phone}>
                            <Input
                                value={field.state.value} placeholder="+254..."
                                onBlur={field.handleBlur}
                                onChange={(e) => { field.handleChange(e.target.value); clearErr("phone"); }}
                                className="mt-1 h-12"
                            />
                        </FieldWrap>
                    )}
                </form.Field>
            </div>

            <form.Field name="email">
                {(field) => (
                    <FieldWrap label="Email" error={errors.email}>
                        <Input
                            type="email" value={field.state.value} placeholder="you@example.com"
                            onBlur={field.handleBlur}
                            onChange={(e) => { field.handleChange(e.target.value); clearErr("email"); }}
                            className="mt-1 h-12"
                        />
                    </FieldWrap>
                )}
            </form.Field>

            <form.Field name="specialRequests">
                {(field) => (
                    <FieldWrap label="Special requests" error={errors.specialRequests}>
                        <Textarea
                            value={field.state.value ?? ""}
                            placeholder="Pace, accessibility, celebrations, dietary needs..."
                            onBlur={field.handleBlur}
                            onChange={(e) => { field.handleChange(e.target.value); clearErr("specialRequests"); }}
                            className="mt-1 min-h-36"
                        />
                        <p className="text-right text-xs text-gray-400">{(field.state.value ?? "").length} characters</p>
                    </FieldWrap>
                )}
            </form.Field>

            {submitMessage && (
                <p className={cn(
                    "rounded-lg border p-4 text-sm font-medium",
                    submitState === "success" && "border-emerald-200 bg-emerald-50 text-emerald-800",
                    submitState === "error"   && "border-red-200 bg-red-50 text-red-700",
                )}>
                    {submitMessage}
                </p>
            )}
        </div>
    );

    // ── Summary sidebar ───────────────────────────────────────────────────────
    const renderSummary = () => (
        <form.Subscribe selector={(s) => s.values}>
            {(v) => {
                const days = tripLength(v.preferredStartDate, v.preferredEndDate);
                return (
                    <aside className="h-fit rounded-[40px] border border-emerald-900 bg-emerald-950 p-6 text-white lg:sticky lg:top-28">
                        <div className="mb-6 flex items-center gap-3">
                            <span className="flex size-11 items-center justify-center rounded-full bg-white/10">
                                <CheckCircle2 className="text-emerald-300" size={22} />
                            </span>
                            <div>
                                <h3 className="text-2xl font-bold">Trip snapshot</h3>
                                <p className="text-sm text-white/60">Updates as you plan</p>
                            </div>
                        </div>

                        <dl className="space-y-5 text-sm">
                            {[
                                { label: "Destination", value: v.destination },
                                { label: "Dates",       value: v.preferredStartDate && v.preferredEndDate ? `${v.preferredStartDate} → ${v.preferredEndDate}` : "Not selected" },
                                { label: "Duration",    value: `${days ?? v.numberOfDays} days${v.isDateFlexible ? " · flexible" : ""}` },
                                { label: "Travelers",   value: `${v.numberOfAdults} adults, ${v.numberOfChildren} children` },
                                { label: "Budget",      value: `${v.currency} ${v.budgetMin.toLocaleString()} – ${v.budgetMax.toLocaleString()}` },
                                { label: "Tier",        value: formatTier(v.preferredPricingTier) },
                            ].map(({ label, value }) => (
                                <div key={label}>
                                    <dt className="text-xs font-bold uppercase tracking-widest text-emerald-300">{label}</dt>
                                    <dd className="mt-0.5 font-semibold text-white">{value}</dd>
                                </div>
                            ))}
                        </dl>

                        <div className="mt-6 border-t border-white/15 pt-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Activities</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {v.activities.map((a: string) => (
                                    <span key={a} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{a}</span>
                                ))}
                            </div>
                        </div>
                    </aside>
                );
            }}
        </form.Subscribe>
    );

    // ── Main render ───────────────────────────────────────────────────────────
    return (
        <section className="px-4 py-20">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-10 max-w-3xl">
                    <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-emerald-700">Custom planning</p>
                    <h2 className="text-3xl font-bold font-pangaia text-gray-700">
                        Build a safari request in four clear steps
                    </h2>
                    <p className="mt-1 text-base text-gray-600">
                        Share the essentials once, then we'll turn it into a practical East African itinerary.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
                    <div className="overflow-hidden rounded-[40px] border border-gray-200 bg-white shadow-sm">

                        {/* Step header */}
                        <div className="border-b border-gray-200 p-4 md:p-8">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-500">Step {activeStep + 1} of {steps.length}</p>
                                    <h3 className="text-2xl font-bold text-gray-950">{step.title}</h3>
                                </div>
                                <span className="text-sm font-bold text-emerald-700">{progress}%</span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                <div
                                    className="h-full rounded-full bg-emerald-700 transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <ol className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                                {steps.map((s, i) => {
                                    const Icon      = s.icon;
                                    const isActive  = activeStep === i;
                                    const isDone    = i < activeStep;
                                    const available = i <= highestStep || i <= activeStep + 1;
                                    return (
                                        <li key={s.id}>
                                            <button
                                                type="button"
                                                onClick={() => jumpTo(i)}
                                                disabled={!available}
                                                aria-current={isActive ? "step" : undefined}
                                                className={cn(
                                                    "flex min-h-16 w-full items-center gap-3 rounded-lg border p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-40",
                                                    isActive && "border-emerald-700 bg-emerald-50 text-emerald-900",
                                                    isDone   && "border-emerald-200 bg-white text-emerald-800",
                                                    !isActive && !isDone && "border-gray-200 bg-white text-gray-600 hover:border-gray-300",
                                                )}
                                            >
                                                <span className={cn(
                                                    "flex size-9 shrink-0 items-center justify-center rounded-full border",
                                                    (isActive || isDone) ? "border-emerald-700 bg-emerald-700 text-white" : "border-gray-300 bg-gray-50 text-gray-500",
                                                )}>
                                                    {isDone ? <Check size={16} /> : <Icon size={16} />}
                                                </span>
                                                <span>
                                                    <span className="block text-xs font-semibold uppercase tracking-wide">{s.label}</span>
                                                    <span className="block text-sm font-medium">{i + 1}</span>
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>

                        {/* Step body */}
                        {/* Step body */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // Only allow actual submit on last step
                                if (activeStep !== steps.length - 1) return;
                                form.handleSubmit();
                            }}
                            className="p-5 md:p-8"
                        >
                            {step.id === "style"   && renderStyle()}
                            {step.id === "timing"  && renderTiming()}
                            {step.id === "budget"  && renderBudget()}
                            {step.id === "contact" && renderContact()}

                            {/* Navigation */}
                            <div className="mt-8 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                                <Button
                                    type="button" variant="outline" onClick={back}
                                    disabled={activeStep === 0 || submitState === "submitting"}
                                    className="h-12 rounded-lg px-5"
                                >
                                    <ArrowLeft size={18} /> Back
                                </Button>

                                {activeStep === steps.length - 1 ? (
                                    <Button
                                        type="submit"
                                        disabled={submitState === "submitting" || submitState === "success"}
                                        className="h-12 rounded-lg bg-emerald-700 px-6 text-white hover:bg-emerald-800"
                                    >
                                        {submitState === "submitting"
                                            ? <><Loader2 className="animate-spin" size={18} /> Sending…</>
                                            : submitState === "success"
                                                ? <><Check size={18} /> Sent!</>
                                                : <><Send size={18} /> Send trip request</>
                                        }
                                    </Button>
                                ) : (
                                    <Button
                                        type="button" onClick={next}
                                        className="h-12 rounded-lg bg-emerald-700 px-6 text-white hover:bg-emerald-800"
                                    >
                                        Continue <ArrowRight size={18} />
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>

                    {renderSummary()}
                </div>
            </div>
        </section>
    );
}