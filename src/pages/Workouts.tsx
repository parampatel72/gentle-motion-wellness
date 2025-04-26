
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageContainer from "@/components/layout/PageContainer";
import WorkoutCard from "@/components/ui/WorkoutCard";
import NavBar from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { fetchWorkouts } from "@/lib/api/workouts";

const Workouts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: workouts = [], isLoading } = useQuery({
    queryKey: ['workouts'],
    queryFn: fetchWorkouts,
  });

  const categories = ["All", ...new Set(workouts.map(workout => workout.category.name))];

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch = workout.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || workout.category.name === activeCategory;
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
        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">Loading workouts...</p>
          </div>
        ) : filteredWorkouts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                id={workout.id}
                title={workout.title}
                category={workout.category.name}
                duration={`${workout.duration} minutes`}
                difficulty={workout.difficulty}
                image={workout.image_url}
              />
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
