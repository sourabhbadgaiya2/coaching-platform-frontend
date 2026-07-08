import { getMyNotifications } from "@/actions/notifications.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default async function NotificationsPage() {
  const notifications = await getMyNotifications();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Notifications</h1>

      {notifications.length === 0 && (
        <div className="text-center pt-12 text-muted-foreground">
          <Bell className="size-10 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No notifications yet.</p>
        </div>
      )}

      <div className="space-y-2">
        {notifications.map((n) => (
          <Card key={n.id} className={n.is_read ? "" : "border-primary"}>
            <CardContent className="p-4 flex items-start gap-3">
              <Bell className="size-4 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(n.created_at).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
