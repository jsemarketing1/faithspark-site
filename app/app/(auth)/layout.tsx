import DarkNav from "@/components/DarkNav";
import AppProviders from "@/app/app/providers";

// Login/signup need the site nav and Firebase auth context, but NOT the
// authenticated sidebar shell or RequireAuth — that would redirect /app/login
// back to itself for every logged-out visitor, the exact audience trying to
// reach this page.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <DarkNav />
      {children}
    </AppProviders>
  );
}
