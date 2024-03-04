import StoreProvider from "@/lib/StoreProvider";

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StoreProvider>{children}</StoreProvider>;
}
