import { getMyEnrollments } from "@/actions/enrollment.actions";
import { getMaterials } from "@/actions/content.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Video } from "lucide-react";

export default async function MaterialsPage({
  searchParams,
}: {
  searchParams: Promise<{ batch?: string }>;
}) {
  const params = await searchParams;
  const enrollments = await getMyEnrollments();
  const activeEnrollments = enrollments.filter((e) => e.status === "active");

  const selectedBatchId = params.batch
    ? Number(params.batch)
    : activeEnrollments[0]?.batch;

  const materials = selectedBatchId ? await getMaterials(selectedBatchId) : [];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Materials</h1>

      {activeEnrollments.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {activeEnrollments.map((e) => (
            <a
              key={e.batch}
              href={`/student/materials?batch=${e.batch}`}
              className={`text-sm px-3 py-1 rounded-full border whitespace-nowrap ${
                e.batch === selectedBatchId
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
            >
              {e.batch_name}
            </a>
          ))}
        </div>
      )}

      {materials.length === 0 && (
        <p className="text-sm text-muted-foreground text-center pt-8">
          No materials uploaded yet.
        </p>
      )}

      <div className="space-y-3">
        {materials.map((material) => (
          <Card key={material.id}>
            <CardContent className="p-4 flex items-center gap-3">
              {material.video_url ? (
                <Video className="size-5 text-primary shrink-0" />
              ) : (
                <FileText className="size-5 text-primary shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{material.title}</p>
              </div>
              {material.video_url ? (
                <a
                  href={material.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary underline shrink-0"
                >
                  Watch
                </a>
              ) : material.file ? (
                <a
                  href={material.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary underline shrink-0"
                >
                  Open
                </a>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
