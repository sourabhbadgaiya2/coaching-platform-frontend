"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { startTest, submitTest } from "@/actions/tests.actions";
import { useRouter } from "next/navigation";

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  text: string;
  marks: number;
  options: Option[];
}

interface Test {
  id: number;
  title: string;
  duration_minutes: number;
  questions: Question[];
}

export function TestAttemptClient({ test }: { test: Test }) {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    startTransition(async () => {
      await startTest(test.id);
      setStarted(true);
    });
  };

  const selectOption = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    const answerList = Object.entries(answers).map(
      ([question_id, selected_option_id]) => ({
        question_id: Number(question_id),
        selected_option_id,
      }),
    );

    if (answerList.length < test.questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    startTransition(async () => {
      const result = await submitTest(test.id, answerList);
      if (result.error) {
        setError(result.error);
      } else {
        router.refresh();
      }
    });
  };

  if (!started) {
    return (
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>{test.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {test.questions.length} questions • {test.duration_minutes}{" "}
              minutes
            </p>
            <Button
              onClick={handleStart}
              disabled={isPending}
              className="w-full"
            >
              {isPending ? "Starting..." : "Start Test"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 pb-24">
      <h1 className="text-lg font-bold">{test.title}</h1>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {test.questions.map((q, index) => (
        <Card key={q.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">
              {index + 1}. {q.text}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {q.options.map((opt) => (
              <label
                key={opt.id}
                className={`flex items-center gap-2 p-2 border rounded-lg text-sm cursor-pointer ${
                  answers[q.id] === opt.id ? "border-primary bg-primary/5" : ""
                }`}
              >
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  checked={answers[q.id] === opt.id}
                  onChange={() => selectOption(q.id, opt.id)}
                />
                {opt.text}
              </label>
            ))}
          </CardContent>
        </Card>
      ))}

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-background border-t">
        <Button onClick={handleSubmit} disabled={isPending} className="w-full">
          {isPending ? "Submitting..." : "Submit Test"}
        </Button>
      </div>
    </div>
  );
}
