import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface Result {
  test: string;
  score: number;
  submitted_at: string;
}

export function ResultView({ result }: { result: Result }) {
  return (
    <div className="p-4">
      <Card>
        <CardHeader className="text-center">
          <CheckCircle2 className="size-12 text-primary mx-auto mb-2" />
          <CardTitle>{result.test}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-2">
          <p className="text-3xl font-bold">{result.score}</p>
          <p className="text-sm text-muted-foreground">
            Submitted on {new Date(result.submitted_at).toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
