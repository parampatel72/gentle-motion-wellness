
import { useQuery } from "@tanstack/react-query";
import { fetchLeaderboard } from "@/lib/api/achievements";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Award } from "lucide-react";

const Leaderboard = () => {
  const { data: leaderboard = [], isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard,
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading leaderboard...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Award className="text-primary" />
        <h2 className="text-xl font-semibold">Leaderboard</h2>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Points</TableHead>
            <TableHead className="text-right">Workouts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.map((entry: any, index: number) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                {entry.profiles?.first_name || 'Anonymous'} {entry.profiles?.last_name || ''}
              </TableCell>
              <TableCell className="text-right">{entry.points}</TableCell>
              <TableCell className="text-right">{entry.workouts_completed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leaderboard;
