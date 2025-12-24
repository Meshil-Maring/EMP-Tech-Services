import { useState, forwardRef } from "react";
import PricingCart from "../modules/PricingCart.tsx";
import PaymentLayout from "../modules/PaymentLayout.tsx";
import { useNavigate } from "react-router-dom";
import { server_url } from "../../utils/url.tsx";

// Pricing data
const pricingPlans = [
  {
    title: "Starter",
    description: "Perfect for small businesses and startups",
    amount: 10000,
    list: [
      "Responsive Website (5 pages)",
      "Mobile Optimized",
      "Basic SEO Setup",
      "Contact Form",
      "30 Days Support",
      "SSL Certificate",
    ],
  },
  {
    title: "Professional",
    description: "Ideal for growing businesses",
    amount: 25000,
    popular: true,
    list: [
      "Custom Web Application",
      "Advanced UI/UX Design",
      "CMS Integration",
      "E-commerce Ready",
      "90 Days Support",
      "Performance Optimization",
      "Analytics Integration",
      "API Development",
    ],
  },
  {
    title: "Enterprise",
    description: "For large-scale applications",
    amount: 0,
    list: [
      "Full-Stack Development",
      "Custom Software Solution",
      "Cloud Infrastructure",
      "Advanced Security",
      "Regular Maintenance",
      "Priority Updates",
      "Consultation & Training",
      "API Development",
    ],
  },
];

const Pricing = forwardRef<HTMLDivElement>((_, ref) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [userId, setUserId] = useState<string>("");

  // Navigate to other routes
  const navigate = useNavigate();

  // Checking user is authenticate or not
  const isAuth = async () => {
    try {
      const res = await fetch(`${server_url}/api/check-auth`, {
        credentials: "include",
      });

      if (res.ok) {
        const result = await res.json();
        setUserId(result.userid);
      }

      return res.ok;
    } catch (err) {
      console.error("Auth check failed", err);
      return false;
    }
  };

  const openOverlay = async (index: number) => {
    const authenticated = await isAuth();
    if (!authenticated) return navigate("/auth/log-in");

    setSelectedPlan(index);
    setOverlayOpen(true);
  };

  const closeOverlay = () => setOverlayOpen(false);

  return (
    <div ref={ref} className="py-40">
      <h3 className="text-4xl font-bold text-center">
        Simple <span className="text-blue-400">Pricing</span>
      </h3>

      <p className="text-white/50 text-center p-4 max-w-2xl mx-auto">
        Choose the perfect plan for your project.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-3 max-w-[1200px] mx-auto px-6">
        <PricingCart plans={pricingPlans} onSelect={openOverlay} />
      </div>

      {overlayOpen && (
        <PaymentLayout
          // userId =
          onClose={closeOverlay}
          data={pricingPlans[selectedPlan]}
          userId={userId}
        />
      )}
    </div>
  );
});

export default Pricing;
