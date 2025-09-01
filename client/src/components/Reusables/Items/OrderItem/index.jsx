import React from "react";
import { Link } from "react-router-dom";

const statusStyles = {
  delivered: "bg-green-100 text-green-700 ring-1 ring-green-200",
  shipped: "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
  processing: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
  cancelled: "bg-red-100 text-red-700 ring-1 ring-red-200",
};

export default function OrderItem({
  orderId = "ORD-984512",
  date = "2025-08-14",
  image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FV1_FMT_WHH?wid=752&hei=636&fmt=jpeg&qlt=90&.v=WTk1dTl5UTBnZXdKN2tua2pFb1hvQ3hmVXd6RnorM2pzUlRIKzNkUEN0UjUvWUFQTXRnUEZqWWRRU2d1WFJwZlcrN05qS3VEVG0zVXZGNUlPVjFnM0RNZGEwYVUyTzcvZlg1UkxwTzJQS1U4K1JOcE5YME4zSHVzMkxMK0ZjVTI",
  title = "Apple AirPods Pro (2nd Gen)",
  variant = "White • Case USB-C",
  qty = 1,
  price = 18990,
  mrp,
  status = "shipped", // delivered | shipped | processing | cancelled
  onTrack = () => {},
  onInvoice = () => {},
  onReorder = () => {},
}) {
  const priceIntl = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });
  const badge = statusStyles[status] ?? statusStyles.processing;

  return (
    <Link to={"/product/airpods"}
      className="w-full bg-white shadow-sm ring-1 ring-gray-200/70 overflow-hidden"
      aria-labelledby={`order-${orderId}`}
    >
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className={`px-2.5 py-1 text-xs font-medium rounded-full ${badge} capitalize`}>
            {status}
          </div>
          <p className="text-xs text-gray-500">
            Ordered on <time dateTime={date}>{date}</time>
          </p>
        </div>
        <p className="text-xs font-medium text-gray-600">Order ID: <span className="font-semibold">{orderId}</span></p>
      </header>

      {/* Body */}
      <div className="p-4">
        <div className="flex gap-4">
          {/* Image */}
          <div className="shrink-0">
            <img
              src={image}
              alt={title}
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-xl object-cover ring-1 ring-gray-200"
              loading="lazy"
            />
          </div>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <h3 id={`order-${orderId}`} className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2">
              {title}
            </h3>
            {variant && (
              <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">{variant}</p>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <p className="text-gray-600">Qty: <span className="font-medium">{qty}</span></p>

              <div className="flex items-baseline gap-2">
                {mrp && (
                  <span className="text-gray-400 line-through text-xs sm:text-sm">
                    {priceIntl.format(mrp)}
                  </span>
                )}
                <span className="text-primary font-semibold">
                  {priceIntl.format(price)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to={"/track"}
            // onClick={onTrack}
            className="px-3 py-2 text-sm rounded-xl ring-1 ring-gray-300 hover:bg-gray-50 transition"
          >
            Track Package
          </Link>
          <button
            onClick={onInvoice}
            className="px-3 py-2 text-sm rounded-xl ring-1 ring-gray-300 hover:bg-gray-50 transition"
          >
            Download Invoice
          </button>
          <button
            onClick={onReorder}
            className="px-3 py-2 text-sm rounded-xl bg-primary text-white hover:bg-black transition"
          >
            Reorder
          </button>
        </div>
      </div>
    </Link>
  );
}
