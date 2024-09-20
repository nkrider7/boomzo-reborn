"use client";
import Header from "@/components/forms/lead-contact/header";
import LeadContactInfo from "@/components/global/LeadContactInfo";
import PageWrapper from "@/components/global/PageWrapper";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimatedButton from "@/components/aceternity/AnimatedButton";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../contact/components/phone.css";

const RealEstate = () => {
  const LOCATIONS = [
    "Aligarh",
    "Noida",
    "Greater Noida",
    "New Delhi",
    "Gurugram",
    "Faridabad",
  ] as const;

  const formSchema = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    location: z.enum(LOCATIONS),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Received your real estate request!",
      style: {
        backgroundColor: "var(--mygreen)",
        color: "#fff",
        border: "none",
      },
    });
  }

  return (
    <PageWrapper>
      <div className="relative h-fit lg:min-h-[20rem] bg-black antialiased bg-grid-pattern bg-grid-size flex flex-col pt-[8.5rem] lg:pt-[8rem] pb-[2rem] md:pb-[8rem] px-[5vw] justify-center items-center gap-y-6 overflow-x-hidden overflow-y-hidden">
        <div className="w-full md:items-center md:justify-center antialiased relative overflow-hidden ">
          <div className="relative z-10 w-full md:w-[65%] mx-auto flex flex-col items-center justify-center bg-white rounded-2xl">
            {/* header */}
            <Header
              title="Find Your Perfect Home!"
              subTitle="Get in touch to find your perfect place!"
            />
            {/* body */}
            <div className="flex flex-col md:flex-row w-full">
              <LeadContactInfo />
              <div className="border-t-0 md:border-t border-black w-full md:w-[60%] flex items-center justify-center">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2 w-[100%] px-8 pt-8 pb-12"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <PhoneInputWithCountrySelect
                              international
                              countryCallingCodeEditable={false}
                              defaultCountry="IN"
                              {...field}
                              value={field.value}
                              onChange={(value) => field.onChange(value || "")}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Location</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => field.onChange(value)}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a occasion" />
                              </SelectTrigger>
                              <SelectContent>
                                {LOCATIONS.map((occasion, idx) => {
                                  return (
                                    <SelectItem key={idx} value={occasion}>
                                      {occasion}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <AnimatedButton
                      text="Submit"
                      buttonType="submit"
                      className="bg-black text-white/80 text-sm"
                      //   disableButton={isLoading}
                    />
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default RealEstate;