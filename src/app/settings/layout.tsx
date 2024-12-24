import { SettingsLayout as SettingsSidebar } from "@/components/settings-layout"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <SettingsSidebar>{children}</SettingsSidebar>
}

