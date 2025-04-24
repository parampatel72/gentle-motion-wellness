
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, ChevronRight, Heart, User } from "lucide-react";
import { toast } from "sonner";
import PageContainer from "@/components/layout/PageContainer";

const OnboardingSteps = [
  {
    title: "Welcome to Gentle Motion",
    description: "Your personal wellness companion for healthy aging",
  },
  {
    title: "Let's get to know you",
    description: "Help us personalize your experience",
  },
  {
    title: "Choose your wellness goals",
    description: "What would you like to focus on?",
  },
  {
    title: "Almost there!",
    description: "Set your preferences for a tailored experience",
  },
];

const fitnessGoals = [
  {
    id: "joint-mobility",
    label: "Joint Mobility",
    description: "Improve range of motion and flexibility",
  },
  {
    id: "balance",
    label: "Balance & Stability",
    description: "Enhance balance and prevent falls",
  },
  {
    id: "strength",
    label: "Gentle Strength",
    description: "Build functional strength for daily activities",
  },
  {
    id: "cardio",
    label: "Heart Health",
    description: "Improve cardiovascular health",
  },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < OnboardingSteps.length - 1) {
      if (step === 1 && (!name || !age)) {
        toast.error("Please fill in all fields");
        return;
      }
      if (step === 2 && selectedGoals.length === 0) {
        toast.error("Please select at least one goal");
        return;
      }
      setStep(step + 1);
    } else {
      // Complete onboarding and navigate to dashboard
      localStorage.setItem("onboarded", "true");
      localStorage.setItem("user", JSON.stringify({ name, age, goals: selectedGoals }));
      navigate("/dashboard");
    }
  };

  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter((id) => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center">
            <div className="bg-gentle-teal-light rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Heart size={48} className="text-gentle-teal" />
            </div>
            <h1 className="text-3xl font-bold mb-3">Welcome to Gentle Motion</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your personal wellness companion designed specifically for healthy aging
            </p>
            <Button onClick={handleNext} className="w-full text-lg py-6 rounded-xl btn-icon-text">
              Get Started <ChevronRight size={20} />
            </Button>
          </div>
        );
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Tell us about yourself</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="h-14 text-lg rounded-xl"
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-lg mb-2">
                  Your Age
                </label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  className="h-14 text-lg rounded-xl"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Select your wellness goals</h2>
            <p className="text-muted-foreground mb-4">Choose all that apply to you</p>
            <div className="space-y-3">
              {fitnessGoals.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedGoals.includes(goal.id)
                      ? "border-primary bg-primary/10"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        selectedGoals.includes(goal.id)
                          ? "bg-primary text-white"
                          : "border border-muted-foreground"
                      }`}
                    >
                      {selectedGoals.includes(goal.id) && <Check size={14} />}
                    </div>
                    <div>
                      <h3 className="font-medium">{goal.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {goal.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <div className="bg-gentle-lavender-light rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <User size={48} className="text-gentle-lavender" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">You're all set!</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We've created a personalized experience based on your preferences.
              Let's start your wellness journey!
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer withNavBar={false} className="flex flex-col justify-center">
      <Card className="p-6 shadow-gentle">
        <div className="mb-8 flex justify-center">
          <div className="flex gap-2">
            {OnboardingSteps.map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  i === step ? "bg-primary" : i < step ? "bg-primary/50" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="mb-8">{renderStepContent()}</div>
        {step > 0 && (
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 py-6 rounded-xl"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
            <Button className="flex-1 py-6 rounded-xl btn-icon-text" onClick={handleNext}>
              {step === OnboardingSteps.length - 1 ? "Get Started" : "Continue"}
              <ChevronRight size={20} />
            </Button>
          </div>
        )}
      </Card>
    </PageContainer>
  );
};

export default Onboarding;
