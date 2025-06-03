"use client";

import { useState, useEffect, useRef } from "react";
import { CircleUserRound, Pencil } from "lucide-react";
import { EditableField } from "@/components/EditableField";
import { PasswordField } from "@/components/PasswordField";
import { AutocompleteAddress } from "@/components/AutocompleteAddress";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function ProfilPage() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [ine, setIne] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("/avatar.jpg");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetch("../api/profil")
      .then((res) => {
        if (!res.ok) {
          throw new Error(t("Profil.error"));
        }
        return res.json();
      })
      .then((data) => {
        setName(data.name ?? "Nom inconnu");
        setCourse(data.course ?? "Aucun cursus");
        setYear(data.year ?? "Aucune année");
        setIne(data.ine ?? "Pas d'INE");
        setEmail(data.email ?? "Email inconnu");
        setPhone(data.phone ?? "Téléphone inconnu");
        setAddress(data.address ?? "Adresse inconnue");
        setAvatar(data.avatarUrl ?? "/avatar.jpg");
      })
      .catch((err) => {
        console.error(err);
        setName("Nom inconnu");
        setCourse("Aucun cursus");
        setYear("Aucune année");
        setIne("Pas d'INE");
        setEmail("Email inconnu");
        setPhone("Téléphone inconnu");
        setAddress("Adresse inconnue");
      });
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setAvatar(result);
        fetch("../api/profil", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ avatarUrl: result }),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <h1 className="md:mx-50 m-5 text-2xl font-bold mb-4 flex items-center gap-2">
        <CircleUserRound className="w-6 h-6" />
        {t("Profil.title")}
      </h1>

      <main className="md:mx-50 m-5 flex-1 flex flex-col justify-start space-y-8">
        <div className="relative w-full">
          <div className="h-40 bg-amber-400 rounded-lg shadow-md" />
          <div className="absolute left-6 -bottom-16 w-32 h-32 group">
            <Image
              src={avatar}
              width={128}
              height={128}
              alt="Avatar"
              className="rounded-full object-cover border-4 border-background shadow-lg w-full h-full"
              priority
            />

            <button
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 rounded-full text-white"
              onClick={() => fileInputRef.current?.click()}
              aria-label={t("Profil.changePic")}
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
        <div className="mt-4 bg-card shadow-md rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold">{name}</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="space-y-4 flex-1">
              <p className="text-muted-foreground">{course}</p>
              <p className="text-muted-foreground">{year}</p>
              <p className="text-muted-foreground">{ine}</p>
              <PasswordField
                label={t("Profil.password")}
                value={password}
                onChange={(val) => {
                  setPassword(val);
                  fetch("../api/profil", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ password: val }),
                  });
                }}
              />
            </div>
            <div className="space-y-4 flex-1">
              <EditableField
                label={t("Profil.tel")}
                value={phone}
                onChange={(val) => {
                  setPhone(val);
                  fetch("../api/profil", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ phone: val }),
                  });
                }}
              />
              <EditableField
                label="Email"
                value={email}
                onChange={(val) => {
                  setEmail(val);
                  fetch("../api/profil", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: val }),
                  });
                }}
              />
              <AutocompleteAddress
                label={t("Profil.address")}
                value={address}
                onChange={(val) => {
                  setAddress(val);
                  fetch("../api/profil", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ address: val }),
                  });
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
