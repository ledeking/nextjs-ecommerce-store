export default function ProductLoading() {
  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="aspect-square bg-muted animate-pulse rounded-lg" />
        <div className="space-y-6">
          <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
          <div className="h-6 bg-muted animate-pulse rounded w-1/2" />
          <div className="h-4 bg-muted animate-pulse rounded w-full" />
          <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}
