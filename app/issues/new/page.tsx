"use client";

import { createIssueSchema } from "@/app/utils/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Skeleton, Text, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <Skeleton height="12rem" />,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onSubmit = async (data: IssueForm) => {
    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.status === 400) {
        setError("An error occurred while creating the issue.");
        return;
      }

      router.push("/issues");
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating the issue.");
    }
  };

  return (
    <div>
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="flex flex-col gap-5 max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        {errors.title && <Text color="red">{errors.title.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} ref={ref} />
          )}
        />
        {errors.description && (
          <Text color="red">{errors.description.message}</Text>
        )}
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
