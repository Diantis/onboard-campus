"use client";

import { useState, useRef } from "react";
import { CircleUserRound, Pencil } from "lucide-react";
import { EditableField } from "@/components/EditableField";

export default function ProfilePage() {
  const [name, setName] = useState("Margaret Villard");
  const [description, setDescription] = useState("Étudiante en Informatique à l’Université");
  const [email, setEmail] = useState("margaret@example.com");
  const [phone, setPhone] = useState("+33 6 12 34 56 78");
  const [cursus, setCursus] = useState("Licence Informatique");
  const [year, setYear] = useState("2ème année");
  const [bio, setBio] = useState("Passionnée de développement web et d’UX design.");
  const [avatar, setAvatar] = useState("/avatar-72-01.jpg");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <h1 className="md:mx-50 m-5 text-2xl font-bold mb-4 flex items-center gap-2">
        <CircleUserRound className="w-6 h-6" />
        Mon Profil
      </h1>

      <main className="md:mx-50 m-5 flex-1 flex flex-col justify-start space-y-8">
        <div className="relative w-full">
          <div className={`h-40 bg-amber-400 rounded-lg shadow-md`} />
          <div className="absolute -bottom-12 left-6 group">
            <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-background shadow-lg object-cover" />
            <button
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 rounded-full text-white"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Changer la photo de profil"
            >
              <Pencil size={20} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="sr-only"
            />
          </div>
        </div>

        {/* Informations */}
        <div className="mt-16 bg-card shadow-md rounded-lg p-6 space-y-4">
          {/* Nom et Description modifiables */}
          <EditableField label="Nom" value={name} onChange={setName} />
          <EditableField label="Description" value={description} onChange={setDescription} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <EditableField label="Email" value={email} onChange={setEmail} />
            <EditableField label="Téléphone" value={phone} onChange={setPhone} />
            <EditableField label="Cursus" value={cursus} onChange={setCursus} />
            <EditableField label="Année" value={year} onChange={setYear} />
          </div>
          <div className="mt-4">
            <EditableField label="Biographie" value={bio} onChange={setBio} />
          </div>
        </div>
      </main>
    </div>
  );
}
