import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trackora — Order Tracking Dashboard",
  description:
    "Dark-themed logistics admin dashboard for e-commerce order tracking.",
};

export default function TrackoraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
