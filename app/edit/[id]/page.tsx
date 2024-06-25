import EditForm from "@/components/edit-form";
import { getContacById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function EditContactPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const contact = await getContacById(id);

  if (!contact) {
    return notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Edit Contact</h1>
      <EditForm contact={contact} />
    </div>
  );
}
