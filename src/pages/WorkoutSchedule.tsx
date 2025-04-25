
import { useState } from "react";
import { format, addDays, startOfWeek } from "date-fns";
import PageContainer from "@/components/layout/PageContainer";
import NavBar from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock, Plus } from "lucide-react";

interface ScheduledWorkout {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: string;
  date: Date;
}

const WORKOUT_TYPES = [
  { value: "chair-yoga", label: "Chair Yoga" },
  { value: "gentle-stretching", label: "Gentle Stretching" },
  { value: "balance", label: "Balance Training" },
  { value: "walking", label: "Walking" },
  { value: "water-exercise", label: "Water Exercise" },
  { value: "tai-chi", label: "Tai Chi" },
];

const WorkoutSchedule = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(new Date());
  const [scheduledWorkouts, setScheduledWorkouts] = useState<ScheduledWorkout[]>([
    {
      id: "1",
      title: "Morning Stretch",
      time: "09:00 AM",
      duration: "20 minutes",
      type: "gentle-stretching",
      date: new Date(),
    },
    {
      id: "2",
      title: "Balance Practice",
      time: "03:00 PM",
      duration: "15 minutes",
      type: "balance",
      date: addDays(new Date(), 1),
    },
  ]);

  const [newWorkout, setNewWorkout] = useState({
    title: "",
    time: "",
    duration: "15",
    type: "chair-yoga",
  });

  const handleAddWorkout = () => {
    if (!scheduleDate || !newWorkout.title || !newWorkout.time) return;
    
    const workout: ScheduledWorkout = {
      id: Date.now().toString(),
      title: newWorkout.title,
      time: newWorkout.time,
      duration: `${newWorkout.duration} minutes`,
      type: newWorkout.type,
      date: scheduleDate,
    };
    
    setScheduledWorkouts([...scheduledWorkouts, workout]);
    
    // Reset form
    setNewWorkout({
      title: "",
      time: "",
      duration: "15",
      type: "chair-yoga",
    });
  };

  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));

  const getWorkoutsForDate = (date: Date) => {
    return scheduledWorkouts.filter(
      (workout) => format(workout.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  const getWorkoutTypeLabel = (typeValue: string) => {
    return WORKOUT_TYPES.find((type) => type.value === typeValue)?.label || typeValue;
  };

  return (
    <>
      <PageContainer>
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">My Schedule</h1>
          <p className="text-muted-foreground">
            Plan and manage your workout sessions
          </p>
        </header>

        <div className="mb-6 md:hidden">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            className="rounded-md border p-3"
          />
        </div>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-medium">
            {format(date, "MMMM yyyy")}
          </h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={18} /> Schedule Workout
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Schedule a Workout</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="workout-date">Date</Label>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="text-muted-foreground" size={18} />
                    <div className="text-sm">
                      {scheduleDate ? format(scheduleDate, "EEEE, MMMM d, yyyy") : "Choose date"}
                    </div>
                  </div>
                  <Calendar
                    mode="single"
                    selected={scheduleDate}
                    onSelect={setScheduleDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border p-3 pointer-events-auto"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="workout-type">Workout Type</Label>
                  <Select 
                    value={newWorkout.type}
                    onValueChange={(value) => setNewWorkout({...newWorkout, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a workout type" />
                    </SelectTrigger>
                    <SelectContent>
                      {WORKOUT_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="workout-title">Title</Label>
                  <Input
                    id="workout-title"
                    value={newWorkout.title}
                    onChange={(e) => setNewWorkout({...newWorkout, title: e.target.value})}
                    placeholder="e.g., Morning Stretch"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="workout-time">Time</Label>
                  <Input
                    id="workout-time"
                    type="time"
                    value={newWorkout.time}
                    onChange={(e) => setNewWorkout({...newWorkout, time: e.target.value})}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="workout-duration">Duration (minutes)</Label>
                  <Select 
                    value={newWorkout.duration}
                    onValueChange={(value) => setNewWorkout({...newWorkout, duration: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="20">20 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleAddWorkout}>Schedule</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weekDays.map((day) => (
              <Card 
                key={day.toString()} 
                className={`p-3 ${
                  format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
                    ? "border-primary"
                    : ""
                }`}
              >
                <div className="text-center mb-2">
                  <p className="text-muted-foreground text-sm">
                    {format(day, "EEE")}
                  </p>
                  <p className="text-xl font-semibold">{format(day, "d")}</p>
                </div>

                <div className="space-y-2">
                  {getWorkoutsForDate(day).map((workout) => (
                    <div
                      key={workout.id}
                      className="text-xs bg-gentle-peach-light text-gentle-peach p-2 rounded-lg"
                    >
                      <p className="font-medium">{workout.title}</p>
                      <div className="flex items-center mt-1">
                        <Clock size={10} className="mr-1" />
                        <span>{workout.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Upcoming Workouts</h3>
            <div className="space-y-3">
              {scheduledWorkouts
                .filter((workout) => workout.date >= today)
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 5)
                .map((workout) => (
                  <Card key={workout.id} className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{workout.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {getWorkoutTypeLabel(workout.type)} • {workout.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{format(workout.date, "EEE, MMM d")}</p>
                      <p className="text-sm text-muted-foreground">{workout.time}</p>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </PageContainer>

      <NavBar />
    </>
  );
};

export default WorkoutSchedule;
