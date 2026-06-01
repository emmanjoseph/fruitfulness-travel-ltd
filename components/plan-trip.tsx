"use client";

import { format } from "date-fns";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Compass,
  Loader2,
  Minus,
  Plus,
  Send,
  Users,
  WalletCards,
  MapPin, Clock, Banknote, Star,
} from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RequestCustomBooking } from "@/lib/api";
import {
  type CustomizeTripFormValues,
  cn,
  customizeTripSchema,
} from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type StepId = "style" | "timing" | "budget" | "contact";
type SubmitState = "idle" | "submitting" | "success" | "error";
type FormFieldName = keyof typeof customizeTripSchema.shape &
  keyof CustomizeTripFormValues &
  string;

// ─── Config ───────────────────────────────────────────────────────────────────
const steps: {
  id: StepId;
  label: string;
  title: string;
  icon: React.ElementType;
}[] = [
  {
    id: "style",
    label: "Style",
    title: "Choose your trip style",
    icon: Compass,
  },
  {
    id: "timing",
    label: "Dates",
    title: "Set dates and guests",
    icon: CalendarDays,
  },
  {
    id: "budget",
    label: "Budget",
    title: "Match your comfort level",
    icon: WalletCards,
  },
  {
    id: "contact",
    label: "Review",
    title: "Confirm your request",
    icon: Users,
  },
];

const stepFields: Record<StepId, FormFieldName[]> = {
  style: ["destination", "activities"],
  timing: [
    "preferredStartDate",
    "preferredEndDate",
    "numberOfDays",
    "numberOfAdults",
    "numberOfChildren",
  ],
  budget: [
    "preferredPricingTier",
    "budgetMin",
    "budgetMax",
    "currency",
    "accommodationPreference",
    "transportationPreference",
  ],
  contact: ["fullName", "email", "phone", "specialRequests"],
};

const destinationOptions = [
  "Kenya",
  "Tanzania",
  "Uganda",
  "Kenya and Tanzania",
  "Uganda and Tanzania",
  "Not sure yet",
];
const activityOptions = [
  "Big Five safari",
  "Great Migration",
  "Beach extension",
  "Culture",
  "Photography",
  "Family travel",
  "Honeymoon",
  "Birding",
];
const pricingTiers: CustomizeTripFormValues["preferredPricingTier"][] = [
  "BUDGET",
  "MIDRANGE",
  "LUXURY",
];

const defaultValues: CustomizeTripFormValues = {
  fullName: "",
  email: "",
  phone: "",
  destination: "Kenya and Tanzania",
  preferredStartDate: "",
  preferredEndDate: "",
  isDateFlexible: true,
  numberOfDays: 7,
  numberOfAdults: 2,
  numberOfChildren: 0,
  preferredPricingTier: "MIDRANGE",
  budgetMin: 1200,
  budgetMax: 3500,
  currency: "USD",
  accommodationPreference: "Lodge or tented camp",
  transportationPreference: "Private 4x4 safari vehicle",
  activities: ["Big Five safari", "Culture"],
  specialRequests: "",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().slice(0, 10);

const dateFromValue = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;

  return new Date(year, month - 1, day);
};

const valueFromDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const calendarDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const isBeforeCalendarDay = (date: Date, minDate?: Date) => {
  if (!minDate) return false;

  return calendarDay(date).getTime() < calendarDay(minDate).getTime();
};

const tripLength = (start: string, end: string) => {
  if (!start || !end) return null;
  const diff =
    new Date(`${end}T00:00:00`).getTime() -
    new Date(`${start}T00:00:00`).getTime();
  return Number.isNaN(diff) || diff < 0
    ? null
    : Math.floor(diff / 86_400_000) + 1;
};

const formatTier = (t: string) => t.charAt(0) + t.slice(1).toLowerCase();

// ─── Validate a single field using zod ───────────────────────────────────────
function validateField(
  name: FormFieldName,
  value: unknown,
): string | undefined {
  const result = customizeTripSchema.shape[name].safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

// ─── Tiny shared primitives ───────────────────────────────────────────────────
function FieldWrap({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <Field data-invalid={!!error} className="gap-1.5">
      <FieldLabel className="text-sm font-semibold text-gray-700">
        {label}
      </FieldLabel>
      {children}
      <FieldError
        className="mt-1 text-xs"
        errors={error ? [{ message: error }] : undefined}
      />
    </Field>
  );
}

function ChoiceBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
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
    >
      {children}
    </button>
  );
}

