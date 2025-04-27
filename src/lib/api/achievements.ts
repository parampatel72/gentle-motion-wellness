
import { supabase } from "@/integrations/supabase/client";

export async function fetchLeaderboard() {
  const { data: leaderboard, error } = await supabase
    .from('user_achievements')
    .select(`
      *,
      profiles:profiles(first_name, last_name)
    `)
    .order('points', { ascending: false })
    .limit(10);

  if (error) throw error;
  return leaderboard;
}

export async function updateUserAchievements(workoutId: string) {
  const { error: achievementError } = await supabase
    .from('user_achievements')
    .upsert({
      user_id: (await supabase.auth.getUser()).data.user?.id,
      workouts_completed: 1,
      points: 10,
      last_workout_date: new Date().toISOString(),
    }, {
      onConflict: 'user_id',
      count: 'exact'
    });

  if (achievementError) throw achievementError;
}
