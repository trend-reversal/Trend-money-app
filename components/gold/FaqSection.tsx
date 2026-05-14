const FAQS = [
    {
        question: "Why should I upgrade?",
        answer:
            "Upgrading gives you access to premium features and better investment benefits.",
    },
    {
        question: "What payment methods can I use?",
        answer:
            "You can pay using UPI, debit cards, credit cards, and net banking.",
    },
    {
        question: "How does billing work?",
        answer:
            "Billing is processed automatically according to your selected investment plan.",
    },
    {
        question: "How can I cancel?",
        answer:
            "You can cancel anytime directly from your profile settings.",
    },
];

export default function FaqSection() {
    return (
        <div className="px-4 mt-6">
            <h3 className="text-[15px] font-inter font-semibold text-[#B5B7B9] mb-2">
                FAQs
            </h3>

            <div className="bg-transparent rounded-[14px] overflow-hidden">
                {FAQS.map((faq, i) => (
                    <details
                        key={i}
                        className="border-b border-dashed border-[#E5E5E5] py-5 group"
                    >
                        <summary className="list-none flex items-start justify-between cursor-pointer">
                            <p className="text-[16px] leading-[24px] text-[#111827] font-inter pr-4">
                                {faq.question}
                            </p>

                            <span className="text-[#9CA3AF] text-[22px] leading-none transition-all duration-200 group-open:rotate-45">
                                +
                            </span>
                        </summary>

                        <p className="mt-3 text-[14px] leading-[22px] text-[#6B7280] pr-6">
                            {faq.answer}
                        </p>
                    </details>
                ))}
            </div>
        </div>
    );
}