function NumStepper({
  value,
  min,
  onChange,
}: {
  value: number;
  min: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex h-12 overflow-hidden rounded-lg border border-gray-300 bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex w-12 items-center justify-center text-gray-600 hover:bg-gray-50"
      >
        <Minus size={16} />
      </button>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Math.max(min, Number(e.target.value) || min))}
        className="w-full border-x border-gray-200 text-center text-base font-bold text-gray-900 outline-none"
      />
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="flex w-12 items-center justify-center text-gray-600 hover:bg-gray-50"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

function DatePickerField({
  value,
  minDate,
  placeholder,
  onBlur,
  onChange,
}: {
  value: string;
  minDate?: Date;
  placeholder: string;
  onBlur: () => void;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedDate = dateFromValue(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          onBlur={onBlur}
          className={cn(
            "mt-1 h-12 w-full justify-start rounded-lg border-gray-300 bg-white px-3 text-left font-normal",
            !selectedDate && "text-muted-foreground",
          )}
        >
          <CalendarDays className="mr-2 size-4 text-gray-500" />
          {selectedDate ? format(selectedDate, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          defaultMonth={selectedDate ?? minDate}
          disabled={(date) => isBeforeCalendarDay(date, minDate)}
          onSelect={(date) => {
            if (!date) return;

            onChange(valueFromDate(date));
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CustomTripStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [highestStep, setHighestStep] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    clearErrors,
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    setError,
    setValue,
    trigger,
    watch,
  } = useForm<CustomizeTripFormValues>({
    defaultValues,
    mode: "onChange",
  });
  const values = watch();

  const step = steps[activeStep];
  const progress = Math.round(((activeStep + 1) / steps.length) * 100);

  const rulesFor = (name: FormFieldName) => ({
    validate: (value: unknown) => validateField(name, value) ?? true,
  });

  const fieldError = (name: FormFieldName) => {
    const message = errors[name]?.message;
    return typeof message === "string" ? message : undefined;
  };

  const validateCurrent = () => {
    return trigger(stepFields[step.id], { shouldFocus: true });
  };

  const next = async () => {
    if (activeStep === steps.length - 1) return;
    if (!(await validateCurrent())) return;
    setActiveStep((s) => {
      const n = Math.min(s + 1, steps.length - 1);
      setHighestStep((h) => Math.max(h, n));
      return n;
    });
  };

  const back = () => setActiveStep((s) => Math.max(s - 1, 0));

  const jumpTo = async (i: number) => {
    if (i <= highestStep) {
      setActiveStep(i);
      return;
    }
    if (!(await validateCurrent())) return;
    const n = Math.min(i, activeStep + 1);
    setHighestStep((h) => Math.max(h, n));
    setActiveStep(n);
  };

  const clearErr = (name: FormFieldName) => {
    clearErrors(name);
  };

  const onSubmit = async (value: CustomizeTripFormValues) => {
    const parsed = customizeTripSchema.safeParse(value);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const name = issue.path[0];
        if (typeof name === "string" && name in customizeTripSchema.shape) {
          setError(name as FormFieldName, {
            message: issue.message,
            type: "manual",
          });
        }
      }
      return;
    }

    try {
      setSubmitState("submitting");
      setSubmitMessage("");
      await RequestCustomBooking(parsed.data);
      setSubmitState("success");
      setSubmitMessage(
        "Your request has been sent. We'll follow up with a tailored itinerary.",
      );

    } catch (err) {
      setSubmitState("error");
      setSubmitMessage(
        err instanceof Error ? err.message : "Something went wrong",
      );
    }
  };

  // ── Step panels ───────────────────────────────────────────────────────────
  const renderStyle = () => (
    <div className="space-y-8">
      <Controller
        control={control}
        name="destination"
        rules={rulesFor("destination")}
        render={({ field }) => (
          <FieldWrap label="Destination" error={fieldError("destination")}>
            <div className="mt-1 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {destinationOptions.map((d) => (
                <ChoiceBtn
                  key={d}
                  active={field.value === d}
                  onClick={() => {
                    field.onChange(d);
                    clearErr("destination");
                  }}
                >
                  {d}
                </ChoiceBtn>
              ))}
            </div>
          </FieldWrap>
        )}
      />

      <Controller
        control={control}
        name="activities"
        rules={rulesFor("activities")}
        render={({ field }) => {
          const selected = field.value ?? [];

          return (
            <FieldWrap label="Activities" error={fieldError("activities")}>
              <div className="mt-1 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {activityOptions.map((a) => (
                  <ChoiceBtn
                    key={a}
                    active={selected.includes(a)}
                    onClick={() => {
                      const next = selected.includes(a)
                        ? selected.filter((x: string) => x !== a)
                        : [...selected, a];
                      field.onChange(next);
                      clearErr("activities");
                    }}
                  >
                    {a}
                  </ChoiceBtn>
                ))}
              </div>
            </FieldWrap>
          );
        }}
      />
    </div>
  );

  const renderTiming = () => (
    <div className="space-y-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Controller
          control={control}
          name="preferredStartDate"
          rules={rulesFor("preferredStartDate")}
          render={({ field }) => (
            <FieldWrap
              label="Start date"
              error={fieldError("preferredStartDate")}
            >
              <DatePickerField
                value={field.value}
                minDate={dateFromValue(today())}
                placeholder="Select start date"
                onBlur={field.onBlur}
                onChange={(value) => {
                  field.onChange(value);
                  clearErr("preferredStartDate");
                  const days = tripLength(value, getValues("preferredEndDate"));
                  if (days)
                    setValue("numberOfDays", days, { shouldDirty: true });
                }}
              />
            </FieldWrap>
          )}
        />

        <Controller
          control={control}
          name="preferredEndDate"
          rules={rulesFor("preferredEndDate")}
          render={({ field }) => (
            <FieldWrap label="End date" error={fieldError("preferredEndDate")}>
              <DatePickerField
                value={field.value}
                minDate={dateFromValue(
                  getValues("preferredStartDate") || today(),
                )}
                placeholder="Select end date"
                onBlur={field.onBlur}
                onChange={(value) => {
                  field.onChange(value);
                  clearErr("preferredEndDate");
                  const days = tripLength(
                    getValues("preferredStartDate"),
                    value,
                  );
                  if (days)
                    setValue("numberOfDays", days, { shouldDirty: true });
                }}
              />
            </FieldWrap>
          )}
        />
      </div>

      <Controller
        control={control}
        name="isDateFlexible"
        rules={rulesFor("isDateFlexible")}
        render={({ field }) => (
          <label
            htmlFor="trip-date-flexible"
            className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm"
          >
            <Checkbox
              id="trip-date-flexible"
              checked={field.value}
              onCheckedChange={(v) => field.onChange(!!v)}
              className="mt-0.5"
            />
            <span>
              <span className="block font-semibold text-gray-900">
                My dates are flexible
              </span>
              <span className="mt-0.5 block text-gray-500">
                We can suggest a better window for wildlife or weather.
              </span>
            </span>
          </label>
        )}
      />

      <div className="grid gap-5 md:grid-cols-3">
        {(["numberOfDays", "numberOfAdults", "numberOfChildren"] as const).map(
          (name) => (
            <Controller
              key={name}
              control={control}
              name={name}
              rules={rulesFor(name)}
              render={({ field }) => (
                <FieldWrap
                  label={
                    name === "numberOfDays"
                      ? "Days"
                      : name === "numberOfAdults"
                        ? "Adults"
                        : "Children"
                  }
                  error={fieldError(name)}
                >
                  <NumStepper
                    value={field.value}
                    min={name === "numberOfChildren" ? 0 : 1}
                    onChange={(v) => {
                      field.onChange(v);
                      clearErr(name);
                    }}
                  />
                </FieldWrap>
              )}
            />
          ),
        )}
      </div>
    </div>
  );

  const renderBudget = () => (
    <div className="space-y-8">
      <Controller
        control={control}
        name="preferredPricingTier"
        rules={rulesFor("preferredPricingTier")}
        render={({ field }) => (
          <FieldWrap
            label="Pricing tier"
            error={fieldError("preferredPricingTier")}
          >
            <div className="mt-1 grid gap-3 sm:grid-cols-3">
              {pricingTiers.map((t) => (
                <ChoiceBtn
                  key={t}
                  active={field.value === t}
                  onClick={() => {
                    field.onChange(t);
                    clearErr("preferredPricingTier");
                  }}
                >
                  {formatTier(t)}
                </ChoiceBtn>
              ))}
            </div>
          </FieldWrap>
        )}
      />

      <div className="grid gap-5 md:grid-cols-[1fr_1fr_140px]">
        {(["budgetMin", "budgetMax"] as const).map((name) => (
          <Controller
            key={name}
            control={control}
            name={name}
            rules={rulesFor(name)}
            render={({ field }) => (
              <FieldWrap
                label={
                  name === "budgetMin" ? "Minimum budget" : "Maximum budget"
                }
                error={fieldError(name)}
              >
                <Input
                  type="number"
                  min={0}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    field.onChange(Math.max(0, Number(e.target.value)));
                    clearErr(name);
                  }}
                  className="mt-1 h-12"
                />
              </FieldWrap>
            )}
          />
        ))}

        <Controller
          control={control}
          name="currency"
          rules={rulesFor("currency")}
          render={({ field }) => (
            <FieldWrap label="Currency" error={fieldError("currency")}>
              <Select
                value={field.value}
                onValueChange={(v) => {
                  field.onChange(v);
                  clearErr("currency");
                }}
              >
                <div className={"w-full border p-1.5 rounded-xl"}>
                  <SelectTrigger className="w-full border-none">
                    <SelectValue />
                  </SelectTrigger>
                </div>
                <SelectContent>
                  {["USD", "KES", "EUR", "GBP"].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldWrap>
          )}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Controller
          control={control}
          name="accommodationPreference"
          rules={rulesFor("accommodationPreference")}
          render={({ field }) => (
            <FieldWrap
              label="Accommodation"
              error={fieldError("accommodationPreference")}
            >
              <Select
                value={field.value}
                onValueChange={(v) => {
                  field.onChange(v);
                  clearErr("accommodationPreference");
                }}
              >
                <div className={"w-full border p-1.5 rounded-xl"}>
                  <SelectTrigger className="w-full border-none">
                    <SelectValue />
                  </SelectTrigger>
                </div>
                <SelectContent className={"p-4 rounded-4xl"}>
                  {[
                    "Comfortable guest house",
                    "Lodge or tented camp",
                    "Luxury lodge",
                    "Boutique beach resort",
                  ].map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldWrap>
          )}
        />

        <Controller
          control={control}
          name="transportationPreference"
          rules={rulesFor("transportationPreference")}
          render={({ field }) => (
            <FieldWrap
              label="Transport"
              error={fieldError("transportationPreference")}
            >
              <Select
                value={field.value}
                onValueChange={(v) => {
                  field.onChange(v);
                  clearErr("transportationPreference");
                }}
              >
                <div className={"w-full border p-1.5 rounded-xl"}>
                  <SelectTrigger className="w-full border-none">
                    <SelectValue />
                  </SelectTrigger>
                </div>
                <SelectContent>
                  {[
                    "Private 4x4 safari vehicle",
                    "Shared safari vehicle",
                    "Fly-in safari",
                    "Mix of road and flights",
                  ].map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldWrap>
          )}
        />
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Controller
          control={control}
          name="fullName"
          rules={rulesFor("fullName")}
          render={({ field }) => (
            <FieldWrap label="Full name" error={fieldError("fullName")}>
              <Input
                value={field.value}
                placeholder="Your name"
                onBlur={field.onBlur}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  clearErr("fullName");
                }}
                className="mt-1 h-12"
              />
            </FieldWrap>
          )}
        />

        <Controller
          control={control}
          name="phone"
          rules={rulesFor("phone")}
          render={({ field }) => (
            <FieldWrap label="Phone" error={fieldError("phone")}>
              <Input
                value={field.value}
                placeholder="+254..."
                onBlur={field.onBlur}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  clearErr("phone");
                }}
                className="mt-1 h-12"
              />
            </FieldWrap>
          )}
        />
      </div>

      <Controller
        control={control}
        name="email"
        rules={rulesFor("email")}
        render={({ field }) => (
          <FieldWrap label="Email" error={fieldError("email")}>
            <Input
              type="email"
              value={field.value}
              placeholder="you@example.com"
              onBlur={field.onBlur}
              onChange={(e) => {
                field.onChange(e.target.value);
                clearErr("email");
              }}
              className="mt-1 h-12"
            />
          </FieldWrap>
        )}
      />

      <Controller
        control={control}
        name="specialRequests"
        rules={rulesFor("specialRequests")}
        render={({ field }) => (
          <FieldWrap
            label="Special requests"
            error={fieldError("specialRequests")}
          >
            <Textarea
              value={field.value ?? ""}
              placeholder="Pace, accessibility, celebrations, dietary needs..."
              onBlur={field.onBlur}
              onChange={(e) => {
                field.onChange(e.target.value);
                clearErr("specialRequests");
              }}
              className="mt-1 min-h-36"
            />
            <p className="text-right text-xs text-gray-400">
              {(field.value ?? "").length} characters
            </p>
          </FieldWrap>
        )}
      />

      {submitMessage && (
        <p
          className={cn(
            "rounded-lg border p-4 text-sm font-medium",
            submitState === "success" &&
              "border-emerald-200 bg-emerald-50 text-emerald-800",
            submitState === "error" && "border-red-200 bg-red-50 text-red-700",
          )}
        >
          {submitMessage}
        </p>
      )}
    </div>
  );

  // ── Summary sidebar ───────────────────────────────────────────────────────
  const renderSummary = () => {
    const days = tripLength(values.preferredStartDate, values.preferredEndDate);

    return (
      <aside className="h-fit rounded-[40px] border border-emerald-900 bg-emerald-950 p-5 text-white lg:sticky lg:top-28">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full bg-white/10">
            <CheckCircle2 className="text-emerald-300" size={22} />
          </span>
          <div>
            <h3 className="text-xl font-bold">Trip snapshot</h3>
            <p className="text-sm text-white/60">Updates as you plan</p>
          </div>
        </div>

        <div className="space-y-5">
          {[
            { label: "Destination", value: values.destination,                                                                          icon: MapPin       },
            { label: "Dates",       value: values.preferredStartDate && values.preferredEndDate ? `${values.preferredStartDate} → ${values.preferredEndDate}` : "Not selected", icon: CalendarDays },
            { label: "Duration",    value: `${days ?? values.numberOfDays} days${values.isDateFlexible ? " · flexible" : ""}`,          icon: Clock        },
            { label: "Travelers",   value: `${values.numberOfAdults} adults, ${values.numberOfChildren} children`,                      icon: Users        },
            { label: "Budget",      value: `${values.currency} ${values.budgetMin.toLocaleString()} – ${values.budgetMax.toLocaleString()}`, icon: Banknote },
            { label: "Tier",        value: formatTier(values.preferredPricingTier),                                                     icon: Star         },
          ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-white/10">
      <Icon size={14} className="text-emerald-300" />
    </span>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-emerald-300">{label}</dt>
                  <dd className="mt-0.5 text-white">{value}</dd>
                </div>
              </div>
          ))}

        </div>



        <div className="mt-6 border-t border-white/15 pt-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">
            Activities
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {values.activities.map((a: string) => (
              <span
                key={a}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </aside>
    );
  };

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <section className="px-4 py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-emerald-700">
            Custom planning
          </p>
          <h2 className="text-3xl font-bold font-pangaia text-gray-700">
            Build a safari request in four clear steps
          </h2>
          <p className="mt-1 text-base text-gray-600">
            Share the essentials once, then we'll turn it into a practical East
            African itinerary.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div className="overflow-hidden">
            {/* Step header */}
            <div className="border-b border-gray-200 pb-10">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    Step {activeStep + 1} of {steps.length}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-950">
                    {step.title}
                  </h3>
                </div>
                <span className="text-sm font-bold text-emerald-700">
                  {progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-emerald-700 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <ol className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  const isActive = activeStep === i;
                  const isDone = i < activeStep;
                  const available = i <= highestStep || i <= activeStep + 1;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => void jumpTo(i)}
                        disabled={!available}
                        aria-current={isActive ? "step" : undefined}
                        className={cn(
                          "flex min-h-16 w-full items-center gap-3 rounded-lg border p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-40",
                          isActive &&
                            "border-emerald-700 bg-emerald-50 text-emerald-900",
                          isDone &&
                            "border-emerald-200 bg-white text-emerald-800",
                          !isActive &&
                            !isDone &&
                            "border-gray-200 bg-white text-gray-600 hover:border-gray-300",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-full border",
                            isActive || isDone
                              ? "border-emerald-700 bg-emerald-700 text-white"
                              : "border-gray-300 bg-gray-50 text-gray-500",
                          )}
                        >
                          {isDone ? <Check size={16} /> : <Icon size={16} />}
                        </span>
                        <span>
                          <span className="block text-xs font-semibold uppercase tracking-wide">
                            {s.label}
                          </span>
                          <span className="block text-sm font-medium">
                            {i + 1}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Step body */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Only allow actual submit on last step
                if (activeStep !== steps.length - 1) return;
                void handleSubmit(onSubmit)(e);
              }}
              className="py-5"
            >
              {step.id === "style" && renderStyle()}
              {step.id === "timing" && renderTiming()}
              {step.id === "budget" && renderBudget()}
              {step.id === "contact" && renderContact()}

              {/* Navigation */}
              <div className="mt-8 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={back}
                  disabled={activeStep === 0 || submitState === "submitting"}
                  className="h-12 rounded-lg px-5"
                >
                  <ArrowLeft size={18} /> Back
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    disabled={
                      submitState === "submitting" || submitState === "success"
                    }
                    className="h-12 rounded-lg bg-emerald-700 px-6 text-white hover:bg-emerald-800"
                  >
                    {submitState === "submitting" ? (
                      <>
                        <Loader2 className="animate-spin" size={18} /> Sending…
                      </>
                    ) : submitState === "success" ? (
                      <>
                        <Check size={18} /> Sent!
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Send trip request
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => void next()}
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
