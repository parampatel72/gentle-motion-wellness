
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import NavBar from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft, Volume, User, Calendar, Heart } from "lucide-react";
import { toast } from "sonner";

// Sample workout data - in a real app, this would come from an API
const getWorkoutById = (id: string) => {
  const workouts = {
    "chair-yoga": {
      title: "Chair Yoga Basics",
      category: "Flexibility",
      duration: "15 minutes",
      difficulty: "easy",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&h=600",
      description: "A gentle yoga practice that can be done while seated. Perfect for improving flexibility and reducing stiffness in the joints.",
      benefits: ["Improves flexibility", "Reduces joint pain", "Enhances circulation", "Reduces stress"],
      instructor: "Sarah Johnson",
      steps: [
        "Start seated with feet flat on the floor, back straight",
        "Roll shoulders backward and forward gently",
        "Stretch arms overhead, feeling the stretch in your sides",
        "Twist upper body to each side while keeping hips stable",
        "Extend one leg at a time, flex and point toes",
        "Practice deep breathing throughout the session"
      ]
    },
    "balance-training": {
      title: "Balance Training",
      category: "Stability",
      duration: "20 minutes",
      difficulty: "medium",
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=800&h=600",
      description: "Improve your stability and prevent falls with these simple balance exercises that can be done with chair support.",
      benefits: ["Improves stability", "Prevents falls", "Strengthens leg muscles", "Boosts confidence"],
      instructor: "Robert Chen",
      steps: [
        "Start with feet hip-width apart, holding onto a sturdy chair",
        "Practice weight shifts from one foot to another",
        "Try standing on one leg for 10-30 seconds, then switch",
        "Walk heel to toe in a straight line",
        "Practice sitting and standing without using hands",
        "Try gentle leg raises to strengthen supporting muscles"
      ]
    },
    "gentle-stretching": {
      title: "Gentle Morning Stretches",
      category: "Flexibility",
      duration: "10 minutes",
      difficulty: "easy",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&h=600",
      description: "Start your day with gentle stretches to reduce stiffness and increase energy levels.",
      benefits: ["Reduces morning stiffness", "Improves circulation", "Boosts energy", "Enhances mood"],
      instructor: "Maria Garcia",
      steps: [
        "Begin with gentle neck rotations",
        "Roll shoulders forward and backward",
        "Gently stretch arms overhead and to sides",
        "Perform seated spinal twists",
        "Stretch calves and ankles while seated",
        "End with deep breathing exercises"
      ]
    },
    "mindful-walking": {
      title: "Mindful Walking",
      category: "Cardio",
      duration: "25 minutes",
      difficulty: "medium",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&h=600",
      description: "Combine gentle cardio with mindfulness for a refreshing and rejuvenating experience.",
      benefits: ["Improves cardiovascular health", "Reduces stress", "Enhances mindfulness", "Boosts mood"],
      instructor: "David Wilson",
      steps: [
        "Begin with 5 minutes of gentle warm-up walking",
        "Focus on your breathing as you walk",
        "Notice the sensation of your feet touching the ground",
        "Observe your surroundings without judgment",
        "Gradually increase pace for 10 minutes, then slow down",
        "End with 5 minutes of cool-down walking"
      ]
    }
  };

  return workouts[id as keyof typeof workouts];
};

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const workoutData = getWorkoutById(id);
      if (workoutData) {
        setWorkout(workoutData);
      }
      setLoading(false);
    }
  }, [id]);

  const handleStartWorkout = () => {
    toast.success("Workout started! Take it at your own pace.");
  };

  const handleVoiceGuidance = () => {
    toast.info("Voice guidance enabled");
  };

  if (loading) {
    return (
      <PageContainer>
        <p className="text-center py-10">Loading workout details...</p>
      </PageContainer>
    );
  }

  if (!workout) {
    return (
      <PageContainer>
        <div className="text-center py-10">
          <p className="text-lg mb-4">Workout not found</p>
          <Button onClick={() => navigate("/workouts")}>
            Back to Workouts
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      <PageContainer className="pb-32">
        {/* Header */}
        <Button
          variant="ghost"
          className="mb-4 -ml-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2" size={20} /> Back
        </Button>

        {/* Workout Image */}
        <div className="relative rounded-2xl overflow-hidden h-56 mb-6">
          <img
            src={workout.image}
            alt={workout.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-4 text-white">
              <div className="text-sm font-medium mb-1">{workout.category}</div>
              <h1 className="text-2xl font-bold">{workout.title}</h1>
            </div>
          </div>
        </div>

        {/* Workout Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gentle-teal-light p-3 rounded-xl flex items-center gap-2">
            <Clock size={18} />
            <span>{workout.duration}</span>
          </div>
          <div className="bg-gentle-lavender-light p-3 rounded-xl flex items-center gap-2">
            <User size={18} />
            <span>{workout.instructor}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto"
            onClick={handleVoiceGuidance}
          >
            <Volume size={18} />
          </Button>
        </div>

        {/* Description */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">About this workout</h2>
          <p className="text-muted-foreground">{workout.description}</p>
        </section>

        {/* Benefits */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Benefits</h2>
          <div className="grid grid-cols-2 gap-3">
            {workout.benefits.map((benefit: string, index: number) => (
              <div
                key={index}
                className="bg-gentle-blue-light p-3 rounded-xl text-center"
              >
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Instructions</h2>
          <ol className="space-y-4">
            {workout.steps.map((step: string, index: number) => (
              <li key={index} className="flex gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center">
                  {index + 1}
                </div>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Start Button */}
        <div className="fixed bottom-20 left-4 right-4 max-w-lg mx-auto">
          <Button
            className="w-full py-6 rounded-xl text-lg shadow-lg"
            onClick={handleStartWorkout}
          >
            Start Workout
          </Button>
        </div>
      </PageContainer>

      <NavBar />
    </>
  );
};

export default WorkoutDetail;
