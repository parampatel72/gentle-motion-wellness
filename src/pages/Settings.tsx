import { useState, useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import PageContainer from "@/components/layout/PageContainer";
import NavBar from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Bell,
  Volume,
  Moon,
  Type,
  Eye,
  ChevronRight,
  User,
  LogOut,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Settings = () => {
  const { theme, contrast, toggleTheme, toggleContrast } = useTheme();
  const [fontSizeLevel, setFontSizeLevel] = useState(2);
  const [darkMode, setDarkMode] = useState(theme === "dark");
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [highContrast, setHighContrast] = useState(contrast === "high");

  const handleFontSizeChange = (value: number[]) => {
    setFontSizeLevel(value[0]);
    const sizes = ["Small", "Medium", "Large", "Extra Large", "Huge"];
    toast.success(`Font size set to ${sizes[value[0] - 1]}`);
  };

  const handleDarkModeToggle = () => {
    toggleTheme();
    toast.success(theme === "dark" ? "Light mode enabled" : "Dark mode enabled");
  };

  const handleVoiceGuidanceToggle = () => {
    setVoiceGuidance(!voiceGuidance);
    toast.success(
      voiceGuidance ? "Voice guidance disabled" : "Voice guidance enabled"
    );
  };

  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
    toast.success(
      notifications ? "Notifications disabled" : "Notifications enabled"
    );
  };

  const handleHighContrastToggle = () => {
    toggleContrast();
    toast.success(
      contrast === "high" ? "High contrast mode disabled" : "High contrast mode enabled"
    );
  };

  return (
    <>
      <PageContainer>
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground">Customize your experience</p>
        </header>

        <section className="mb-8">
          <h2 className="text-lg font-medium mb-3">Account</h2>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-6 rounded-xl"
            >
              <User className="mr-3" size={20} />
              <span className="flex-1 text-left">Profile Information</span>
              <ChevronRight size={18} />
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-6 rounded-xl"
            >
              <Bell className="mr-3" size={20} />
              <span className="flex-1 text-left">Notification Preferences</span>
              <ChevronRight size={18} />
            </Button>
          </div>
        </section>

        <Separator className="my-4" />

        <section className="mb-8">
          <h2 className="text-lg font-medium mb-3">Accessibility</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-base">Text Size</label>
              <div className="flex items-center gap-3 mb-2">
                <Type size={18} className="text-muted-foreground" />
                <Slider
                  value={[fontSizeLevel]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={handleFontSizeChange}
                  className="flex-1"
                />
                <Type size={24} className="text-muted-foreground" />
              </div>
              <div className="text-xs text-muted-foreground">
                {["Small", "Medium", "Large", "Extra Large", "Huge"][
                  fontSizeLevel - 1
                ]}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye size={20} />
                <div>
                  <div>High Contrast</div>
                  <div className="text-sm text-muted-foreground">
                    Improve text visibility
                  </div>
                </div>
              </div>
              <Switch
                checked={contrast === "high"}
                onCheckedChange={handleHighContrastToggle}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon size={20} />
                <div>
                  <div>Dark Mode</div>
                  <div className="text-sm text-muted-foreground">
                    Easier on the eyes
                  </div>
                </div>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume size={20} />
                <div>
                  <div>Voice Guidance</div>
                  <div className="text-sm text-muted-foreground">
                    Audio instructions
                  </div>
                </div>
              </div>
              <Switch
                checked={voiceGuidance}
                onCheckedChange={handleVoiceGuidanceToggle}
              />
            </div>
          </div>
        </section>

        <Separator className="my-4" />

        <section className="mb-8">
          <h2 className="text-lg font-medium mb-3">Notifications</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={20} />
              <div>
                <div>Enable Reminders</div>
                <div className="text-sm text-muted-foreground">
                  Daily activity reminders
                </div>
              </div>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={handleNotificationsToggle}
            />
          </div>
        </section>

        <Separator className="my-4" />

        <section className="mb-8">
          <h2 className="text-lg font-medium mb-3">Help & About</h2>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-6 rounded-xl"
            >
              <span className="flex-1 text-left">Contact Support</span>
              <ChevronRight size={18} />
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-6 rounded-xl"
            >
              <span className="flex-1 text-left">Privacy Policy</span>
              <ChevronRight size={18} />
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-6 rounded-xl"
            >
              <span className="flex-1 text-left">Terms of Service</span>
              <ChevronRight size={18} />
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-6 rounded-xl"
            >
              <span className="flex-1 text-left">About Gentle Motion</span>
              <ChevronRight size={18} />
            </Button>
          </div>
        </section>

        <Button variant="outline" className="w-full py-6 rounded-xl btn-icon-text text-destructive">
          <LogOut size={20} /> Sign Out
        </Button>
      </PageContainer>

      <NavBar />
    </>
  );
};

export default Settings;
