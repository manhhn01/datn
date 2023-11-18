import HeaderSection from "@/app/(public)/(components)/HeaderSection";
import MainLayout from "@/components/containers/layout/MainLayout";

export interface PublicLayoutProps {
  children: React.ReactNode;
}
export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
