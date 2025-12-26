import { DynamicIcon } from "lucide-react/dynamic";
import { useEffect, useState } from "react";
import PayButton from "./PayButton";

type PaymentLayoutProps = {
  onClose: () => void;
  data: {
    title: string;
    amount: number;
    description: string;
  };
  userId: string;
};

const PaymentLayout = ({ onClose, data, userId }: PaymentLayoutProps) => {
  const [form, setForm] = useState({
    userId: userId,
    name: "",
    email: "",
    phone: "",
    plan: data.title,
  });

  // 👉 amount state (editable only for Enterprise)
  const [amount, setAmount] = useState<number>(data.amount);

  const isValid =
    form.name.length > 2 &&
    form.email.includes("@") &&
    form.phone.length >= 10 &&
    amount > 0;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/80 border border-white/30 rounded-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white/20 p-2 rounded-full"
        >
          <DynamicIcon name="x" size={18} />
        </button>

        <h2 className="text-xl font-bold text-center">Secure Payment</h2>
        <p className="text-white/60 text-center mb-4">{data.title} Plan</p>

        {/* Amount Section (Design preserved) */}
        <div className="bg-white/10 p-4 rounded-xl text-sm">
          {data.title === "Enterprise" ? (
            <div className="flex justify-between items-center gap-2">
              <span>Amount</span>
              <input
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="bg-white/10 p-1 rounded-md text-right w-24"
              />
            </div>
          ) : (
            <div className="flex justify-between">
              <span>Amount</span>
              <span>₹ {data.amount}</span>
            </div>
          )}

          <p className="text-white/60 mt-2">{data.description}</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3 mt-4">
          <input
            className="bg-white/10 p-2 rounded-md"
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="bg-white/10 p-2 rounded-md"
            placeholder="Email"
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="bg-white/10 p-2 rounded-md"
            placeholder="Phone"
            type="tel"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <PayButton
            amount={amount}
            user={form}
            disabled={!isValid}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentLayout;
