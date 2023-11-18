import AppBar from "@/components/AppBar";
import { Box } from "@mui/system";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box>
      <AppBar />
      {children}
    </Box>
  );
}
