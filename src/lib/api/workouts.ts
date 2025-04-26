
import { supabase } from "@/integrations/supabase/client";

export async function fetchWorkouts() {
  const { data: workouts, error } = await supabase
    .from('workouts')
    .select(`
      *,
      category:workout_categories(name)
    `);

  if (error) {
    console.error('Error fetching workouts:', error);
    throw error;
  }

  return workouts;
}

export async function fetchWorkoutById(id: string) {
  const { data: workout, error } = await supabase
    .from('workouts')
    .select(`
      *,
      category:workout_categories(name)
    `)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching workout:', error);
    throw error;
  }

  return workout;
}

export async function markWorkoutAsCompleted(workoutId: string, userId: string) {
  const { error } = await supabase
    .from('user_workouts')
    .insert({
      workout_id: workoutId,
      user_id: userId
    });

  if (error) {
    console.error('Error marking workout as completed:', error);
    throw error;
  }
}
