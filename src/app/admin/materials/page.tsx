import { getBatches } from "@/actions/courses.actions";
import { getMaterials } from "@/actions/content.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UploadMaterialDialog } from "./upload-material-dialog";

export default async function AdminMaterialsPage({
  searchParams,
}: {
  searchParams: Promise<{ batch?: string }>;
}) {
  const params = await searchParams;
  const batches = await getBatches();
  const selectedBatchId = params.batch ? Number(params.batch) : batches[0]?.id;
  const materials = selectedBatchId ? await getMaterials(selectedBatchId) : [];

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Materials</h1>
          <UploadMaterialDialog batches={batches} />
        </div>

        <div className="flex gap-2 flex-wrap">
          {batches.map((batch) => (
            <a
              key={batch.id}
              href={`/admin/materials?batch=${batch.id}`}
              className={`text-sm px-3 py-1 rounded-full border ${
                batch.id === selectedBatchId
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
            >
              {batch.name}
            </a>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {batches.find((b) => b.id === selectedBatchId)?.name ||
                "Materials"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Attachments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-muted-foreground"
                    >
                      No materials yet
                    </TableCell>
                  </TableRow>
                )}
                {materials.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.title}</TableCell>
                    <TableCell>{m.video_url ? "Video" : "File"}</TableCell>
                    <TableCell>
                      {new Date(m.uploaded_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {m.video_url ? (
                        <a
                          href={m.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary underline shrink-0"
                        >
                          Watch
                        </a>
                      ) : m.file ? (
                        <a
                          href={m.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary underline shrink-0"
                        >
                          Open
                        </a>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
