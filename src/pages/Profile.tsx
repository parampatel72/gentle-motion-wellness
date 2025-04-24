
import { useState, useEffect } from "react";
import PageContainer from "@/components/layout/PageContainer";
import NavBar from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Award, Calendar, ArrowRight, Edit } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Jane Smith",
    age: "68",
    goals: ["joint-mobility", "balance", "cardio"],
    joined: "February 2025",
    streak: 12,
    totalWorkouts: 24,
    achievements: [
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
    ],
  });

  useEffect(() => {
    // Get user data from local storage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUser((prevUser) => ({
        ...prevUser,
        name: parsedData.name || prevUser.name,
        age: parsedData.age || prevUser.age,
        goals: parsedData.goals || prevUser.goals,
      }));
    }
  }, []);

  const goalLabels: Record<string, string> = {
    "joint-mobility": "Joint Mobility",
    balance: "Balance & Stability",
    strength: "Gentle Strength",
    cardio: "Heart Health",
  };

  return (
    <>
      <PageContainer>
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">My Profile</h1>
            <p className="text-muted-foreground">View your progress and achievements</p>
          </div>
          <Button variant="ghost" size="icon">
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
              <h2 className="text-xl font-medium">{user.name}</h2>
              <p className="text-muted-foreground">Age {user.age} • Joined {user.joined}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">My Goals</h3>
            <div className="flex flex-wrap gap-2">
              {user.goals.map((goal) => (
                <span
                  key={goal}
                  className="bg-gentle-teal-light text-gentle-teal px-3 py-1 rounded-full text-sm"
                >
                  {goalLabels[goal]}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gentle-blue-light p-4 rounded-xl text-center">
              <div className="text-2xl font-bold">{user.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="bg-gentle-peach-light p-4 rounded-xl text-center">
              <div className="text-2xl font-bold">{user.totalWorkouts}</div>
              <div className="text-sm text-muted-foreground">Total Workouts</div>
            </div>
          </div>
        </Card>

        {/* Activity History */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Activity History</h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80 btn-icon-text">
              View All <ArrowRight size={16} />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-border rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-gentle-teal-light p-2 rounded-lg">
                  <Calendar size={20} className="text-gentle-teal" />
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
                  <Calendar size={20} className="text-gentle-lavender" />
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
                  <Calendar size={20} className="text-gentle-peach" />
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
            {user.achievements.map((achievement, index) => (
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
