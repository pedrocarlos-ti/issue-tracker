import { Button, TextArea, TextField } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className="flex flex-col gap-5 max-w-md">
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="Description" />
      <Button>Submit</Button>
    </div>
  );
};

export default NewIssuePage;
