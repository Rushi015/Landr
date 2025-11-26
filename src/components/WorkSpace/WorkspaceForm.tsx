"use client";
import { v4 as uuidv4, v4 } from "uuid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createWorkspce } from "@/lib/queries";
export default function WorkspaceForm({ user }: { user: any }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [mobNumber, SetMobNumber] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = uuidv4();

    const res = await fetch("/api/workspace", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, email, mobNumber }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push(`/workspace/${data.id}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-xl max-w-[400px] m-auto shadow-md flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold">Create Your Workspace</h2>
      <input
        type="text"
        placeholder="Workspace name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Mobnumber"
        value={mobNumber}
        onChange={(e) => SetMobNumber(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Create Workspace
      </button>
    </form>
  );
}
