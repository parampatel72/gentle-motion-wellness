
import { useEffect, useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import ProgressRing from "@/components/ui/ProgressRing";
import ActivityCard from "@/components/ui/ActivityCard";
import QuoteCard from "@/components/ui/QuoteCard";
import NavBar from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Plus, User } from "lucide-react";

interface Quote {
  text: string;
  author: string;
}

const Dashboard = () => {
  const [user, setUser] = useState({ name: "Friend" });
  const [quote, setQuote] = useState<Quote>({
    text: "Movement is a medicine for creating change in a person's physical, emotional, and mental states.",
    author: "Carol Welch"
  });

  // Simulated activities progress
  const dailyProgress = 65;
  const weeklyWorkouts = 3;
  const totalWorkouts = 12;

  useEffect(() => {
    // Get user data from local storage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <>
      <PageContainer>
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-semibold">
            Good Morning, <span className="text-primary">{user.name}</span>
          </h1>
          <p className="text-muted-foreground">Let's work on your wellness today</p>
        </header>

        {/* Progress Section */}
        <section className="mb-10">
          <h2 className="text-xl mb-4">Today's Progress</h2>
          <div className="gentle-card flex items-center justify-between">
            <div className="flex flex-col items-center">
              <ProgressRing
                progress={dailyProgress}
                size={110}
                color="#8ECFD7"
                bgColor="#E2F6FA"
                label="Daily Goal"
              />
              <span className="mt-2 text-muted-foreground text-sm">Daily Goal</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center bg-gentle-blue-light p-3 rounded-xl">
                <span className="block text-2xl font-bold">{weeklyWorkouts}</span>
                <span className="text-sm text-muted-foreground">This Week</span>
              </div>
              <div className="text-center bg-gentle-lavender-light p-3 rounded-xl">
                <span className="block text-2xl font-bold">{totalWorkouts}</span>
                <span className="text-sm text-muted-foreground">Total</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quote of the day */}
        <section className="mb-10">
          <QuoteCard quote={quote.text} author={quote.author} />
        </section>

        {/* Activities Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Suggested Activities</h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            <ActivityCard
              title="Chair Yoga"
              description="Gentle stretching for better flexibility"
              icon={<User size={24} />}
              color="teal"
            />
            <ActivityCard
              title="Walking Meditation"
              description="Mindful movement for stress reduction"
              icon={<Heart size={24} />}
              color="lavender"
            />
            <ActivityCard
              title="Balance Exercise"
              description="Improve stability and prevent falls"
              icon={<Calendar size={24} />}
              color="peach"
            />
          </div>
        </section>

        {/* Quick Actions */}
        <Button className="w-full py-6 rounded-xl mt-4 btn-icon-text">
          <Plus size={20} /> Start a New Activity
        </Button>
      </PageContainer>
      
      <NavBar />
    </>
  );
};

export default Dashboard;
