"use client";

import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { resetPointers } from "@/lib/modules/excalidrawPointersSlice";

export default function NameInput({ roomId }: { roomId: string }) {
  const [userNameInput, setUserNameInput] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleUsernameChange = () => {
    if (!userNameInput) return;
    dispatch(resetPointers());
    router.push(`/room/${roomId}?userId=${userNameInput}`);
  };

  return (
    <>
      <Input
        disabled={userNameInput.length > 0}
        value={userNameInput}
        placeholder="Enter username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserNameInput(e.target.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") handleUsernameChange();
        }}
        className="w-1/2"
      />
      <button
        disabled={userNameInput.length > 0}
        onClick={handleUsernameChange}
      >
        <ArrowRightIcon />
      </button>
    </>
  );
}
