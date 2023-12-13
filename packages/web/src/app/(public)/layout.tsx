import FooterSection from "@/components/FooterSection";
import MainLayout from "@/components/containers/layout/MainLayout";

export interface PublicLayoutProps {
  children: React.ReactNode;
}
export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <MainLayout>
      {children}
      <FooterSection />
    </MainLayout>
  );
}
