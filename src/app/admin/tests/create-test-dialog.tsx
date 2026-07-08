"use client";

import { useActionState, useEffect, useState } from "react";
import { buttonVariants, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { createTest } from "@/actions/tests.actions";
import { Batch, ActionState } from "@/types";
import { Plus, Trash2 } from "lucide-react";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";

interface OptionDraft {
  text: string;
  is_correct: boolean;
}

interface QuestionDraft {
  text: string;
  marks: number;
  options: OptionDraft[];
}

export function CreateTestDialog({ batches }: { batches: Batch[] }) {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState<QuestionDraft[]>([
    {
      text: "",
      marks: 1,
      options: [
        { text: "", is_correct: true },
        { text: "", is_correct: false },
      ],
    },
  ]);
  const [state, formAction, isPending] = useActionState<
    ActionState | null,
    FormData
  >(createTest, null);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      setQuestions([
        {
          text: "",
          marks: 1,
          options: [
            { text: "", is_correct: true },
            { text: "", is_correct: false },
          ],
        },
      ]);
    }
  }, [state]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        marks: 1,
        options: [
          { text: "", is_correct: true },
          { text: "", is_correct: false },
        ],
      },
    ]);
  };

  const removeQuestion = (qIndex: number) => {
    setQuestions(questions.filter((_, i) => i !== qIndex));
  };

  const updateQuestion = (
    qIndex: number,
    field: keyof QuestionDraft,
    value: string | number,
  ) => {
    const updated = [...questions];
    updated[qIndex] = { ...updated[qIndex], [field]: value };
    setQuestions(updated);
  };

  const addOption = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.push({ text: "", is_correct: false });
    setQuestions(updated);
  };

  const removeOption = (qIndex: number, oIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options = updated[qIndex].options.filter(
      (_, i) => i !== oIndex,
    );
    setQuestions(updated);
  };

  const updateOptionText = (qIndex: number, oIndex: number, text: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex].text = text;
    setQuestions(updated);
  };

  const setCorrectOption = (qIndex: number, oIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options = updated[qIndex].options.map((opt, i) => ({
      ...opt,
      is_correct: i === oIndex,
    }));
    setQuestions(updated);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
        <Plus className="size-4" /> Create Test
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Test</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <FormError message={state?.error} />
          <input
            type="hidden"
            name="questions"
            value={JSON.stringify(questions)}
          />

          <div className="space-y-2">
            <Label htmlFor="batch">Batch</Label>
            <Select name="batch" required>
              <SelectTrigger id="batch">
                <SelectValue placeholder="Select a batch" />
              </SelectTrigger>
              <SelectContent>
                {batches.map((batch) => (
                  <SelectItem key={batch.id} value={String(batch.id)}>
                    {batch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Test Title</Label>
            <Input
              id="title"
              name="title"
              required
              placeholder="e.g. Physics Quiz 1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration_minutes">Duration (minutes)</Label>
            <Input
              id="duration_minutes"
              name="duration_minutes"
              type="number"
              min={1}
              required
              defaultValue={20}
            />
          </div>

          <div className="space-y-4">
            <Label>Questions</Label>
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <Input
                    value={q.text}
                    onChange={(e) =>
                      updateQuestion(qIndex, "text", e.target.value)
                    }
                    placeholder={`Question ${qIndex + 1}`}
                    required
                  />
                  <Input
                    type="number"
                    min={1}
                    value={q.marks}
                    onChange={(e) =>
                      updateQuestion(qIndex, "marks", Number(e.target.value))
                    }
                    className="w-20"
                  />
                  {questions.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeQuestion(qIndex)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2 pl-2">
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${qIndex}`}
                        checked={opt.is_correct}
                        onChange={() => setCorrectOption(qIndex, oIndex)}
                      />
                      <Input
                        value={opt.text}
                        onChange={(e) =>
                          updateOptionText(qIndex, oIndex, e.target.value)
                        }
                        placeholder={`Option ${oIndex + 1}`}
                        required
                        className="flex-1"
                      />
                      {q.options.length > 2 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(qIndex, oIndex)}
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addOption(qIndex)}
                  >
                    + Add Option
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addQuestion}
              className="w-full"
            >
              + Add Question
            </Button>
          </div>

          <SubmitButton isPending={isPending} loadingText="Creating...">
            Create Test
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
