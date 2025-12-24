import { DynamicIcon } from "lucide-react/dynamic";
import { createOrder } from "../../api/payment.api";
import { loadRazorpay } from "../../utils/loadRazorpay";
import { server_url } from "../../utils/url";
import toast from "react-hot-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type PayButtonProps = {
  amount: number;
  user: {
    name: string;
    email: string;
    phone: string;
    userId: string;
    plan: string;
  };
  disabled: boolean;
  onClose: () => void;
};

const PayButton = ({ amount, user, disabled, onClose }: PayButtonProps) => {
  const pay = async () => {
    if (disabled) return;

    const toastId = toast.loading("Creating payment...");

    try {
      await loadRazorpay();

      const order = await createOrder({
        userId: user.userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        plan: user.plan,
        amount,
      });

      toast.dismiss(toastId);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,

        handler: async function (res: any) {
          try {
            await fetch(`${server_url}/api/payment/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...res,
                user,
              }),
            });

            toast.success("Payment successful 🎉");
            onClose(); // ✅ close modal
          } catch (err) {
            toast.error("Payment verification failed");
          }
        },

        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function () {
        toast.error("Payment failed ❌");
      });

      rzp.open();
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      onClick={pay}
      disabled={disabled}
      type="button"
      className={`mt-6 transition p-3 rounded-full flex items-center justify-center gap-2 text-sm sm:text-base w-full
        ${
          disabled
            ? "bg-blue-600/50 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
    >
      <DynamicIcon name="credit-card" />
      Pay ₹{amount}
    </button>
  );
};

export default PayButton;
