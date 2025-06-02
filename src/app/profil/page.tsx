"use client";

import { useState, useRef } from "react";
import { CircleUserRound, Pencil } from "lucide-react";
import { EditableField } from "@/components/EditableField";
import { PasswordField } from "@/components/PasswordField";
import { AutocompleteAddress } from "@/components/AutocompleteAddress"; // Import le composant autocomplete

export default function ProfilePage() {
const [password, setPassword] = useState("");
const [email, setEmail] = useState("margaret@example.com");
const [phone, setPhone] = useState("+33 6 12 34 56 78");
const [address, setAddress] = useState("12 rue de la Paix 75000 PARIS");
const [avatar, setAvatar] = useState("/avatar-72-01.jpg");

const fileInputRef = useRef<HTMLInputElement>(null);

const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	const file = e.target.files?.[0];
	if (file) {
	const reader = new FileReader();
	reader.onload = () => setAvatar(reader.result as string);
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
		{/* Avatar et bannière */}
		<div className="relative w-full">
		<div className="h-40 bg-amber-400 rounded-lg shadow-md" />
			<div className="absolute -bottom-12 left-6 group">
				<img
				src={avatar}
				alt="Avatar"
				className="w-32 h-32 rounded-full border-4 border-background shadow-lg object-cover"
				/>
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
		<div className="mt-4 bg-card shadow-md rounded-lg p-6 space-y-4">
			<h2 className="text-2xl font-bold">Margaret Villard</h2>
			<div className="flex flex-col md:flex-row gap-8">
				<div className="space-y-4 flex-1">
					<p className="text-muted-foreground">Bachelor Informatique</p>
					<p className="text-muted-foreground">2ème année</p>
					<p className="text-muted-foreground">N°123456789A1</p>
					<PasswordField label="Mot de Passe" onChange={setPassword} />
				</div>
				<div className="space-y-4 flex-1">
					<EditableField label="Téléphone" value={phone} onChange={setPhone} />
					<EditableField label="Email" value={email} onChange={setEmail} />
					<AutocompleteAddress label="Adresse" value={address} onChange={setAddress} />
				</div>
			</div>
		</div>
	</main>
	</div>
);
}
