"use client";

import React, { useState } from "react";
import { requestBooking } from "@/lib/api";
import { Destination } from "@/components/sections/destinations";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

interface BookingFormProps {
  trip: Destination;
}

const BookingForm = ({ trip }: BookingFormProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      journeyId: trip.id,
      travelDate: formData.get("travelDate") as string,
      numberOfAdults: Number(formData.get("adults")),
      numberOfChildren: Number(formData.get("children")),
      pricingTier: "Standard",
      nationality: formData.get("nationality") as string,
      specialRequests: formData.get("requests") as string,
    };

    try {
      await requestBooking(payload);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[40px] text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send size={32} />
        </div>
        <h3 className="text-3xl font-pangaia font-extrabold text-emerald-900">Enquiry Sent!</h3>
        <p className="text-emerald-700">Thank you for your interest in the {trip.name}. Our safari experts will contact you shortly to finalize your itinerary.</p>
        <Button 
            variant="outline" 
            className="mt-4 rounded-xl"
            onClick={() => setSuccess(false)}
        >
            Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <div id="booking" className="bg-white border border-gray-100 p-8 md:p-12 rounded-[48px] shadow-sm">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-pangaia font-extrabold mb-4">Plan Your Journey</h2>
        <p className="text-gray-600">Fill out the form below and we'll help you craft the perfect experience.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Full Name</label>
            <input
              required
              name="fullName"
              type="text"
              placeholder="John Doe"
              className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Email Address</label>
            <input
              required
              name="email"
              type="email"
              placeholder="john@example.com"
              className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Phone Number</label>
            <input
              required
              name="phone"
              type="tel"
              placeholder="+1 (234) 567-890"
              className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Nationality</label>
            <input
              required
              name="nationality"
              type="text"
              placeholder="e.g. American"
              className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Travel Date</label>
            <input
              required
              name="travelDate"
              type="date"
              className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Adults</label>
            <input
              required
              name="adults"
              type="number"
              min="1"
              defaultValue="2"
              className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Children</label>
            <input
              name="children"
              type="number"
              min="0"
              defaultValue="0"
              className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Special Requests</label>
          <textarea
            name="requests"
            rows={4}
            placeholder="Tell us about any specific requirements or preferences..."
            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
          ></textarea>
        </div>

        {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-gray-900 text-white py-6 rounded-[24px] font-bold text-xl hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              Processing...
            </>
          ) : (
            "Send Enquiry"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
