import Image from "next/image";

const certificates = [
    "/images/gold/safegold.png",
    "/images/gold/vistra.png",
    "/images/gold/brinks.png",
];

export default function CertificateCarousel() {
    return (
        <div className="mt-6">
            <h3 className="text-sm text-[#B5B7B9] mb-3 font-inter uppercase px-4">
                Authenticity Certificate
            </h3>

            <div className="flex gap-4 overflow-x-scroll no-scrollbar snap-x snap-mandatory px-4">
                {certificates.map((src, i) => (
                    <div key={i} className="min-w-[260px] snap-start">
                        <Image
                            src={src}
                            alt="certificate"
                            width={300}
                            height={300}
                            className="w-full h-auto object-contain rounded-[12px]"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}