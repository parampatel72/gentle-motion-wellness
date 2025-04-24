
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import WorkoutCard from "@/components/ui/WorkoutCard";
import NavBar from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Sample workout data
const workoutsData = [
  {
    id: "chair-yoga",
    title: "Chair Yoga Basics",
    category: "Flexibility",
    duration: "15 minutes",
    difficulty: "easy" as const,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&h=600",
  },
  {
    id: "balance-training",
    title: "Balance Training",
    category: "Stability",
    duration: "20 minutes",
    difficulty: "medium" as const,
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=800&h=600",
  },
  {
    id: "gentle-stretching",
    title: "Gentle Morning Stretches",
    category: "Flexibility",
    duration: "10 minutes",
    difficulty: "easy" as const,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&h=600",
  },
  {
    id: "mindful-walking",
    title: "Mindful Walking",
    category: "Cardio",
    duration: "25 minutes",
    difficulty: "medium" as const,
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&h=600",
  },
];

const categories = [
  "All",
  "Flexibility",
  "Stability",
  "Strength",
  "Cardio",
  "Relaxation",
];

const Workouts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredWorkouts = workoutsData.filter((workout) => {
    const matchesSearch = workout.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || workout.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <PageContainer>
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Workouts</h1>
          <p className="text-muted-foreground">Find activities suited for you</p>
        </header>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search workouts..."
            className="pl-10 py-6 rounded-xl text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="mb-6 overflow-x-auto scrollbar-none">
          <div className="flex gap-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className="rounded-full text-base whitespace-nowrap px-4"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Workouts Grid */}
        {filteredWorkouts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} {...workout} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">
              No workouts found. Try a different search.
            </p>
          </div>
        )}
      </PageContainer>

      <NavBar />
    </>
  );
};

export default Workouts;
