import Link from "next/link";
import { IoIosSchool, IoMdRestaurant } from "react-icons/io";
import { IoBook } from "react-icons/io5";
import { FaHandshake } from "react-icons/fa";
import { FaSchool } from "react-icons/fa6";
import { BiHealth } from "react-icons/bi";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { FloatingMenu } from "@/components/FloatingMenu";

const serviceItems = [
  {
    id: "scolarite",
    title: "Scolarité",
    IconComponent: FaSchool,
    color: "#00BCFF",
    link: "/services/scolarite",
  },
  {
    id: "restauration",
    title: "Restauration",
    IconComponent: IoMdRestaurant,
    color: "#00D492",
    link: "/services/restauration",
  },
  {
    id: "vie-associative",
    title: "Vie Associative",
    IconComponent: FaHandshake,
    color: "#FF637E",
    link: "/services/vie-associative",
  },
  {
    id: "tutorat",
    title: "Tutorat",
    IconComponent: IoIosSchool,
    color: "#FDC700",
    link: "/services/tutorat",
  },
  {
    id: "aides-scolaires",
    title: "Aides Scolaires",
    IconComponent: IoBook,
    color: "#A684FF",
    link: "/services/aides-scolaires",
  },
  {
    id: "sante",
    title: "Santé",
    IconComponent: BiHealth,
    color: "#FF8904",
    link: "/services/sante",
  },
];

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header userName="Machin" />
      <main className="flex-grow">
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 rounded-lg mx-auto my-8">
          {serviceItems.map((item) => {
            const { id, title, IconComponent, color, link } = item;

            return (
              <Link
                key={id}
                href={link}
                className="p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-lg min-h-[180px] hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer"
                style={{ backgroundColor: color }}
              >
                <IconComponent size={68} className="text-white mb-3" />
                <h2 className="text-white font-semibold text-lg">{title}</h2>
              </Link>
            );
          })}
        </div>
      </main>
      <FloatingMenu />
      <BottomNav />
    </div>
  );
};

export default Page;
