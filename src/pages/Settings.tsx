
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import PageContainer from "@/components/layout/PageContainer";
import NavBar from "@/components/layout/NavBar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, LogOut, Moon, Save, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// Define types for the profile data
interface ProfileData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  age: number | null;
  created_at?: string;
  updated_at?: string;
}

const profileFormSchema = z.object({
  first_name: z.string().min(2, { message: "First name must be at least 2 characters" }),
  last_name: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  age: z.string().refine((val) => !isNaN(parseInt(val)), { message: "Age must be a number" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const preferencesFormSchema = z.object({
  darkMode: z.boolean().default(false),
  reminders: z.boolean().default(true),
  emails: z.boolean().default(true),
  achievements: z.boolean().default(true),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PreferencesFormValues = z.infer<typeof preferencesFormSchema>;

const Settings = () => {
  const { user, session, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<ProfileData | null>(null);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      age: "",
      email: "",
    },
  });

  const preferencesForm = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      darkMode: false,
      reminders: true,
      emails: true,
      achievements: true,
    },
  });
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Using type assertion to bypass type checking for now
        // since the Supabase types haven't updated yet
        const { data: profile, error } = await (supabase as any)
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        setUserProfile(profile);
        
        // Update form with user data
        profileForm.reset({
          first_name: profile?.first_name || "",
          last_name: profile?.last_name || "",
          age: profile?.age ? profile.age.toString() : "",
          email: user.email || "",
        });
        
        // Fetch preferences from local storage
        const savedPrefs = localStorage.getItem('userPreferences');
        if (savedPrefs) {
          const prefs = JSON.parse(savedPrefs);
          preferencesForm.reset(prefs);
        }
      } catch (error: any) {
        toast.error("Error loading profile: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [user, profileForm, preferencesForm]);

  const onProfileSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Update profile in Supabase using type assertion
      const { error } = await (supabase as any)
        .from('profiles')
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
          age: parseInt(data.age),
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error("Error updating profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const onPreferencesSubmit = async (data: PreferencesFormValues) => {
    try {
      // Save preferences to local storage
      localStorage.setItem('userPreferences', JSON.stringify(data));
      toast.success("Preferences updated successfully");
    } catch (error: any) {
      toast.error("Error saving preferences");
    }
  };
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error("Error signing out");
    }
  };

  if (loading && !userProfile) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      <PageContainer>
        <header className="mb-8">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </header>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="mb-6 grid grid-cols-3 w-full">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User size={16} />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell size={16} />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Moon size={16} />
              <span>Appearance</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={profileForm.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={profileForm.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input placeholder="Your age" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your email" 
                            type="email" 
                            {...field} 
                            disabled
                          />
                        </FormControl>
                        <FormDescription>
                          Contact support to change your email
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Profile
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Form {...preferencesForm}>
              <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-6">
                <FormField
                  control={preferencesForm.control}
                  name="reminders"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Workout Reminders</FormLabel>
                        <FormDescription>
                          Receive notifications for your scheduled workouts
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={preferencesForm.control}
                  name="emails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Email Updates</FormLabel>
                        <FormDescription>
                          Receive email updates about new features and wellness tips
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={preferencesForm.control}
                  name="achievements"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Achievement Notifications</FormLabel>
                        <FormDescription>
                          Get notified when you earn new achievements
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Notifications
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Form {...preferencesForm}>
              <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-6">
                <FormField
                  control={preferencesForm.control}
                  name="darkMode"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Dark Mode</FormLabel>
                        <FormDescription>
                          Enable dark mode for better viewing at night
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Appearance
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-8" />
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Account</h2>
          
          <Button 
            variant="destructive" 
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
      </PageContainer>
      
      <NavBar />
    </>
  );
};

export default Settings;
