
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Accessibility } from "lucide-react";

interface AccessibilityToolsProps {
  className?: string;
}

const AccessibilityTools = ({ className }: AccessibilityToolsProps) => {
  const [fontSize, setFontSize] = useState<number>(100);
  const [contrast, setContrast] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [voiceAssistant, setVoiceAssistant] = useState<boolean>(false);
  const [textToSpeech, setTextToSpeech] = useState<boolean>(false);
  
  // Apply accessibility settings
  const applySettings = () => {
    // Font size
    document.documentElement.style.fontSize = `${fontSize}%`;
    
    // High contrast
    if (contrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    // Store preferences in localStorage
    localStorage.setItem('accessibilitySettings', JSON.stringify({
      fontSize,
      contrast,
      reducedMotion,
      voiceAssistant,
      textToSpeech
    }));
  };
  
  // Load settings on component mount
  React.useEffect(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setFontSize(settings.fontSize || 100);
      setContrast(settings.contrast || false);
      setReducedMotion(settings.reducedMotion || false);
      setVoiceAssistant(settings.voiceAssistant || false);
      setTextToSpeech(settings.textToSpeech || false);
      
      // Apply saved settings
      document.documentElement.style.fontSize = `${settings.fontSize}%`;
      if (settings.contrast) {
        document.body.classList.add('high-contrast');
      }
    }
  }, []);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={className}
          aria-label="Accessibility Options"
        >
          <Accessibility size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Accessibility Settings</DrawerTitle>
            <DrawerDescription>
              Adjust these settings to improve your experience.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="font-size">Text Size ({fontSize}%)</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setFontSize(100)}
                  >
                    Reset
                  </Button>
                </div>
                <Slider
                  id="font-size"
                  min={75}
                  max={200}
                  step={5}
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="high-contrast"
                  checked={contrast}
                  onCheckedChange={setContrast}
                />
                <Label htmlFor="high-contrast">High Contrast Mode</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="reduced-motion"
                  checked={reducedMotion}
                  onCheckedChange={setReducedMotion}
                />
                <Label htmlFor="reduced-motion">Reduced Motion</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="voice-assistant"
                  checked={voiceAssistant}
                  onCheckedChange={setVoiceAssistant}
                />
                <Label htmlFor="voice-assistant">Voice Assistant</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="text-to-speech"
                  checked={textToSpeech}
                  onCheckedChange={setTextToSpeech}
                />
                <Label htmlFor="text-to-speech">Text to Speech</Label>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={applySettings}>Apply Settings</Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AccessibilityTools;
