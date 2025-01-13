import { MovieStats } from "@/app/(dashboard)/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartDistributionProps {
  movieStats: MovieStats[];
}

function ChartDistribution({ movieStats }: ChartDistributionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cast Distribution</CardTitle>
        <CardDescription>Number of cast members per movie</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={movieStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="castCount" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default ChartDistribution;
