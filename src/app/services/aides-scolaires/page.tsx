import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoBook } from "react-icons/io5";

const page = () => {
  return (
    <div>
      <div className="w-full my-8 px-4 md:px-7 lg:px-12 pb-24">
        <Button className="mb-8">
          <Link href={"/services"}>Retour</Link>
        </Button>

        <div
          className="
            flex flex-col md:flex-row
            gap-8
            mb-12
            items-center md:items-start
            justify-center mx-auto
          "
        >
          <div
            className="
              p-6 rounded-xl flex flex-col items-center justify-center text-center
              shadow-lg min-h-[180px] bg-[#A684FF] text-white
              w-full md:w-56
            "
          >
            <IoBook size={68} />
            <h2 className="text-white font-semibold text-lg mt-3">
              Aides Scolaires
            </h2>
          </div>
          <div
            className="
              bg-white shadow-md rounded-xl
              px-6 py-4
              text-gray-800
              max-w-xl w-full
              border border-gray-100
              md:ml-4
            "
          >
            <p className="text-lg leading-relaxed tracking-wide text-gray-700 font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        <article className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 text-center md:text-left">
            Tout savoir sur la aides scolaires
          </h1>

          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-[#A684FF] mb-3 mt-6">
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#A684FF] mb-3 mt-6">
                Les démarches administratives
              </h2>
              <p className="mb-3 text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim,
                nec dictum urna quam nec urna.
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1 text-gray-700 leading-relaxed">
                <li>Lorem ipsum dolor sit amet, consectetur.</li>
                <li>Vestibulum ante ipsum primis in faucibus.</li>
                <li>Morbi tristique senectus et netus et malesuada.</li>
                <li>Etiam euismod urna eu tincidunt consectetur.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#A684FF] mb-3 mt-6">
                Conseils pour réussir
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi
                aliquam nisi, nec dictum urna quam nec urna.
              </p>
              <blockquote className="border-l-4 border-[#A684FF] pl-4 py-3 my-5 italic text-gray-600 bg-blue-50 rounded-r-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </blockquote>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi
                aliquam nisi, nec dictum urna quam nec urna.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default page;
