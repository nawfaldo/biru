import UserProfile from "./_components/UserProfile";

export default async function Page({ params }: { params: { name: string } }) {
  return (
    <main className="space-y-10">
      <UserProfile name={params.name} />
      {/* <UserPosts name={params.name} /> */}
    </main>
  );
}
