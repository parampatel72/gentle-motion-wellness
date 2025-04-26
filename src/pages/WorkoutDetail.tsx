import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageContainer from "@/components/layout/PageContainer";
import NavBar from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft, Volume, User, Heart } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { fetchWorkoutById, markWorkoutAsCompleted } from "@/lib/api/workouts";

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: workout, isLoading } = useQuery({
    queryKey: ['workout', id],
    queryFn: () => fetchWorkoutById(id!),
    enabled: !!id
  });

  const handleStartWorkout = async () => {
    if (!workout || !user) return;

    try {
      await markWorkoutAsCompleted(workout.id, user.id);
      toast.success("Workout completed! Great job!");
    } catch (error) {
      toast.error("Failed to mark workout as completed");
    }
  };

  const handleVoiceGuidance = () => {
    toast.info("Voice guidance enabled");
  };

  if (isLoading) {
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
            src={workout.image_url}
            alt={workout.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-4 text-white">
              <div className="text-sm font-medium mb-1">{workout.category.name}</div>
              <h1 className="text-2xl font-bold">{workout.title}</h1>
            </div>
          </div>
        </div>

        {/* Workout Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gentle-teal-light p-3 rounded-xl flex items-center gap-2">
            <Clock size={18} />
            <span>{workout.duration} minutes</span>
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
            {workout.benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gentle-blue-light p-3 rounded-xl text-center"
              >
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Instructions */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Instructions</h2>
          <ol className="space-y-4">
            {workout.instructions.map((step, index) => (
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
