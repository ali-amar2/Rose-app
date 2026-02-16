import React from "react";
import { ArrowLeft } from "lucide-react";
import PayMethod from "./pay-method";
import { useTranslations } from "next-intl";

export default function PaymentMethod({ setStep }: CheckoutStep) {
  // translation
  const t = useTranslations("payment-method");
  // state
  const [selectedMethod, setSelectedMethod] = React.useState<string>("cash");

  // for Test
  const list = [
    {
      image: "/assets/cash.png",
      title: t("cash"),
      description: t("cash-description"),
      method: "cash",
    },
    {
      image: "/assets/credit.png",
      title: t("card"),
      description: t("card-description"),
      method: "credit",
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setStep("shipping_address")}
          className="bg-zinc-100 text-zinc-00 p-2 rounded-lg flex items-center gap-1 "
        >
          <ArrowLeft size={20} strokeWidth={1.5} className="rtl:rotate-180" />
          {t("back")}
        </button>
        <h3 className="font-semibold text-3xl">{t("title")}</h3>
      </div>
      {/* Methods List */}
      <ul className="p-3 flex gap-4 h-80">
        {list.map((item, index) => (
          <li key={index} className="flex-1 h-full">
            <button
              className="w-full h-full"
              onClick={() => setSelectedMethod(item.method)}
            >
              {selectedMethod === item.method ? (
                // if the method is selected
                <PayMethod
                  index={index}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  selectedMethod={true}
                />
              ) : (
                // if the method is not selected
                <PayMethod
                  index={index}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  selectedMethod={false}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
