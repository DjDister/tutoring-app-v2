"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  room: z.string().min(1, "Room id is required"),
});

export default function JoinRoomForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      room: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    router.push(`/room/${data.room}?userId=${data.name}`);
  };

  return (
    <div className="w-1/2 h-full flex justify-center  flex-col">
      <Input placeholder="Enter username" {...register("name")} />
      <p className="text-xs text-red-400 h-4 my-1">
        {errors.name ? errors.name.message : ""}
      </p>
      <Input placeholder="Enter room id" {...register("room")} />
      <p className="text-xs text-red-400 h-4 my-1">
        {errors.room ? errors.room.message : ""}
      </p>
      <button
        disabled={Boolean(Object.keys(errors).length)}
        className="p-2 px-4 flex bg-slate-200 rounded-md w-auto text-nowrap"
        onClick={() => handleSubmit(onSubmit)()}
      >
        Join room
      </button>
    </div>
  );
}
