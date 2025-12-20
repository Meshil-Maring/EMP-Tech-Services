import { DynamicIcon } from "lucide-react/dynamic";

const Transaction = () => {
  return (
    <section className="m-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Transactions</h1>
        <p className="text-sm text-white/60">
          Payment records and status overview
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="min-w-[900px] rounded-2xl overflow-hidden">
          {/* Table Head */}
          <div className="grid grid-cols-7 bg-white/15 text-white/70 text-sm font-medium">
            {[
              "Payment ID",
              "Order ID",
              "Date & Time",
              "Method",
              "Amount",
              "Status",
              "Action",
            ].map((item, key) => (
              <div key={key} className="px-4 py-3">
                {item}
              </div>
            ))}
          </div>

          {/* Table Row */}
          <div className="grid grid-cols-7 items-center bg-white/5 text-white hover:bg-white/10 transition">
            <div className="px-4 py-4 font-mono text-sm">ds3431fdfa2</div>

            <div className="px-4 py-4 text-sm">23428342</div>

            <div className="px-4 py-4 text-sm">01 Mar 2024 • 10:45 AM</div>

            <div className="px-4 py-4">
              <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                UPI
              </span>
            </div>

            <div className="px-4 py-4 font-semibold">₹2,000</div>

            <div className="px-4 py-4">
              <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                Success
              </span>
            </div>

            <div className="px-4 py-4 flex gap-2 cursor-pointer items-center">
              <button className="text-sm text-blue-400 ">View</button>
              <DynamicIcon name="eye" size={20} color="#60A5FA" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transaction;
