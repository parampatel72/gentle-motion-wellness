
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import NavBar from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Award, Calendar, ArrowRight, Edit, Activity, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ProfileData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  age: string | null;
  goals: string[] | null;
  joined: string | null;
  streak: number;
  total_workouts: number;
}

interface Achievement {
  title: string;
  description: string;
  date: string;
}

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>({
    id: "",
    first_name: "",
    last_name: "",
    age: "",
    goals: [],
    joined: "",
    streak: 0,
    total_workouts: 0
  });
  
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      title: "First Steps",
      description: "Completed your first workout",
      date: "Feb 10, 2025",
    },
    {
      title: "Consistency",
      description: "Completed 5 workouts in one week",
      date: "Feb 18, 2025",
    },
    {
      title: "Explorer",
      description: "Tried 3 different workout types",
      date: "Mar 2, 2025",
    },
  ]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch profile data from Supabase
        const { data: profile, error } = await (supabase as any)
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error("Error fetching profile:", error);
          toast({
            title: "Error",
            description: "Could not load profile data. Please try again later.",
            variant: "destructive",
          });
          return;
        }
        
        // Format the joined date nicely
        const joinedDate = user.created_at 
          ? new Date(user.created_at).toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })
          : "Recently";
          
        // Update profile data with fetched information
        setProfileData({
          id: user.id,
          first_name: profile?.first_name || "User",
          last_name: profile?.last_name || "",
          age: profile?.age ? profile.age.toString() : "",
          goals: profile?.goals || ["joint-mobility", "balance", "cardio"],
          joined: joinedDate,
          streak: profile?.streak || 0,
          total_workouts: profile?.total_workouts || 0
        });
      } catch (error: any) {
        console.error("Error in profile fetch:", error);
        toast({
          title: "Error",
          description: "Could not load profile data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [user, toast]);

  const handleEditProfile = () => {
    navigate("/settings");
  };

  const goalLabels: Record<string, string> = {
    "joint-mobility": "Joint Mobility",
    "balance": "Balance & Stability",
    "strength": "Gentle Strength",
    "cardio": "Heart Health",
    "flexibility": "Flexibility",
    "coordination": "Coordination",
    "endurance": "Endurance"
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-lg">Loading profile...</p>
        </div>
      </PageContainer>
    );
  }

  const fullName = `${profileData.first_name} ${profileData.last_name}`.trim();
  const displayName = fullName || "User";

  return (
    <>
      <PageContainer>
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">My Profile</h1>
            <p className="text-muted-foreground">View your progress and achievements</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleEditProfile}
            aria-label="Edit Profile"
          >
            <Edit size={20} />
          </Button>
        </header>

        {/* Profile Card */}
        <Card className="p-6 mb-8 shadow-gentle">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gentle-lavender rounded-full w-16 h-16 flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-medium">{displayName}</h2>
              <p className="text-muted-foreground">
                {profileData.age && `Age ${profileData.age} • `}
                Joined {profileData.joined}
              </p>
            </div>
          </div>
          
          {profileData.goals && profileData.goals.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">My Goals</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.goals.map((goal) => (
                  <span
                    key={goal}
                    className="bg-gentle-teal-light text-gentle-teal px-3 py-1 rounded-full text-sm"
                  >
                    {goalLabels[goal] || goal}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gentle-blue-light p-4 rounded-xl text-center">
              <div className="text-2xl font-bold">{profileData.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="bg-gentle-peach-light p-4 rounded-xl text-center">
              <div className="text-2xl font-bold">{profileData.total_workouts}</div>
              <div className="text-sm text-muted-foreground">Total Workouts</div>
            </div>
          </div>
        </Card>

        {/* Activity History */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Activity History</h2>
            <Button 
              variant="ghost" 
              className="text-primary hover:text-primary/80 btn-icon-text"
              onClick={() => navigate("/workouts")}
            >
              View All <ArrowRight size={16} />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-border rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-gentle-teal-light p-2 rounded-lg">
                  <Activity size={20} className="text-gentle-teal" />
                </div>
                <div>
                  <div className="font-medium">Chair Yoga</div>
                  <div className="text-sm text-muted-foreground">15 minutes • Today</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-gentle-lavender-light p-2 rounded-lg">
                  <Activity size={20} className="text-gentle-lavender" />
                </div>
                <div>
                  <div className="font-medium">Balance Training</div>
                  <div className="text-sm text-muted-foreground">20 minutes • Yesterday</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-gentle-peach-light p-2 rounded-lg">
                  <Clock size={20} className="text-gentle-peach" />
                </div>
                <div>
                  <div className="font-medium">Gentle Stretching</div>
                  <div className="text-sm text-muted-foreground">10 minutes • 2 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-4">
          <h2 className="text-xl font-medium mb-4">Achievements</h2>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 border border-border rounded-xl"
              >
                <div className="bg-gentle-blue-light p-2 rounded-full">
                  <Award size={24} className="text-gentle-blue" />
                </div>
                <div>
                  <div className="font-medium">{achievement.title}</div>
                  <div className="text-sm text-muted-foreground mb-1">{achievement.description}</div>
                  <div className="text-xs text-primary">{achievement.date}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </PageContainer>

      <NavBar />
    </>
  );
};

export default Profile;
